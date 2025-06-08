from flask import Flask, render_template, request, send_file, jsonify
from flask_cors import CORS
import pytesseract
from PIL import Image
import cv2
import numpy as np
from gtts import gTTS
import os
import tempfile
import uuid
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# Create directories
os.makedirs('static/uploads', exist_ok=True)
os.makedirs('static/audio', exist_ok=True)

# English Braille mapping
ENGLISH_BRAILLE = {
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛',
    'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝',
    'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥',
    'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵', ' ': '⠀',
    '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠙', '5': '⠼⠑',
    '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓', '9': '⠼⠊', '0': '⠼⠚',
    '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖', ':': '⠒', ';': '⠆'
}

# Hindi Braille mapping
HINDI_BRAILLE = {
    'अ': '⠁', 'आ': '⠜', 'इ': '⠊', 'ई': '⠔', 'उ': '⠥', 'ऊ': '⠳',
    'ए': '⠑', 'ओ': '⠕', 'क': '⠅', 'ख': '⠨', 'ग': '⠛', 'घ': '⠣',
    'च': '⠉', 'छ': '⠡', 'ज': '⠚', 'झ': '⠴', 'ट': '⠞', 'ठ': '⠹',
    'ड': '⠙', 'ढ': '⠮', 'त': '⠞', 'थ': '⠹', 'द': '⠙', 'ध': '⠮',
    'न': '⠝', 'प': '⠏', 'फ': '⠋', 'ब': '⠃', 'भ': '⠘', 'म': '⠍',
    'य': '⠽', 'र': '⠗', 'ल': '⠇', 'व': '⠧', 'श': '⠩', 'ष': '⠯',
    's': '⠎', 'ह': '⠓', '।': '⠲', ' ': '⠀'
}

def extract_text(image_path, language):
    try:
        print(f"Processing image: {image_path}")
        img = cv2.imread(image_path)
        if img is None:
            return "Error: Could not read image file"
        
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        lang_code = 'hin' if language == 'hindi' else 'eng'
        text = pytesseract.image_to_string(thresh, lang=lang_code)
        
        if not text.strip():
            return "No text found in image"
        
        return text.strip()
    except Exception as e:
        print(f"OCR Error: {str(e)}")
        return f"OCR Error: {str(e)}"

def convert_to_braille(text, language):
    mapping = HINDI_BRAILLE if language == 'hindi' else ENGLISH_BRAILLE
    result = []
    for char in text:
        lower_char = char.lower()
        if language == 'english' and char.isupper():
            braille = '⠠' + mapping.get(lower_char, '⠿')
        else:
            braille = mapping.get(lower_char, mapping.get(char, '⠿'))
        result.append({
            'original': char, 
            'braille': braille, 
            'isCapital': char.isupper()
        })
    return result

def create_audio(text, language):
    try:
        if not text.strip():
            return None
        lang_code = 'hi' if language == 'hindi' else 'en'
        tts = gTTS(text=text, lang=lang_code, slow=False)
        filename = f"audio_{uuid.uuid4().hex}.mp3"
        filepath = os.path.join('static', 'audio', filename)
        tts.save(filepath)
        return filename
    except Exception as e:
        print(f"TTS Error: {str(e)}")
        return None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process_image():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'})
        
        file = request.files['image']
        language = request.form.get('language', 'english')
        
        if file.filename == '':
            return jsonify({'error': 'No image selected'})
        
        filename = secure_filename(file.filename)
        filepath = os.path.join('static', 'uploads', f"{uuid.uuid4().hex}_{filename}")
        file.save(filepath)
        
        print(f"File saved to: {filepath}")
        
        # Extract text
        text = extract_text(filepath, language)
        print(f"Extracted text: {text}")
        
        # Convert to Braille
        braille_mapping = convert_to_braille(text, language)
        
        # Create audio
        audio_file = create_audio(text, language)
        
        # Clean up
        try:
            os.remove(filepath)
        except:
            pass
        
        return jsonify({
            'extracted_text': text,
            'braille_mapping': braille_mapping,
            'audio_file': audio_file
        })
        
    except Exception as e:
        print(f"Process error: {str(e)}")
        return jsonify({'error': f'Processing failed: {str(e)}'})

@app.route('/audio/<filename>')
def serve_audio(filename):
    try:
        return send_file(os.path.join('static', 'audio', filename))
    except:
        return jsonify({'error': 'Audio file not found'})

if __name__ == '__main__':
    print("Starting Flask app...")
    print("Open your browser and go to: http://127.0.0.1:5000")
    app.run(host='127.0.0.1', port=5000, debug=True)
