# Image to Braille Converter

A complete Python Flask application that converts images with text to Braille characters, supporting both Hindi and English with proper text-to-speech functionality.

## Features

- **Real OCR**: Pytesseract-based text extraction
- **Language Support**: English and Hindi OCR
- **Braille Conversion**: Accurate Grade 1 English and Bharati Hindi Braille
- **Text-to-Speech**: gTTS integration with proper language detection
- **Mobile Ready**: Works on Android APK and web deployment
- **Character Mapping**: Visual display of Braille with original characters

## Quick Start

1. **Install Dependencies**:
bash
pip install -r requirements.txt


2. **Install Tesseract OCR**:
bash
# Ubuntu/Debian
sudo apt-get install tesseract-ocr tesseract-ocr-hin

# Windows (download from GitHub)
# macOS
brew install tesseract tesseract-lang


3. **Run Application**:
bash
python app.py


4. **Access**: Open `http://localhost:5000`

## Deployment Options

### Render.com
- Connect GitHub repository
- Build Command: `pip install -r requirements.txt`
- Start Command: `gunicorn app:app`

### Heroku
bash
git init
git add .
git commit -m "Initial commit"
heroku create your-app-name
git push heroku main


### Android APK (using Buildozer)
bash
pip install buildozer
buildozer init
buildozer android debug


## Usage

1. Select language (English/Hindi)
2. Upload image with printed text
3. Click "Extract Text & Convert"
4. View results with character-by-character Braille mapping
5. Use "Read Aloud" for TTS playback

## Technical Details

- **Backend**: Flask, Pytesseract, OpenCV, gTTS
- **Frontend**: Bootstrap 5, Vanilla JavaScript
- **Braille**: Unicode standard characters
- **TTS**: Multi-language support (en/hi)
