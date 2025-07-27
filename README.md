# TFP - The FLAC Project

[![GitHub Stars](https://img.shields.io/github/stars/instax-dutta/the-flac-project?style=for-the-badge)](https://github.com/instax-dutta/the-flac-project/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/instax-dutta/the-flac-project?style=for-the-badge)](https://github.com/instax-dutta/the-flac-project/network)
[![GitHub Issues](https://img.shields.io/github/issues/instax-dutta/the-flac-project?style=for-the-badge)](https://github.com/instax-dutta/the-flac-project/issues)
[![License](https://img.shields.io/github/license/instax-dutta/the-flac-project?style=for-the-badge)](https://github.com/instax-dutta/the-flac-project/blob/main/LICENSE)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/instax-dutta/the-flac-project)

**Premium audiophile YouTube to FLAC converter for the discerning listener.**

Experience music the way it was meant to be heard. TFP delivers uncompromising audio quality conversion from YouTube to authentic FLAC format with our revolutionary **hybrid client-server architecture**.

![TFP Screenshot](https://via.placeholder.com/800x400/1e293b/6366f1?text=TFP+-+The+FLAC+Project)

## 🎧 Audiophile Features

- 🎵 **True FLAC Conversion**: Authentic lossless FLAC format with FFmpeg processing
- 🌐 **Hybrid Architecture**: Browser-based YouTube access + server-side FLAC conversion
- 🔒 **Zero Storage**: Direct conversion and download - files never stored
- ∞ **Unlimited Length**: No restrictions on video duration
- 🎨 **Dark Funky UI**: Audiophile-focused interface with neon accents and glitch effects
- 📱 **Mobile Optimized**: Responsive design for all devices
- ☁️ **Vercel Ready**: Optimized for serverless deployment

## 🔧 Revolutionary Architecture

### **Hybrid Client-Server Approach**
TFP v3.0 solves the common YouTube access restrictions on serverless platforms:

1. **🌐 Client-Side YouTube Processing**: Your browser directly accesses YouTube (no server restrictions)
2. **⚡ Server-Side FLAC Conversion**: Professional FFmpeg processing for guaranteed quality
3. **🔄 Seamless Integration**: Automatic handoff between client and server

This approach eliminates the "age-restricted" and "sign-in required" errors common with server-only solutions!

## 🎯 For Audiophiles, By Audiophiles

TFP focuses on what matters most to serious listeners:
- **True FLAC** lossless conversion (not just WebM/MP4)
- **16-bit/44.1kHz** standard audiophile quality
- **Maximum compression** (Level 8) for optimal file sizes
- **Zero re-encoding** from source to FLAC
- **Professional FFmpeg** processing pipeline

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- FFmpeg installed on your system
- Modern web browser
- Appreciation for high-quality audio

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/instax-dutta/the-flac-project.git
cd the-flac-project
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install FFmpeg:**

**macOS:**
```bash
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ffmpeg
```

**Windows:**
Download from [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)

4. **Start development server:**
```bash
npm run dev
```

5. **Open TFP:**
Visit [http://localhost:3000](http://localhost:3000)

## ☁️ Deploy to Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/instax-dutta/the-flac-project)

**✅ Now works reliably on Vercel thanks to our hybrid architecture!**

### Manual Deployment
1. Fork this repository
2. Connect your fork to Vercel
3. Deploy automatically with FFmpeg support

### CLI Deployment
```bash
npm i -g vercel
vercel
```

## 🎵 Usage

1. **Navigate** to your TFP instance
2. **Paste** any YouTube URL (unlimited length supported)
3. **Watch** the hybrid processing in action:
   - Browser fetches video info from YouTube
   - Server converts audio to FLAC
4. **Download** your authentic FLAC file

## 🔗 API Endpoints

### POST `/api/convert`
Convert audio streams to authentic FLAC format.

**Request:**
```json
{
  "streamUrl": "https://...",
  "title": "Track Title",
  "quality": "320",
  "sampleRate": "48000"
}
```

**Response:**
```json
{
  "downloadUrl": "data:audio/flac;base64,...",
  "title": "Track Title",
  "format": "flac",
  "quality": "Lossless",
  "sampleRate": "44100",
  "size": 12345678,
  "note": "TFP Premium FLAC Conversion - True Audiophile Lossless Quality"
}
```

### GET `/api/convert`
Returns TFP API information and capabilities.

## ⚙️ Architecture Details

### How the Hybrid System Works

#### **Client-Side (Browser) 🌐**
- Uses `@distube/ytdl-core` in the browser
- Fetches video information directly from YouTube
- Selects highest quality audio stream
- Sends stream URL to server

#### **Server-Side (Vercel) ⚡**
- Receives pre-validated stream URLs
- Fetches audio data using `node-fetch`
- Converts to FLAC using FFmpeg
- Returns base64-encoded FLAC file

#### **Benefits of This Approach**
- ✅ **No YouTube blocking**: Browser access bypasses server restrictions
- ✅ **No age-restriction errors**: Client handles authentication naturally
- ✅ **Reliable on Vercel**: Server only processes audio, not YouTube access
- ✅ **Maximum compatibility**: Works with all YouTube content types

### FLAC Quality Settings
TFP automatically converts to highest quality FLAC:
- **Format**: True FLAC (Free Lossless Audio Codec)
- **Bit Depth**: 16-bit samples
- **Sample Rate**: 44.1kHz
- **Channels**: Stereo
- **Compression**: Level 8 (Maximum)
- **Processing**: Server-side FFmpeg conversion

## 🤝 Contributing

We welcome contributions from fellow audiophiles! Here's how you can help:

### Ways to Contribute
- 🐛 **Bug Reports**: [Create an issue](https://github.com/instax-dutta/the-flac-project/issues)
- 💡 **Feature Requests**: [Suggest enhancements](https://github.com/instax-dutta/the-flac-project/issues)
- 🔧 **Code Contributions**: Submit pull requests
- 📚 **Documentation**: Improve docs and guides
- 🎨 **UI/UX**: Design improvements for audiophiles

### Development Workflow
1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR-USERNAME/the-flac-project.git`
3. **Create** feature branch: `git checkout -b audiophile-feature`
4. **Make** your changes
5. **Test** thoroughly
6. **Commit** changes: `git commit -am 'Add audiophile feature'`
7. **Push** branch: `git push origin audiophile-feature`
8. **Submit** pull request

## 🚨 Error Handling

TFP provides comprehensive error management:
- **Invalid URLs**: Format validation with helpful messages
- **Private/Unavailable videos**: Clear status reporting
- **Age restrictions**: Handled gracefully by browser
- **Network issues**: Connection status feedback
- **Conversion failures**: Detailed FFmpeg error reporting

## 📊 Performance

### Optimizations
- **Hybrid processing** for maximum compatibility
- **Browser-side YouTube access** (no server blocking)
- **Streaming FLAC conversion** for memory efficiency
- **Progress tracking** for user feedback
- **Error recovery** mechanisms

### Browser Support
- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari  
- ✅ Edge
- ✅ Mobile browsers

## ⚖️ Legal & Ethics

**TFP is designed for legitimate use by audio enthusiasts:**

- ✅ **Personal use** and audio archiving
- ✅ **Educational purposes** and audio analysis
- ✅ **Quality comparison** and format testing
- ⚠️ **Respect** YouTube's Terms of Service
- ⚠️ **Honor** copyright and licensing laws
- ⚠️ **Use responsibly** and ethically

## 🛠️ Troubleshooting

### Common Issues

**FFmpeg not found?**
- Ensure FFmpeg is installed and in PATH
- Check installation with `ffmpeg -version`
- See installation instructions above

**Conversion fails?**
- Verify YouTube URL is valid and accessible
- Check browser console for detailed errors
- Try with different videos

**Browser compatibility issues?**
- Use a modern browser (Chrome recommended)
- Enable JavaScript
- Check for browser extensions that might interfere

### Getting Help
1. Check [existing issues](https://github.com/instax-dutta/the-flac-project/issues)
2. [Create a new issue](https://github.com/instax-dutta/the-flac-project/issues/new) with:
   - Detailed problem description
   - Steps to reproduce
   - Browser and system information
   - Error logs/screenshots

## 📞 Support

**For TFP assistance:**
1. 📖 Review [troubleshooting guide](#🛠️-troubleshooting)
2. 🔍 Search [existing issues](https://github.com/instax-dutta/the-flac-project/issues)
3. 💬 [Create new issue](https://github.com/instax-dutta/the-flac-project/issues/new)
4. 🌟 [Star the repository](https://github.com/instax-dutta/the-flac-project) if you find it useful!

## 🙏 Acknowledgments

- **@distube/ytdl-core** - Maintained YouTube downloader
- **FFmpeg** - Powerful audio/video processing
- **Next.js** - React framework for production
- **Vercel** - Deployment platform
- **Tailwind CSS** - Utility-first CSS framework

## 📈 Project Stats

- ⭐ **Stars**: ![GitHub stars](https://img.shields.io/github/stars/instax-dutta/the-flac-project)
- 🍴 **Forks**: ![GitHub forks](https://img.shields.io/github/forks/instax-dutta/the-flac-project)
- 🐛 **Issues**: ![GitHub issues](https://img.shields.io/github/issues/instax-dutta/the-flac-project)
- 📝 **Language**: ![Top language](https://img.shields.io/github/languages/top/instax-dutta/the-flac-project)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/instax-dutta/the-flac-project/blob/main/LICENSE) file for details.

## ⭐ Show Your Support

If you find TFP useful, please consider:
- ⭐ [Starring the repository](https://github.com/instax-dutta/the-flac-project)
- 🍴 [Forking the project](https://github.com/instax-dutta/the-flac-project/fork)
- 🐛 [Reporting bugs](https://github.com/instax-dutta/the-flac-project/issues)
- 💡 [Suggesting features](https://github.com/instax-dutta/the-flac-project/issues)
- 🤝 [Contributing code](https://github.com/instax-dutta/the-flac-project/pulls)

---

**TFP © 2024 - Engineered for Audiophiles**  
*Hybrid architecture • True FLAC conversion • Zero compromise on quality*

**Made with 🎵 for the audiophile community** 