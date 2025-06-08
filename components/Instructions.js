function Instructions() {
    try {
        const steps = [
            "Select your preferred language (English or Hindi)",
            "Upload an image containing text in the selected language",
            "Wait for the OCR to extract text from your image",
            "Listen to the extracted text using the 'Read Aloud' feature",
            "View the Braille conversion of your text below"
        ];

        return (
            <div data-name="instructions" data-file="components/Instructions.js" className="bg-dark-card rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-200">How to Use</h2>
                <p className="text-gray-400 mb-6">
                    This tool extracts text from images and converts it into Braille characters. Follow these steps:
                </p>
                
                <ol className="space-y-3">
                    {steps.map((step, index) => (
                        <li key={index} className="flex items-start space-x-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                {index + 1}
                            </span>
                            <p className="text-gray-300">{step}</p>
                        </li>
                    ))}
                </ol>

                <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                    <div className="flex items-start space-x-3">
                        <i className="fas fa-info-circle text-blue-400 mt-1"></i>
                        <div>
                            <p className="text-blue-300 font-medium mb-2">Tips for better results:</p>
                            <ul className="text-sm text-blue-200 space-y-1">
                                <li>• Use high-quality, clear images</li>
                                <li>• Ensure good contrast between text and background</li>
                                <li>• Avoid blurry or skewed images</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Instructions component error:', error);
        reportError(error);
    }
}
