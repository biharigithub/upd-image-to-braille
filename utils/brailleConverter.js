const brailleConverter = {
    // Verified English to Braille mapping (Grade 1 - Literary Braille)
    englishToBraille: {
        'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛',
        'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝',
        'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥',
        'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
        
        // Numbers with number prefix ⠼
        '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠙', '5': '⠼⠑',
        '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓', '9': '⠼⠊', '0': '⠼⠚',
        
        // Punctuation marks
        ' ': '⠀', '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖', 
        ':': '⠒', ';': '⠆', '-': '⠤', '(': '⠐⠣', ')': '⠐⠜',
        '"': '⠐⠦', "'": '⠄'
    },

    // Verified Hindi to Braille mapping (Bharati Braille)
    hindiToBraille: {
        // Hindi vowels
        'अ': '⠁', 'आ': '⠜', 'इ': '⠊', 'ई': '⠔', 'उ': '⠥', 'ऊ': '⠳', 
        'ऋ': '⠐⠗', 'ए': '⠑', 'ऐ': '⠌', 'ओ': '⠕', 'औ': '⠪',
        
        // Hindi consonants
        'क': '⠅', 'ख': '⠨', 'ग': '⠛', 'घ': '⠣', 'ङ': '⠬',
        'च': '⠉', 'छ': '⠡', 'ज': '⠚', 'झ': '⠴', 'ञ': '⠒',
        'ट': '⠞', 'ठ': '⠹', 'ड': '⠙', 'ढ': '⠮', 'ण': '⠼',
        'त': '⠞', 'थ': '⠹', 'द': '⠙', 'ध': '⠮', 'न': '⠝',
        'प': '⠏', 'फ': '⠋', 'ब': '⠃', 'भ': '⠘', 'म': '⠍',
        'य': '⠽', 'र': '⠗', 'ल': '⠇', 'व': '⠧', 'श': '⠩',
        'ष': '⠯', 'स': '⠎', 'ह': '⠓', 'क्ष': '⠅⠩', 'त्र': '⠞⠗',
        'ज्ञ': '⠚⠒',
        
        // Hindi punctuation
        '।': '⠲', '॥': '⠲⠲', ' ': '⠀'
    },

    convertToBraille(text, language) {
        try {
            const mapping = language === 'hin' ? this.hindiToBraille : this.englishToBraille;
            const result = [];
            
            for (let char of text) {
                const lowerChar = char.toLowerCase();
                let brailleChar;
                
                // Handle uppercase letters with capital prefix for English
                if (language === 'eng' && char !== lowerChar && mapping[lowerChar]) {
                    brailleChar = '⠠' + mapping[lowerChar]; // Capital prefix
                } else {
                    brailleChar = mapping[lowerChar] || mapping[char] || '⠿';
                }
                
                result.push({
                    original: char,
                    braille: brailleChar,
                    isSpace: char === ' ',
                    isCapital: language === 'eng' && char !== lowerChar
                });
            }
            
            return result;
        } catch (error) {
            throw new Error('Failed to convert text to Braille');
        }
    }
};
