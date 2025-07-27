'use client'

import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState('')
  const [error, setError] = useState('')
  const [videoInfo, setVideoInfo] = useState<any>(null)
  const [suggestion, setSuggestion] = useState('')

  const validateYouTubeUrl = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
    return regex.test(url)
  }

  const handleConvert = async () => {
    if (!url.trim()) {
      setError('Please enter a YouTube URL')
      setSuggestion('')
      return
    }

    if (!validateYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL')
      setSuggestion('')
      return
    }

    setLoading(true)
    setError('')
    setSuggestion('')
    setDownloadUrl('')
    setVideoInfo(null)

    try {
      const response = await axios.post('/api/convert', { url })
      setDownloadUrl(response.data.downloadUrl)
      setVideoInfo(response.data)
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'An error occurred during FLAC processing'
      const suggestionMessage = err.response?.data?.suggestion || ''
      
      setError(errorMessage)
      setSuggestion(suggestionMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `${videoInfo?.title || 'tfp-audio'}.flac`
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <main className="min-h-screen bg-dark-950 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <h1 className="text-6xl md:text-8xl font-bold mb-4 glitch" data-text="TFP">
                <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-gold-400 bg-clip-text text-transparent">
                  TFP
                </span>
              </h1>
              <div className="text-2xl md:text-3xl font-mono text-gray-300 mb-2">
                THE FLAC PROJECT
              </div>
              <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-6"></div>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Premium audiophile FLAC conversion platform. Transform YouTube audio into 
              <span className="text-transparent bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text font-semibold"> true lossless FLAC</span> format.
            </p>
            <div className="mt-4 text-sm text-gold-400 font-mono">
              → Authentic FLAC • Maximum Compression • Zero Quality Loss ←
            </div>
          </div>

          {/* Main Conversion Interface */}
          <div className="glass-morphism rounded-2xl p-8 mb-12 audiophile-border">
            {/* Audio Processing Visualization */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i}
                    className={`waveform-bar ${loading ? 'animate-waveform' : ''}`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      height: loading ? '20px' : '8px',
                      background: loading 
                        ? 'linear-gradient(to top, #6366f1, #d946ef)' 
                        : 'rgba(99, 102, 241, 0.3)'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* URL Input */}
            <div className="mb-8">
              <label htmlFor="youtube-url" className="block text-lg font-semibold text-gray-300 mb-4 font-mono">
                YOUTUBE SOURCE URL
              </label>
              <div className="relative">
                <input
                  id="youtube-url"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-6 py-4 bg-dark-800/50 border-2 border-primary-500/30 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-white placeholder-gray-500 font-mono text-lg backdrop-blur-sm transition-all duration-300 neon-glow-hover"
                  disabled={loading}
                  onKeyPress={(e) => e.key === 'Enter' && handleConvert()}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Convert Button */}
            <button
              onClick={handleConvert}
              disabled={loading || !url.trim()}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center text-lg font-mono neon-glow-hover transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="loading-spinner mr-4"></div>
                  <span>CONVERTING TO FLAC...</span>
                </>
              ) : (
                <>
                  <span className="mr-2">🎧</span>
                  <span>CONVERT TO LOSSLESS FLAC</span>
                </>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl backdrop-blur-sm">
                <div className="flex items-center mb-2">
                  <span className="text-red-400 mr-2">⚠️</span>
                  <p className="text-red-300 font-mono">{error}</p>
                </div>
                {suggestion && (
                  <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-yellow-400 mr-2 mt-0.5">💡</span>
                      <p className="text-yellow-200 text-sm">{suggestion}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Success Message and Download */}
            {downloadUrl && videoInfo && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/50 rounded-xl backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-300 font-mono">
                    FLAC CONVERSION COMPLETE
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {videoInfo.title && (
                    <div className="bg-dark-800/50 p-4 rounded-lg">
                      <div className="text-gold-400 text-sm font-mono mb-1">TRACK TITLE</div>
                      <div className="text-white font-semibold">{videoInfo.title}</div>
                    </div>
                  )}
                  <div className="bg-dark-800/50 p-4 rounded-lg">
                    <div className="text-gold-400 text-sm font-mono mb-1">FORMAT</div>
                    <div className="text-white font-semibold">FLAC (Lossless)</div>
                  </div>
                  {videoInfo.sampleRate && (
                    <div className="bg-dark-800/50 p-4 rounded-lg">
                      <div className="text-gold-400 text-sm font-mono mb-1">SAMPLE RATE</div>
                      <div className="text-white font-semibold">{videoInfo.sampleRate} Hz</div>
                    </div>
                  )}
                  <div className="bg-dark-800/50 p-4 rounded-lg">
                    <div className="text-gold-400 text-sm font-mono mb-1">QUALITY GRADE</div>
                    <div className="text-accent-400 font-bold">TRUE LOSSLESS</div>
                  </div>
                  {videoInfo.size && (
                    <div className="bg-dark-800/50 p-4 rounded-lg col-span-full">
                      <div className="text-gold-400 text-sm font-mono mb-1">FILE SIZE</div>
                      <div className="text-white font-semibold">{(videoInfo.size / (1024 * 1024)).toFixed(2)} MB FLAC</div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center font-mono neon-glow-hover"
                >
                  <span className="mr-2">📥</span>
                  DOWNLOAD LOSSLESS FLAC
                </button>
              </div>
            )}
          </div>

          {/* Deployment Notice */}
          <div className="mb-8 p-4 bg-blue-900/20 border border-blue-500/50 rounded-xl backdrop-blur-sm">
            <div className="flex items-start">
              <span className="text-blue-400 mr-3 mt-1">ℹ️</span>
              <div>
                <h4 className="text-blue-300 font-semibold mb-2">Server Deployment Notice</h4>
                <p className="text-blue-200 text-sm">
                  Some YouTube videos may have access restrictions on server environments that don't apply to browsers. 
                  If you encounter access errors, try different videos or check if the content is publicly accessible without age restrictions.
                </p>
              </div>
            </div>
          </div>

          {/* Audiophile Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="glass-morphism p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎵</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-primary-300 font-mono">TRUE FLAC</h3>
              <p className="text-gray-400 text-sm">Authentic lossless FLAC conversion with maximum compression</p>
            </div>
            
            <div className="glass-morphism p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-500 to-accent-700 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-accent-300 font-mono">SERVER CONVERSION</h3>
              <p className="text-gray-400 text-sm">Professional FFmpeg processing for guaranteed quality</p>
            </div>
            
            <div className="glass-morphism p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gold-500 to-gold-700 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-bold text-lg mb-2 text-gold-300 font-mono">ZERO STORAGE</h3>
              <p className="text-gray-400 text-sm">Direct conversion and download - files never stored</p>
            </div>
          </div>

          {/* Audiophile Stats */}
          <div className="glass-morphism p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-bold text-center mb-8 font-mono text-transparent bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text">
              FLAC SPECIFICATIONS
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-400 font-mono">16bit</div>
                <div className="text-sm text-gray-400">Bit Depth</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-400 font-mono">44.1kHz</div>
                <div className="text-sm text-gray-400">Sample Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400 font-mono">∞</div>
                <div className="text-sm text-gray-400">Length Limit</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 font-mono">FLAC</div>
                <div className="text-sm text-gray-400">True Lossless</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 font-mono text-sm">
            <p className="mb-2">TFP © 2024 - Engineered for Audiophiles</p>
            <p className="text-xs">True FLAC conversion technology • Zero compromise on quality</p>
          </div>
        </div>
      </div>
    </main>
  )
} 