// Word Counter
const textInput = document.getElementById('text-input');
const wordCount = document.getElementById('word-count');
const charCount = document.getElementById('char-count');
const sentenceCount = document.getElementById('sentence-count');
const paragraphCount = document.getElementById('paragraph-count');
const charNoSpace = document.getElementById('char-no-space');
const readingTime = document.getElementById('reading-time');
const avgWordLength = document.getElementById('avg-word-length');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');

function updateCounts() {
    const text = textInput.value;
    
    // Words count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCountValue = words.length;
    
    // Characters count
    const charCountValue = text.length;
    const charNoSpaceValue = text.replace(/\s/g, '').length;
    
    // Sentences count (basic: split by . ! ?)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCountValue = sentences.length;
    
    // Paragraphs count
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
    const paragraphCountValue = paragraphs.length;
    
    // Reading time (average 200 words per minute)
    const readingTimeValue = Math.ceil(wordCountValue / 200);
    
    // Average word length
    const totalChars = words.join('').length;
    const avgWordLengthValue = wordCountValue > 0 ? (totalChars / wordCountValue).toFixed(1) : 0;
    
    // Update display
    wordCount.textContent = wordCountValue;
    charCount.textContent = charCountValue;
    sentenceCount.textContent = sentenceCountValue;
    paragraphCount.textContent = paragraphCountValue;
    charNoSpace.textContent = charNoSpaceValue;
    readingTime.textContent = readingTimeValue > 0 ? readingTimeValue + ' min' : '< 1 min';
    avgWordLength.textContent = avgWordLengthValue;
}

async function copyText() {
    const text = textInput.value;
    
    if (!text) {
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        copyBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Copié !';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy mr-2"></i> Copier le texte';
        }, 2000);
    } catch (err) {
        textInput.select();
        document.execCommand('copy');
        copyBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Copié !';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy mr-2"></i> Copier le texte';
        }, 2000);
    }
}

function clearText() {
    textInput.value = '';
    updateCounts();
}

// Event listeners
textInput.addEventListener('input', updateCounts);
copyBtn.addEventListener('click', copyText);
clearBtn.addEventListener('click', clearText);

// Initial update
updateCounts();
