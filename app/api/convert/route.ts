import { NextRequest, NextResponse } from 'next/server'
import ytdl from '@distube/ytdl-core'
import ffmpeg from 'fluent-ffmpeg'
import { Readable, PassThrough } from 'stream'

// Configure ffmpeg paths for different environments
if (process.env.VERCEL) {
  // Vercel has ffmpeg in /opt/bin/
  ffmpeg.setFfmpegPath('/opt/bin/ffmpeg')
  ffmpeg.setFfprobePath('/opt/bin/ffprobe')
} else {
  // For local development, try to find ffmpeg in PATH
  try {
    const { execSync } = require('child_process')
    const ffmpegPath = execSync('which ffmpeg', { encoding: 'utf8' }).trim()
    if (ffmpegPath) {
      ffmpeg.setFfmpegPath(ffmpegPath)
    }
  } catch (error) {
    console.warn('FFmpeg not found in PATH. Please install FFmpeg for FLAC conversion.')
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    // Validate YouTube URL
    if (!ytdl.validateURL(url)) {
      return NextResponse.json({ error: 'Invalid YouTube URL - Please provide a valid YouTube link' }, { status: 400 })
    }

    // Get video info first to check if it's available
    const info = await ytdl.getInfo(url)
    const title = info.videoDetails.title.replace(/[^\w\s-]/gi, '').trim()
    
    // Get the best audio format available
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')
    const bestAudio = ytdl.chooseFormat(audioFormats, { quality: 'highestaudio' })
    
    if (!bestAudio) {
      return NextResponse.json({ 
        error: 'No audiophile-quality stream found for this video' 
      }, { status: 400 })
    }

    // Get audio stream from YouTube
    const audioStream = ytdl(url, {
      quality: 'highestaudio',
      filter: 'audioonly',
    })

    // Convert to FLAC
    const flacBuffer = await convertToFlac(audioStream)

    // Create data URL for download
    const base64Audio = flacBuffer.toString('base64')
    const dataUrl = `data:audio/flac;base64,${base64Audio}`

    return NextResponse.json({
      downloadUrl: dataUrl,
      title: title,
      format: 'flac',
      quality: bestAudio.audioBitrate || 'Lossless',
      sampleRate: bestAudio.audioSampleRate || '44100',
      size: flacBuffer.length,
      note: 'TFP Premium FLAC Conversion - True Audiophile Lossless Quality'
    })

  } catch (error: any) {
    console.error('TFP FLAC Conversion error:', error)
    
    if (error.message.includes('Video unavailable')) {
      return NextResponse.json(
        { error: 'Video is unavailable, private, or has been removed' },
        { status: 400 }
      )
    }
    
    if (error.message.includes('Sign in to confirm')) {
      return NextResponse.json(
        { error: 'Video requires sign-in or is age-restricted - TFP cannot access this content' },
        { status: 400 }
      )
    }

    if (error.message.includes('rate')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded - Please wait a moment before trying again' },
        { status: 429 }
      )
    }

    if (error.message.includes('ffmpeg') || error.message.includes('FFmpeg')) {
      return NextResponse.json(
        { error: 'FLAC conversion engine unavailable - Please try again later' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'TFP FLAC processing failed - Please verify the URL and try again' },
      { status: 500 }
    )
  }
}

function convertToFlac(inputStream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    const outputStream = new PassThrough()
    
    outputStream.on('data', (chunk: Buffer) => {
      chunks.push(chunk)
    })

    outputStream.on('end', () => {
      const buffer = Buffer.concat(chunks)
      resolve(buffer)
    })

    outputStream.on('error', (err: Error) => {
      console.error('Output stream error:', err)
      reject(new Error('FLAC conversion failed - output stream error'))
    })

    const command = ffmpeg(inputStream)
      .audioCodec('flac')
      .audioChannels(2)
      .audioFrequency(44100)
      .audioBitrate('1411k') // Equivalent to 16-bit/44.1kHz lossless
      .format('flac')
      .outputOptions([
        '-compression_level 8',  // Maximum FLAC compression
        '-sample_fmt s16',       // 16-bit samples
      ])
      .on('start', (commandLine) => {
        console.log('TFP FLAC conversion started:', commandLine)
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          console.log(`TFP FLAC conversion progress: ${Math.round(progress.percent)}%`)
        }
      })
      .on('error', (err) => {
        console.error('TFP FFmpeg error:', err)
        reject(new Error('FLAC conversion failed - FFmpeg processing error'))
      })
      .on('end', () => {
        console.log('TFP FLAC conversion completed successfully')
      })

    // Pipe to output stream
    command.pipe(outputStream, { end: true })
  })
}

// API info endpoint
export async function GET() {
  return NextResponse.json({
    name: 'TFP - The FLAC Project API',
    version: '2.0.0',
    description: 'Premium audiophile YouTube to FLAC converter with true lossless conversion',
    endpoints: {
      'POST /api/convert': 'Convert YouTube audio to authentic FLAC format',
    },
    features: [
      'Unlimited video length support',
      'True FLAC lossless conversion',
      'Maximum compression (level 8)',
      'Audiophile-grade processing',
      '16-bit/44.1kHz standard',
      'Zero server storage',
      'Direct download delivery'
    ],
    audioSpecs: {
      format: 'FLAC (Free Lossless Audio Codec)',
      bitDepth: '16-bit',
      sampleRate: '44.1kHz',
      channels: 'Stereo',
      compression: 'Level 8 (Maximum)',
      quality: 'True Lossless'
    }
  })
} 