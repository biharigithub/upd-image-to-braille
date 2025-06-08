function LanguageSelector({ selectedLanguage, onLanguageChange }) {
    try {
        const languages = [
            { code: 'eng', name: 'English', flag: '🇺🇸' },
            { code: 'hin', name: 'हिंदी (Hindi)', flag: '🇮🇳' }
        ];

        return (
            <div data-name="language-selector" data-file="components/LanguageSelector.js" className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-200">Select Language</h3>
                <div className="grid grid-cols-2 gap-4">
                    {languages.map((lang) => (
                        <label key={lang.code} className="cursor-pointer">
                            <input
                                type="radio"
                                name="language"
                                value={lang.code}
                                checked={selectedLanguage === lang.code}
                                onChange={(e) => onLanguageChange(e.target.value)}
                                className="sr-only"
                            />
                            <div className={`p-4 rounded-lg border-2 transition-all ${
                                selectedLanguage === lang.code 
                                    ? 'border-blue-500 bg-blue-500/10' 
                                    : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                            }`}>
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{lang.flag}</span>
                                    <span className="font-medium">{lang.name}</span>
                                </div>
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('LanguageSelector component error:', error);
        reportError(error);
    }
}
