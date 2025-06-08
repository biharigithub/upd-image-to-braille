function ErrorNotification({ error, onClose }) {
    try {
        if (!error) return null;

        return (
            <div data-name="error-notification" data-file="components/ErrorNotification.js" className="fixed top-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-md z-50 fade-in">
                <div className="flex items-start space-x-3">
                    <i className="fas fa-exclamation-triangle text-xl mt-1"></i>
                    <div className="flex-1">
                        <h4 className="font-semibold mb-1">Error</h4>
                        <p className="text-sm">{error}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ErrorNotification component error:', error);
        reportError(error);
    }
}
