// UUID Generator Logic
const uuidOutput = document.getElementById('uuid-output');
const generateOneBtn = document.getElementById('generate-one-btn');
const generateBulkBtn = document.getElementById('generate-bulk-btn');
const copyBtn = document.getElementById('copy-btn');
const copyFeedback = document.getElementById('copy-feedback');
const bulkSection = document.getElementById('bulk-section');
const bulkCount = document.getElementById('bulk-count');
const formatSelect = document.getElementById('format-select');
const bulkOutput = document.getElementById('bulk-output');
const copyBulkBtn = document.getElementById('copy-bulk-btn');
const downloadBtn = document.getElementById('download-btn');

// Generate UUID v4
function generateUUID() {
    if (typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    } else {
        // Fallback for older browsers
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

// Format UUID
function formatUUID(uuid, format) {
    switch(format) {
        case 'compact':
            return uuid.replace(/-/g, '');
        case 'uppercase':
            return uuid.toUpperCase();
        case 'braces':
            return '{' + uuid + '}';
        default:
            return uuid;
    }
}

// Generate single UUID
function generateSingleUUID() {
    const uuid = generateUUID();
    uuidOutput.value = uuid;
    copyFeedback.classList.add('hidden');
    bulkSection.classList.add('hidden');
}

// Generate bulk UUIDs
function generateBulkUUIDs() {
    const count = parseInt(bulkCount.value);
    const format = formatSelect.value;
    
    if (count < 1 || count > 100) {
        alert('Veuillez entrer un nombre entre 1 et 100');
        return;
    }
    
    const uuids = [];
    for (let i = 0; i < count; i++) {
        const uuid = generateUUID();
        uuids.push(formatUUID(uuid, format));
    }
    
    bulkOutput.value = uuids.join('\n');
    bulkSection.classList.remove('hidden');
    
    // Also update single UUID display with first one
    uuidOutput.value = uuids[0];
}

// Copy single UUID
async function copySingleUUID() {
    const uuid = uuidOutput.value;
    
    if (!uuid) {
        return;
    }
    
    try {
        await navigator.clipboard.writeText(uuid);
        showCopyFeedback();
    } catch (err) {
        uuidOutput.select();
        document.execCommand('copy');
        showCopyFeedback();
    }
}

// Copy bulk UUIDs
async function copyBulkUUIDs() {
    const uuids = bulkOutput.value;
    
    if (!uuids) {
        return;
    }
    
    try {
        await navigator.clipboard.writeText(uuids);
        alert('UUIDs copiés dans le presse-papiers !');
    } catch (err) {
        bulkOutput.select();
        document.execCommand('copy');
        alert('UUIDs copiés dans le presse-papiers !');
    }
}

// Download UUIDs as text file
function downloadUUIDs() {
    const uuids = bulkOutput.value;
    
    if (!uuids) {
        return;
    }
    
    const blob = new Blob([uuids], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uuids-' + new Date().getTime() + '.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function showCopyFeedback() {
    copyFeedback.classList.remove('hidden');
    setTimeout(() => {
        copyFeedback.classList.add('hidden');
    }, 3000);
}

// Event listeners
generateOneBtn.addEventListener('click', generateSingleUUID);
generateBulkBtn.addEventListener('click', generateBulkUUIDs);
copyBtn.addEventListener('click', copySingleUUID);
copyBulkBtn.addEventListener('click', copyBulkUUIDs);
downloadBtn.addEventListener('click', downloadUUIDs);

// Generate on page load
window.addEventListener('load', generateSingleUUID);
