// Password Generator Logic
const chars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

const lengthSlider = document.getElementById('password-length');
const lengthValue = document.getElementById('length-value');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const passwordOutput = document.getElementById('password-output');
const copyFeedback = document.getElementById('copy-feedback');

const includeUppercase = document.getElementById('include-uppercase');
const includeLowercase = document.getElementById('include-lowercase');
const includeNumbers = document.getElementById('include-numbers');
const includeSymbols = document.getElementById('include-symbols');

// Update length display
lengthSlider.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
});

// Generate password
function generatePassword() {
    const length = parseInt(lengthSlider.value);
    let charset = '';
    
    if (includeUppercase.checked) charset += chars.uppercase;
    if (includeLowercase.checked) charset += chars.lowercase;
    if (includeNumbers.checked) charset += chars.numbers;
    if (includeSymbols.checked) charset += chars.symbols;
    
    if (charset === '') {
        alert('Veuillez sélectionner au moins un type de caractère !');
        return;
    }
    
    let password = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
        password += charset[array[i] % charset.length];
    }
    
    passwordOutput.value = password;
    copyFeedback.classList.add('hidden');
}

// Copy to clipboard
async function copyToClipboard() {
    const password = passwordOutput.value;
    
    if (password === 'Cliquez sur \'Générer\'' || password === '') {
        return;
    }
    
    try {
        await navigator.clipboard.writeText(password);
        copyFeedback.classList.remove('hidden');
        setTimeout(() => {
            copyFeedback.classList.add('hidden');
        }, 3000);
    } catch (err) {
        // Fallback for older browsers
        passwordOutput.select();
        document.execCommand('copy');
        copyFeedback.classList.remove('hidden');
        setTimeout(() => {
            copyFeedback.classList.add('hidden');
        }, 3000);
    }
}

// Event listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Generate on page load
window.addEventListener('load', generatePassword);
