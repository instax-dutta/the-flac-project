# TFP - The FLAC Project Setup Guide

*Premium audiophile YouTube to FLAC converter for the discerning listener*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/instax-dutta/the-flac-project)

## 🎧 Getting Started in 5 Steps

### 1. Clone the Repository
```bash
git clone https://github.com/instax-dutta/the-flac-project.git
cd the-flac-project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install FFmpeg (Required for FLAC Conversion)

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

**Verify installation:**
```bash
ffmpeg -version
```

### 4. Start TFP Development Server
```bash
npm run dev
```

### 5. Experience Audiophile Quality
Visit [http://localhost:3000](http://localhost:3000)

## ☁️ Deploy to Vercel

### Option A: One-Click Deploy (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/instax-dutta/the-flac-project)

### Option B: Fork and Deploy
1. [Fork this repository](https://github.com/instax-dutta/the-flac-project/fork)
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project" and select your fork
4. Vercel will automatically build and deploy TFP

### Option C: CLI Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts for TFP deployment

## 🎵 Open Source Features Included

- ✅ **True FLAC conversion** with FFmpeg processing
- ✅ **Unlimited video length** support
- ✅ **Maximum compression** (Level 8) for optimal file sizes
- ✅ **Dark funky UI** with neon effects and glitch animations
- ✅ **Glass morphism** interface design
- ✅ **Waveform visualization** during conversion
- ✅ **Mobile-optimized** responsive layout
- ✅ **Zero server storage** direct streaming
- ✅ **Vercel-optimized** API routes
- ✅ **MIT Licensed** for open source use

## 🎯 Usage for Audiophiles

1. **Paste** any YouTube URL (no length restrictions)
2. **Click** "CONVERT TO LOSSLESS FLAC" 
3. **Watch** server-side FFmpeg conversion with progress
4. **Download** authentic `.flac` file with lossless quality
5. **Enjoy** uncompromised audio quality

## 📋 Requirements

- **Node.js 18+** (LTS recommended)
- **FFmpeg** (for FLAC conversion)
- **Modern browser** (Chrome/Firefox/Safari/Edge)
- **Stable internet** connection
- **Appreciation** for high-quality audio

## 🎨 Customization Options

### UI Theme Modifications:
Edit `app/globals.css` and `tailwind.config.js` for:
- **Color schemes** (primary/accent/gold gradients)
- **Animation effects** (glitch/glow/waveform)
- **Typography** (JetBrains Mono/Inter fonts)
- **Visual effects** (neon glows/glass morphism)

### FLAC Processing Modifications:
Update `app/api/convert/route.ts` for:
- **Quality settings** and compression levels
- **Sample rate** and bit depth options
- **Error handling** customization
- **Progress reporting** enhancements

### Feature Additions:
- **Playlist support** for batch processing
- **Quality analysis** and visualization
- **Download history** and favorites
- **Batch conversion** capabilities
- **Advanced audio settings** for power users

## 🔧 Development

### Local Development
```bash
# Clone the repository
git clone https://github.com/instax-dutta/the-flac-project.git
cd the-flac-project

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Contributing
1. **Fork** the [repository](https://github.com/instax-dutta/the-flac-project/fork)
2. **Clone** your fork
3. **Create** feature branch: `git checkout -b audiophile-feature`
4. **Make** changes and test thoroughly
5. **Commit** changes: `git commit -am 'Add audiophile feature'`
6. **Push** branch: `git push origin audiophile-feature`
7. **Submit** [pull request](https://github.com/instax-dutta/the-flac-project/pulls)

## 🛠️ Troubleshooting

**Build errors?**
- Ensure Node.js 18+ is installed: `node --version`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check TypeScript compilation: `npm run build`

**FFmpeg not found?**
- Verify installation: `ffmpeg -version`
- Ensure FFmpeg is in your PATH
- See installation instructions above

**FLAC conversion fails?**
- Check browser console for error messages
- Verify YouTube URL format and accessibility
- Test with different videos
- Monitor server logs for FFmpeg errors

**API not responding?**
- Check if development server is running
- Verify port 3000 is available
- Test API endpoint: `curl http://localhost:3000/api/convert`

**UI not displaying correctly?**
- Ensure Tailwind CSS is compiled: `npm run build`
- Check for JavaScript errors in console
- Verify CSS custom properties support in browser

**Deployment issues?**
- Review Vercel function logs in dashboard
- Ensure all dependencies are in `package.json`
- Check for environment-specific issues
- Verify FFmpeg availability on deployment platform

## 🎵 FLAC Quality Notes

**TFP delivers authentic FLAC format:**
- **Format**: True FLAC (Free Lossless Audio Codec)
- **Bit Depth**: 16-bit samples
- **Sample Rate**: 44.1kHz standard
- **Compression**: Level 8 (Maximum efficiency)
- **Processing**: Server-side FFmpeg conversion
- **Quality**: 100% Lossless (zero quality loss)

**Source quality dependency:**
- Output quality matches YouTube's uploaded source
- Some videos only have lower bitrate streams available
- Live streams may have variable quality
- Age of upload can impact available formats
- TFP always selects the highest available quality

## 📝 Next Steps for Audiophiles

1. **Star** the [repository](https://github.com/instax-dutta/the-flac-project) ⭐
2. **Deploy TFP** to Vercel for 24/7 access
3. **Customize UI** to match your aesthetic preferences  
4. **Test with high-quality** music videos
5. **Share with fellow** audio enthusiasts
6. **Contribute improvements** back to the open-source project

## 🎧 Pro Tips

- **Use with high-quality headphones** to appreciate the FLAC difference
- **Test with various genres** to assess conversion consistency
- **Compare FLAC output** with original YouTube playback
- **Archive your favorite tracks** in lossless format
- **Respect copyright** and use responsibly
- **Contribute to the project** to help fellow audiophiles

## 🤝 Community

### Getting Help
- 📖 Check the [README](https://github.com/instax-dutta/the-flac-project#readme)
- 🔍 Search [existing issues](https://github.com/instax-dutta/the-flac-project/issues)
- 💬 [Create new issue](https://github.com/instax-dutta/the-flac-project/issues/new)
- 🌟 [Star the project](https://github.com/instax-dutta/the-flac-project) if helpful

### Stay Updated
- 📺 [Watch the repository](https://github.com/instax-dutta/the-flac-project) for updates
- 🍴 [Fork the project](https://github.com/instax-dutta/the-flac-project/fork) for your own modifications
- 🔄 [Pull latest changes](https://github.com/instax-dutta/the-flac-project/pulls) regularly

---

**🚀 Your TFP - The FLAC Project is ready!**

*Engineered for audiophiles who refuse to compromise on quality.*

**Open Source • MIT Licensed • Community Driven** 