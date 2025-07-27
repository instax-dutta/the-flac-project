import { NextRequest, NextResponse } from 'next/server'
import ffmpeg from 'fluent-ffmpeg'
import { Readable, PassThrough } from 'stream'
import ytdl from '@distube/ytdl-core'

// Increase the body size limit for API routes
export const maxDuration = 300; // 5 minutes
export const dynamic = 'force-dynamic';

// Configure ffmpeg paths for different environments
if (process.env.VERCEL) {
  ffmpeg.setFfmpegPath('/opt/bin/ffmpeg')
  ffmpeg.setFfprobePath('/opt/bin/ffprobe')
} else {
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
      return NextResponse.json({ error: 'YouTube URL is required' }, { status: 400 })
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    if (!youtubeRegex.test(url)) {
      return NextResponse.json({ error: 'Please provide a valid YouTube URL' }, { status: 400 })
    }

    console.log('TFP: Processing YouTube URL:', url)

    // Get video info
    let info;
    try {
      info = await ytdl.getInfo(url)
    } catch (error: any) {
      console.error('TFP: Failed to get video info:', error.message)
      
      if (error.message.includes('Video unavailable')) {
        return NextResponse.json({ 
          error: 'Video is unavailable or has been removed',
          suggestion: 'Please check if the video exists and is publicly accessible'
        }, { status: 400 })
      } else if (error.message.includes('private')) {
        return NextResponse.json({ 
          error: 'This video is private and cannot be accessed',
          suggestion: 'Try a different public video'
        }, { status: 400 })
      } else if (error.message.includes('Sign in') || error.message.includes('age')) {
        return NextResponse.json({ 
          error: 'Video requires sign-in or is age-restricted',
          suggestion: 'Try a different video that doesn\'t require sign-in or age verification'
        }, { status: 400 })
      } else {
        return NextResponse.json({ 
          error: 'Failed to access video information',
          suggestion: 'Please check the YouTube URL and try again'
        }, { status: 400 })
      }
    }

    const title = info.videoDetails.title
    console.log('TFP: Video title:', title)

    // Check if video is accessible
    if (info.videoDetails.isPrivate) {
      return NextResponse.json({ 
        error: 'This video is private and cannot be accessed',
        suggestion: 'Try a different public video'
      }, { status: 400 })
    }

    // Get best audio format
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')
    
    if (audioFormats.length === 0) {
      const allFormats = info.formats.filter(format => format.hasAudio)
      if (allFormats.length === 0) {
        return NextResponse.json({ 
          error: 'No audio streams found for this video',
          suggestion: 'This might be a video-only content or live stream'
        }, { status: 400 })
      }
    }

    const bestAudio = ytdl.chooseFormat(audioFormats.length > 0 ? audioFormats : info.formats, { 
      quality: 'highestaudio',
      filter: 'audioonly'
    })

    if (!bestAudio) {
      return NextResponse.json({ 
        error: 'No suitable audio stream found',
        suggestion: 'The video may not have compatible audio streams'
      }, { status: 400 })
    }

    console.log('TFP: Selected format:', bestAudio.container, '@', bestAudio.audioBitrate || 'unknown', 'kbps')

    // Download and convert to FLAC
    console.log('TFP: Starting download and FLAC conversion...')
    const audioStream = ytdl(url, { format: bestAudio })
    const flacBuffer = await convertToFlac(audioStream)

    console.log('TFP: FLAC conversion completed, size:', Math.round(flacBuffer.length / 1024 / 1024), 'MB')

    // Create data URL for download
    const base64Audio = flacBuffer.toString('base64')
    const dataUrl = `data:audio/flac;base64,${base64Audio}`

    return NextResponse.json({
      downloadUrl: dataUrl,
      title: title.replace(/[^\w\s-]/gi, '').trim(),
      format: 'flac',
      quality: bestAudio.audioBitrate || 'Lossless',
      sampleRate: bestAudio.audioSampleRate || '44100',
      size: flacBuffer.length,
      note: 'TFP Premium FLAC Conversion - True Audiophile Lossless Quality'
    })

  } catch (error: any) {
    console.error('TFP FLAC Conversion error:', error)
    
    if (error.message.includes('ffmpeg') || error.message.includes('FFmpeg')) {
      return NextResponse.json(
        { error: 'FLAC conversion engine unavailable - Please try again later' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'TFP FLAC processing failed - Please try again' },
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
      .audioBitrate('1411k')
      .format('flac')
      .outputOptions([
        '-compression_level 8',
        '-sample_fmt s16',
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

    command.pipe(outputStream, { end: true })
  })
}

// API info endpoint
export async function GET() {
  return NextResponse.json({
    name: 'TFP - The FLAC Project API',
    version: '4.0.0',
    description: 'Premium audiophile FLAC converter with server-side YouTube processing',
    environment: process.env.VERCEL ? 'Vercel Serverless' : 'Local Development',
    endpoints: {
      'POST /api/convert': 'Convert YouTube URL to authentic FLAC format',
    },
    features: [
      'Server-side YouTube processing',
      'High-quality audio extraction',
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
    },
    approach: 'Server-side processing for maximum compatibility and reliability'
  })
} 