// Base64 Encoder/Decoder
const encodeInput = document.getElementById('encode-input');
const encodeOutput = document.getElementById('encode-output');
const encodeBtn = document.getElementById('encode-btn');
const copyEncodeBtn = document.getElementById('copy-encode-btn');

const decodeInput = document.getElementById('decode-input');
const decodeOutput = document.getElementById('decode-output');
const decodeBtn = document.getElementById('decode-btn');
const copyDecodeBtn = document.getElementById('copy-decode-btn');

// Encode to Base64
function encodeToBase64() {
    const text = encodeInput.value;
    
    if (!text) {
        encodeOutput.value = '';
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(text)));
        encodeOutput.value = encoded;
    } catch (err) {
        encodeOutput.value = 'Erreur : impossible d\'encoder ce texte.';
    }
}

// Decode from Base64
function decodeFromBase64() {
    const text = decodeInput.value.trim();
    
    if (!text) {
        decodeOutput.value = '';
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(text)));
        decodeOutput.value = decoded;
    } catch (err) {
        decodeOutput.value = 'Erreur : chaîne Base64 invalide.';
    }
}

// Copy encode output
async function copyEncoded() {
    const text = encodeOutput.value;
    
    if (!text || text.startsWith('Erreur')) {
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        copyEncodeBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Copié !';
        setTimeout(() => {
            copyEncodeBtn.innerHTML = '<i class="fas fa-copy mr-2"></i> Copier';
        }, 2000);
    } catch (err) {
        encodeOutput.select();
        document.execCommand('copy');
        copyEncodeBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Copié !';
        setTimeout(() => {
            copyEncodeBtn.innerHTML = '<i class="fas fa-copy mr-2"></i> Copier';
        }, 2000);
    }
}

// Copy decode output
async function copyDecoded() {
    const text = decodeOutput.value;
    
    if (!text || text.startsWith('Erreur')) {
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        copyDecodeBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Copié !';
        setTimeout(() => {
            copyDecodeBtn.innerHTML = '<i class="fas fa-copy mr-2"></i> Copier';
        }, 2000);
    } catch (err) {
        decodeOutput.select();
        document.execCommand('copy');
        copyDecodeBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Copié !';
        setTimeout(() => {
            copyDecodeBtn.innerHTML = '<i class="fas fa-copy mr-2"></i> Copier';
        }, 2000);
    }
}

// Event listeners
encodeBtn.addEventListener('click', encodeToBase64);
decodeBtn.addEventListener('click', decodeFromBase64);
copyEncodeBtn.addEventListener('click', copyEncoded);
copyDecodeBtn.addEventListener('click', copyDecoded);

// Auto-encode/decode on input
encodeInput.addEventListener('input', encodeToBase64);
decodeInput.addEventListener('input', decodeFromBase64);
