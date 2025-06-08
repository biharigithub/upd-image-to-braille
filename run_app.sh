#!/bin/bash
echo "Starting Braille Converter App..."
echo ""
echo "Make sure you have installed:"
echo "1. Python"
echo "2. Tesseract OCR"
echo "3. All requirements (pip install -r requirements.txt)"
echo ""
echo "Opening browser..."
if command -v xdg-open > /dev/null; then
    xdg-open http://127.0.0.1:5000
elif command -v open > /dev/null; then
    open http://127.0.0.1:5000
fi
echo ""
echo "Starting Flask app..."
python app.py
