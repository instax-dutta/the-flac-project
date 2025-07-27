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

// YouTube access configuration for server environments
const YTDL_OPTIONS = {
  requestOptions: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
    }
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

    console.log('TFP: Processing URL:', url)
    console.log('TFP: Environment:', process.env.VERCEL ? 'Vercel' : 'Local')

    // Get video info with enhanced options for server environments
    let info
    try {
      info = await ytdl.getInfo(url, YTDL_OPTIONS)
      console.log('TFP: Video info retrieved successfully')
    } catch (infoError: any) {
      console.error('TFP: Error getting video info:', infoError.message)
      
      // Try with minimal options as fallback
      try {
        console.log('TFP: Retrying with fallback options...')
        info = await ytdl.getInfo(url, { 
          requestOptions: {
            headers: {
              'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
            }
          }
        })
        console.log('TFP: Video info retrieved with fallback')
      } catch (fallbackError: any) {
        console.error('TFP: Fallback also failed:', fallbackError.message)
        throw infoError // Re-throw original error
      }
    }

    const title = info.videoDetails.title.replace(/[^\w\s-]/gi, '').trim()
    console.log('TFP: Video title:', title)
    
    // Check if video is available and not restricted
    if (info.videoDetails.isPrivate) {
      return NextResponse.json({ 
        error: 'This video is private and cannot be accessed by TFP' 
      }, { status: 403 })
    }

    if (info.videoDetails.isUnlisted) {
      console.log('TFP: Video is unlisted but accessible')
    }

    // Get the best audio format available
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')
    console.log('TFP: Found', audioFormats.length, 'audio formats')
    
    if (audioFormats.length === 0) {
      console.log('TFP: No audio-only formats, checking all formats...')
      const allFormats = info.formats.filter(format => format.hasAudio)
      console.log('TFP: Found', allFormats.length, 'formats with audio')
      
      if (allFormats.length === 0) {
        return NextResponse.json({ 
          error: 'No audio streams found for this video - it may be a live stream or have restricted access' 
        }, { status: 400 })
      }
    }

    const bestAudio = ytdl.chooseFormat(audioFormats.length > 0 ? audioFormats : info.formats, { 
      quality: 'highestaudio',
      filter: 'audioonly'
    })
    
    if (!bestAudio) {
      return NextResponse.json({ 
        error: 'No suitable audio stream found for this video' 
      }, { status: 400 })
    }

    console.log('TFP: Selected audio format:', bestAudio.container, '@', bestAudio.audioBitrate || 'unknown', 'kbps')

    // Get audio stream from YouTube with enhanced options
    const audioStream = ytdl(url, {
      quality: bestAudio.itag,
      ...YTDL_OPTIONS
    })

    console.log('TFP: Starting FLAC conversion...')

    // Convert to FLAC
    const flacBuffer = await convertToFlac(audioStream)

    console.log('TFP: FLAC conversion completed, size:', Math.round(flacBuffer.length / 1024 / 1024), 'MB')

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
    
    // Enhanced error handling for different scenarios
    if (error.message.includes('Video unavailable')) {
      return NextResponse.json(
        { error: 'Video is unavailable, private, or has been removed from YouTube' },
        { status: 400 }
      )
    }
    
    if (error.message.includes('Sign in to confirm') || error.message.includes('age')) {
      return NextResponse.json(
        { 
          error: 'This video has age restrictions or requires sign-in. Try a different video or check if it\'s publicly accessible.',
          suggestion: 'Some videos work in browsers but not on servers due to YouTube\'s access policies.'
        },
        { status: 403 }
      )
    }

    if (error.message.includes('rate') || error.message.includes('429')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded - YouTube is temporarily blocking requests. Please wait a few minutes and try again.' },
        { status: 429 }
      )
    }

    if (error.message.includes('ffmpeg') || error.message.includes('FFmpeg')) {
      return NextResponse.json(
        { error: 'FLAC conversion engine unavailable - Please try again later' },
        { status: 503 }
      )
    }

    if (error.message.includes('private') || error.message.includes('Private')) {
      return NextResponse.json(
        { error: 'This video is private and cannot be accessed' },
        { status: 403 }
      )
    }

    // Generic error for deployment issues
    if (process.env.VERCEL) {
      return NextResponse.json(
        { 
          error: 'Server processing failed - This may be due to YouTube access restrictions on server environments. Some videos work locally but not on deployed servers.',
          suggestion: 'Try a different video, or check if the video is publicly accessible without restrictions.'
        },
        { status: 500 }
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
    environment: process.env.VERCEL ? 'Vercel Serverless' : 'Local Development',
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
    },
    limitations: {
      serverDeployment: 'Some YouTube videos may have server access restrictions',
      ageRestricted: 'Age-restricted content cannot be processed',
      privateVideos: 'Private videos are not accessible',
      liveStreams: 'Live streams may not be supported'
    }
  })
} 