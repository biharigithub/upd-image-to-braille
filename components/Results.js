function Results({ extractedText, brailleMapping, selectedLanguage, onReadAloud, isReading }) {
    try {
        if (!extractedText && !brailleMapping) {
            return null;
        }

        const copyToClipboard = (text, type) => {
            navigator.clipboard.writeText(text).then(() => {
                alert(`${type} copied to clipboard!`);
            });
        };

        const getBrailleText = () => {
            return brailleMapping ? brailleMapping.map(item => item.braille).join('') : '';
        };

        return (
            <div data-name="results" data-file="components/Results.js" className="bg-dark-card rounded-lg p-6 fade-in">
                <h2 className="text-xl font-semibold mb-6 text-gray-200">Results</h2>
                
                {extractedText && (
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-300">
                                Extracted Text ({selectedLanguage === 'eng' ? 'English' : 'Hindi'}):
                            </h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => copyToClipboard(extractedText, 'Text')}
                                    className="btn-primary text-white px-3 py-2 rounded-lg flex items-center space-x-2"
                                >
                                    <i className="fas fa-copy"></i>
                                    <span>Copy</span>
                                </button>
                                <button
                                    onClick={() => onReadAloud(extractedText)}
                                    disabled={isReading}
                                    className="btn-primary text-white px-3 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
                                >
                                    {isReading ? (
                                        <React.Fragment>
                                            <i className="fas fa-spinner loading-spinner"></i>
                                            <span>Reading...</span>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <i className="fas fa-volume-up"></i>
                                            <span>Read Aloud</span>
                                        </React.Fragment>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="bg-dark-input p-4 rounded-lg border border-dark">
                            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{extractedText}</p>
                        </div>
                    </div>
                )}

                {brailleMapping && brailleMapping.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-300">Braille Output:</h3>
                            <button
                                onClick={() => copyToClipboard(getBrailleText(), 'Braille')}
                                className="btn-primary text-white px-3 py-2 rounded-lg flex items-center space-x-2"
                            >
                                <i className="fas fa-copy"></i>
                                <span>Copy Braille</span>
                            </button>
                        </div>
                        <div className="bg-dark-input p-4 rounded-lg border border-dark">
                            <div className="flex flex-wrap gap-2">
                                {brailleMapping.map((item, index) => (
                                    <div key={index} className="flex flex-col items-center min-w-[40px]">
                                        <div className="text-2xl text-blue-300 font-mono mb-1 text-center">
                                            {item.braille}
                                        </div>
                                        <div className={`text-sm text-center ${
                                            item.isCapital ? 'text-yellow-400 font-bold' : 'text-gray-400'
                                        }`}>
                                            {item.isSpace ? '␣' : item.original}
                                        </div>
                                        {item.isCapital && (
                                            <div className="text-xs text-yellow-400">CAP</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                            <p className="text-sm text-blue-300">
                                <i className="fas fa-info-circle mr-2"></i>
                                {selectedLanguage === 'eng' 
                                    ? 'English Braille (Grade 1): Capital letters are prefixed with ⠠'
                                    : 'Hindi Bharati Braille: Standard Unicode Braille characters'
                                }
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Results component error:', error);
        reportError(error);
    }
}
