import { NextRequest, NextResponse } from 'next/server'
import ffmpeg from 'fluent-ffmpeg'
import { Readable, PassThrough } from 'stream'
import fetch from 'node-fetch'

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
    const { streamUrl, title, quality, sampleRate } = await request.json()

    if (!streamUrl) {
      return NextResponse.json({ error: 'Stream URL is required' }, { status: 400 })
    }

    if (!title) {
      return NextResponse.json({ error: 'Video title is required' }, { status: 400 })
    }

    console.log('TFP: Processing stream URL for:', title)
    console.log('TFP: Stream quality:', quality || 'unknown')

    // Fetch audio stream from the provided URL
    const response = await fetch(streamUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch audio stream: ${response.status} ${response.statusText}`)
    }

    console.log('TFP: Audio stream fetched successfully')
    console.log('TFP: Starting FLAC conversion...')

    // Convert the response stream to FLAC
    const audioStream = Readable.fromWeb(response.body as any)
    const flacBuffer = await convertToFlac(audioStream)

    console.log('TFP: FLAC conversion completed, size:', Math.round(flacBuffer.length / 1024 / 1024), 'MB')

    // Create data URL for download
    const base64Audio = flacBuffer.toString('base64')
    const dataUrl = `data:audio/flac;base64,${base64Audio}`

    return NextResponse.json({
      downloadUrl: dataUrl,
      title: title.replace(/[^\w\s-]/gi, '').trim(),
      format: 'flac',
      quality: quality || 'Lossless',
      sampleRate: sampleRate || '44100',
      size: flacBuffer.length,
      note: 'TFP Premium FLAC Conversion - True Audiophile Lossless Quality'
    })

  } catch (error: any) {
    console.error('TFP FLAC Conversion error:', error)
    
    if (error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Failed to access audio stream - The provided stream URL may be invalid or expired' },
        { status: 400 }
      )
    }

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
    version: '3.0.0',
    description: 'Premium audiophile FLAC converter with client-side YouTube access',
    environment: process.env.VERCEL ? 'Vercel Serverless' : 'Local Development',
    endpoints: {
      'POST /api/convert': 'Convert audio stream to authentic FLAC format',
    },
    features: [
      'Client-side YouTube processing',
      'Server-side FLAC conversion',
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
    approach: 'Hybrid client-server architecture for optimal compatibility'
  })
} 