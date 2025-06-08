const textToSpeechService = {
    speak(text, language) {
        return new Promise((resolve, reject) => {
            try {
                if ('speechSynthesis' in window) {
                    // Cancel any ongoing speech
                    speechSynthesis.cancel();
                    
                    const utterance = new SpeechSynthesisUtterance(text);
                    
                    // Set language
                    utterance.lang = language === 'hin' ? 'hi-IN' : 'en-US';
                    utterance.rate = 0.8;
                    utterance.pitch = 1;
                    utterance.volume = 1;
                    
                    utterance.onend = () => resolve();
                    utterance.onerror = (error) => reject(error);
                    
                    speechSynthesis.speak(utterance);
                } else {
                    reject(new Error('Speech synthesis not supported'));
                }
            } catch (error) {
                reject(error);
            }
        });
    },

    stop() {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
    }
};
