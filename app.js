function App() {
    try {
        const [selectedLanguage, setSelectedLanguage] = React.useState('eng');
        const [extractedText, setExtractedText] = React.useState('');
        const [brailleMapping, setBrailleMapping] = React.useState([]);
        const [isProcessing, setIsProcessing] = React.useState(false);
        const [isReading, setIsReading] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleLanguageChange = (language) => {
            setSelectedLanguage(language);
            // Clear previous results when language changes
            setExtractedText('');
            setBrailleMapping([]);
            setError('');
        };

        const handleImageSelect = async (imageFile) => {
            try {
                setIsProcessing(true);
                setError('');
                setExtractedText('');
                setBrailleMapping([]);
                
                // Extract text using real OCR
                const text = await ocrService.extractText(imageFile, selectedLanguage);
                
                if (!text || text.trim().length === 0) {
                    throw new Error('No text found in the image. Please try with a clearer image containing text.');
                }
                
                setExtractedText(text);
                
                // Convert to Braille with character mapping
                const brailleResult = brailleConverter.convertToBraille(text, selectedLanguage);
                setBrailleMapping(brailleResult);
                
            } catch (err) {
                console.error('Processing error:', err);
                setError(err.message || 'Failed to process image. Please try again with a clearer image.');
            } finally {
                setIsProcessing(false);
            }
        };

        const handleReadAloud = async (text) => {
            try {
                setIsReading(true);
                setError('');
                await textToSpeechService.speak(text, selectedLanguage);
            } catch (err) {
                console.error('TTS error:', err);
                setError('Failed to read text aloud. Please check your browser settings and ensure audio is enabled.');
            } finally {
                setIsReading(false);
            }
        };

        const clearError = () => {
            setError('');
        };

        return (
            <div data-name="app" data-file="app.js" className="min-h-screen bg-gray-900">
                <Header />
                
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">Image to Braille Converter</h1>
                        <p className="text-xl text-gray-400">
                            Upload images with {selectedLanguage === 'eng' ? 'English' : 'Hindi'} text and convert to Braille
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <LanguageSelector 
                                selectedLanguage={selectedLanguage}
                                onLanguageChange={handleLanguageChange}
                            />
                            
                            <ImageUpload
                                onImageSelect={handleImageSelect}
                                selectedLanguage={selectedLanguage}
                                isProcessing={isProcessing}
                            />
                        </div>

                        <div className="space-y-8">
                            <Results
                                extractedText={extractedText}
                                brailleMapping={brailleMapping}
                                selectedLanguage={selectedLanguage}
                                onReadAloud={handleReadAloud}
                                isReading={isReading}
                            />
                            
                            <Instructions />
                        </div>
                    </div>
                </main>

                <ErrorNotification error={error} onClose={clearError} />
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

// Render the app
ReactDOM.render(React.createElement(App), document.getElementById('root'));
