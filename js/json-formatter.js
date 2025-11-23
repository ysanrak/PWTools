// JSON Formatter
const jsonInput = document.getElementById('json-input');
const jsonOutput = document.getElementById('json-output');
const formatBtn = document.getElementById('format-btn');
const minifyBtn = document.getElementById('minify-btn');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const validationStatus = document.getElementById('validation-status');

// Format JSON
function formatJSON() {
    const input = jsonInput.value.trim();
    
    if (!input) {
        showValidationStatus(false, 'Veuillez entrer du JSON à formater.');
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 2);
        jsonOutput.value = formatted;
        showValidationStatus(true, 'JSON valide et formaté avec succès !');
    } catch (err) {
        showValidationStatus(false, 'Erreur JSON : ' + err.message);
        jsonOutput.value = '';
    }
}

// Minify JSON
function minifyJSON() {
    const input = jsonInput.value.trim();
    
    if (!input) {
        showValidationStatus(false, 'Veuillez entrer du JSON à minifier.');
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        jsonOutput.value = minified;
        showValidationStatus(true, 'JSON valide et minifié avec succès !');
    } catch (err) {
        showValidationStatus(false, 'Erreur JSON : ' + err.message);
        jsonOutput.value = '';
    }
}

// Copy output
async function copyOutput() {
    const text = jsonOutput.value;
    
    if (!text) {
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        copyBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Copié !';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy mr-2"></i> Copier';
        }, 2000);
    } catch (err) {
        jsonOutput.select();
        document.execCommand('copy');
        copyBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Copié !';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy mr-2"></i> Copier';
        }, 2000);
    }
}

// Clear all
function clearAll() {
    jsonInput.value = '';
    jsonOutput.value = '';
    validationStatus.classList.add('hidden');
}

// Show validation status
function showValidationStatus(isValid, message) {
    const statusDiv = validationStatus.querySelector('div');
    const icon = statusDiv.querySelector('i');
    const text = statusDiv.querySelector('span');
    
    if (isValid) {
        statusDiv.className = 'flex items-center p-4 rounded-lg bg-green-50 border border-green-200';
        icon.className = 'fas fa-check-circle text-green-600 text-2xl mr-3';
        text.className = 'font-semibold text-green-700';
    } else {
        statusDiv.className = 'flex items-center p-4 rounded-lg bg-red-50 border border-red-200';
        icon.className = 'fas fa-times-circle text-red-600 text-2xl mr-3';
        text.className = 'font-semibold text-red-700';
    }
    
    text.textContent = message;
    validationStatus.classList.remove('hidden');
}

// Event listeners
formatBtn.addEventListener('click', formatJSON);
minifyBtn.addEventListener('click', minifyJSON);
copyBtn.addEventListener('click', copyOutput);
clearBtn.addEventListener('click', clearAll);

// Auto-format on input (with debounce)
let formatTimeout;
jsonInput.addEventListener('input', () => {
    clearTimeout(formatTimeout);
    formatTimeout = setTimeout(() => {
        if (jsonInput.value.trim()) {
            formatJSON();
        }
    }, 1000);
});
