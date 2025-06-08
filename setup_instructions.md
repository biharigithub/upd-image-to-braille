# Setup Instructions for VS Code

## Step 1: Install Python and Dependencies

1. **Install Python** (if not installed):
   - Download from https://python.org
   - Make sure to check "Add Python to PATH"

2. **Install Tesseract OCR**:
   
   **Windows:**
   - Download from: https://github.com/UB-Mannheim/tesseract/wiki
   - Install and add to PATH
   - Download Hindi language pack

   **macOS:**
   bash
   brew install tesseract tesseract-lang
   

   **Ubuntu/Linux:**
   bash
   sudo apt-get install tesseract-ocr tesseract-ocr-hin
   

## Step 2: Setup Project in VS Code

1. **Open VS Code**
2. **Open Terminal** (Ctrl+`)
3. **Navigate to project folder**:
   bash
   cd path/to/your/project
   

4. **Create virtual environment**:
   bash
   python -m venv venv
   

5. **Activate virtual environment**:
   
   **Windows:**
   bash
   venv\Scripts\activate
   
   
   **macOS/Linux:**
   bash
   source venv/bin/activate
   

6. **Install dependencies**:
   bash
   pip install -r requirements.txt
   

## Step 3: Run the Application

1. **Make sure virtual environment is active**
2. **Run the app**:
   bash
   python app.py
   

3. **Open browser and go to**:
   
   http://127.0.0.1:5000
   

## Troubleshooting

### If you get "Tesseract not found" error:
- Make sure Tesseract is installed and in PATH
- On Windows, add Tesseract installation folder to system PATH

### If you get "Failed to fetch" error:
- Make sure Flask app is running (check terminal)
- Try refreshing the browser page
- Check if port 5000 is available

### If OCR doesn't work:
- Make sure image has clear, readable text
- Try with different image formats (PNG, JPG)
- Ensure Hindi language pack is installed for Hindi text

## Project Structure

your-project/
├── app.py
├── requirements.txt
├── templates/
│   └── index.html
├── static/
│   ├── uploads/ (created automatically)
│   └── audio/ (created automatically)
└── venv/ (virtual environment)
