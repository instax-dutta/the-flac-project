# TFP - The FLAC Project

[![GitHub Stars](https://img.shields.io/github/stars/instax-dutta/the-flac-project?style=for-the-badge)](https://github.com/instax-dutta/the-flac-project/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/instax-dutta/the-flac-project?style=for-the-badge)](https://github.com/instax-dutta/the-flac-project/network)
[![GitHub Issues](https://img.shields.io/github/issues/instax-dutta/the-flac-project?style=for-the-badge)](https://github.com/instax-dutta/the-flac-project/issues)
[![License](https://img.shields.io/github/license/instax-dutta/the-flac-project?style=for-the-badge)](https://github.com/instax-dutta/the-flac-project/blob/main/LICENSE)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/instax-dutta/the-flac-project)

**Premium audiophile YouTube to FLAC converter for the discerning listener.**

Experience music the way it was meant to be heard. TFP delivers uncompromising audio quality conversion from YouTube to authentic FLAC format with zero server storage and unlimited track length support.

![TFP Screenshot](https://via.placeholder.com/800x400/1e293b/6366f1?text=TFP+-+The+FLAC+Project)

## 🎧 Audiophile Features

- 🎵 **True FLAC Conversion**: Authentic lossless FLAC format with FFmpeg processing
- ⚡ **Server-Side Processing**: Professional-grade audio conversion pipeline
- 🔒 **Zero Storage**: Direct conversion and download - files never stored
- ∞ **Unlimited Length**: No restrictions on video duration
- 🎨 **Dark Funky UI**: Audiophile-focused interface with neon accents and glitch effects
- 📱 **Mobile Optimized**: Responsive design for all devices
- ☁️ **Vercel Ready**: One-click deployment to Vercel

## 🔧 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes with FFmpeg
- **Audio Processing**: @distube/ytdl-core + fluent-ffmpeg
- **Deployment**: Vercel
- **Design**: Dark theme with audiophile-grade visual effects

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
3. **Click** "CONVERT TO LOSSLESS FLAC"
4. **Download** your authentic FLAC file

## 🔗 API Endpoints

### POST `/api/convert`
Convert YouTube videos to authentic FLAC format.

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=..."
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

## ⚙️ Configuration

### FLAC Quality Settings
TFP automatically converts to highest quality FLAC:
- **Format**: True FLAC (Free Lossless Audio Codec)
- **Bit Depth**: 16-bit samples
- **Sample Rate**: 44.1kHz
- **Channels**: Stereo
- **Compression**: Level 8 (Maximum)
- **Processing**: Server-side FFmpeg conversion

### No Limitations
- ✅ **Unlimited video length**
- ✅ **No file size restrictions** 
- ✅ **No processing time limits**
- ✅ **True FLAC conversion**

## 🎨 UI Customization

### Color Scheme
Edit `tailwind.config.js` to modify the audiophile color palette:
- **Primary**: Indigo/Purple gradient
- **Accent**: Pink/Magenta tones
- **Gold**: Premium highlights
- **Dark**: Deep space backgrounds

### Visual Effects
- **Glitch animations** on main title
- **Neon glow effects** on interactive elements
- **Waveform visualization** during processing
- **Glass morphism** interface elements
- **Gradient borders** and backgrounds

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

### Contribution Guidelines
- Follow existing code style and formatting
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass
- Respect audiophile quality standards

## 🚨 Error Handling

TFP provides comprehensive error management:
- **Invalid URLs**: Format validation with helpful messages
- **Private/Unavailable videos**: Clear status reporting
- **Age restrictions**: Explicit limitation notices
- **FFmpeg errors**: Conversion failure handling
- **Rate limits**: Automatic retry suggestions
- **Network issues**: Connection status feedback

## 📊 Performance

### Optimizations
- **Server-side FLAC conversion** with FFmpeg
- **Streaming processing** for memory efficiency
- **60-second function timeout** for reliability
- **Progress tracking** for long conversions
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
- Check if video is private or geo-restricted
- Monitor server logs for FFmpeg errors

**Build failures?**
- Ensure Node.js 18+ is installed
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript compilation errors

### Getting Help
1. Check [existing issues](https://github.com/instax-dutta/the-flac-project/issues)
2. [Create a new issue](https://github.com/instax-dutta/the-flac-project/issues/new) with:
   - Detailed problem description
   - Steps to reproduce
   - System information
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
*True FLAC conversion technology • Zero compromise on quality*

**Made with 🎵 for the audiophile community** 