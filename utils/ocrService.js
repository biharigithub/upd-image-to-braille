const ocrService = {
    async extractText(imageFile, language) {
        try {
            // Load Tesseract.js dynamically
            if (!window.Tesseract) {
                await this.loadTesseract();
            }

            const worker = await Tesseract.createWorker();
            
            // Set language based on selection
            const ocrLang = language === 'hin' ? 'hin' : 'eng';
            await worker.loadLanguage(ocrLang);
            await worker.initialize(ocrLang);
            
            // Perform OCR on the image
            const { data: { text } } = await worker.recognize(imageFile);
            await worker.terminate();
            
            return text.trim();
        } catch (error) {
            console.error('OCR Error:', error);
            throw new Error('Failed to extract text from image. Please try with a clearer image.');
        }
    },

    async loadTesseract() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@4/dist/tesseract.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
};
