# TFP - The FLAC Project

**Premium audiophile YouTube audio extraction platform for the discerning listener.**

Experience music the way it was meant to be heard. TFP delivers uncompromising audio quality extraction from YouTube with zero server storage and unlimited track length support.

## 🎧 Audiophile Features

- 🎵 **Pristine Quality**: Maximum available bitrate extraction with zero quality loss
- ⚡ **Lightning Fast**: Optimized processing pipeline for rapid audio extraction  
- 🔒 **Zero Storage**: Direct stream processing - your audio never touches our servers
- ∞ **Unlimited Length**: No restrictions on video duration
- 🎨 **Dark Funky UI**: Audiophile-focused interface with neon accents and glitch effects
- 📱 **Mobile Optimized**: Responsive design for all devices
- ☁️ **Vercel Ready**: Pre-configured for instant deployment

## 🔧 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes  
- **Audio Processing**: ytdl-core (maximum quality extraction)
- **Deployment**: Vercel
- **Design**: Dark theme with audiophile-grade visual effects

## 🎯 For Audiophiles, By Audiophiles

TFP focuses on what matters most to serious listeners:
- **320k+ bitrate** extraction when available
- **48kHz sample rate** support
- **24-bit depth** capability  
- **Lossless format** priority
- **Direct stream** access (no re-encoding)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Modern web browser
- Appreciation for high-quality audio

### Installation

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd tfp-the-flac-project
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open TFP:**
Visit [http://localhost:3000](http://localhost:3000)

## ☁️ Deploy to Vercel

### Automatic Deployment
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Automatic build and deployment

### CLI Deployment
```bash
npm i -g vercel
vercel
```

## 🎵 Usage

1. **Navigate** to your TFP instance
2. **Paste** any YouTube URL (unlimited length supported)
3. **Extract** audiophile-quality audio 
4. **Download** your high-fidelity file

## 🔗 API Endpoints

### POST `/api/convert`
Extract premium audio from YouTube videos.

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=..."
}
```

**Response:**
```json
{
  "downloadUrl": "https://...",
  "title": "Track Title",
  "format": "webm",
  "quality": "320",
  "sampleRate": "48000",
  "note": "TFP Premium Extraction - Audiophile Quality Guaranteed"
}
```

### GET `/api/convert`
Returns TFP API information and capabilities.

## ⚙️ Configuration

### Audio Quality Settings
TFP automatically extracts the highest quality available:
- **Format**: WebM, MP4, AAC (YouTube's best available)
- **Bitrate**: Up to 320+ kbps
- **Sample Rate**: Up to 48kHz
- **Channels**: Stereo/Mono as available
- **Processing**: Direct stream (zero re-encoding)

### No Limitations
- ✅ **Unlimited video length**
- ✅ **No file size restrictions** 
- ✅ **No processing time limits**
- ✅ **Maximum quality extraction**

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

### Typography
- **JetBrains Mono**: Monospace font for technical elements
- **Inter**: Clean sans-serif for body text
- **Custom animations**: Pulse, glow, and waveform effects

## 🚨 Error Handling

TFP provides comprehensive error management:
- **Invalid URLs**: Format validation with helpful messages
- **Private/Unavailable videos**: Clear status reporting
- **Age restrictions**: Explicit limitation notices
- **Rate limits**: Automatic retry suggestions
- **Network issues**: Connection status feedback

## 📊 Performance

### Optimizations
- **Direct stream access** (no server conversion)
- **60-second function timeout** for reliability
- **Parallel processing** where possible
- **Input validation** to prevent unnecessary requests
- **Client-side caching** for repeated requests

### Browser Support
- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari  
- ✅ Edge
- ✅ Mobile browsers

## 🤝 Contributing

TFP welcomes contributions from fellow audiophiles:

1. **Fork** the repository
2. **Create** feature branch: `git checkout -b audiophile-feature`
3. **Commit** changes: `git commit -am 'Add audiophile feature'`
4. **Push** branch: `git push origin audiophile-feature`
5. **Submit** pull request

### Contribution Areas
- UI/UX improvements for audiophiles
- Audio format support enhancements
- Performance optimizations
- Mobile experience improvements
- Documentation updates

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

**Video not accessible?**
- Verify URL format and video availability
- Check for geographic restrictions
- Ensure video is publicly accessible

**Quality not optimal?**
- YouTube's source quality varies by upload
- Some videos only have lower bitrate streams
- Check upload source and original quality

**Processing slow?**
- Network speed affects download time
- Video length impacts processing duration
- Server load may cause delays

### Development Issues

**Build failures?**
- Ensure Node.js 18+ is installed
- Clear `node_modules` and reinstall
- Check for TypeScript errors

**API errors?**
- Monitor browser console for details
- Verify API endpoint accessibility
- Check network connectivity

**Deployment problems?**
- Review Vercel function logs
- Ensure environment variables are set
- Check build output for errors

## 📞 Support

**For TFP assistance:**
1. Review troubleshooting guide above
2. Check browser console for error messages  
3. Verify YouTube URL validity
4. Test with different videos
5. Check Vercel deployment logs

## 📄 License

**TFP** is released for educational and personal use. Please respect YouTube's terms of service and all applicable copyright laws. Use responsibly and support the artists whose music you enjoy.

---

**TFP © 2024 - Engineered for Audiophiles**  
*Premium audio extraction technology • Zero compromise on quality* 