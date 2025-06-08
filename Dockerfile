FROM python:3.10-slim

# Install Tesseract OCR and dependencies
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy code and install dependencies
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt

# Expose port and run app
CMD ["gunicorn", "-b", "0.0.0.0:10000", "app:app"]
