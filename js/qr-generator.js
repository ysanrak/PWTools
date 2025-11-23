// QR Code Generator
const qrInput = document.getElementById('qr-input');
const qrType = document.getElementById('qr-type');
const qrSize = document.getElementById('qr-size');
const generateQrBtn = document.getElementById('generate-qr-btn');
const downloadQrBtn = document.getElementById('download-qr-btn');
const qrcodeDiv = document.getElementById('qrcode');
const qrPlaceholder = document.getElementById('qr-placeholder');

let qrCodeInstance = null;

// Update placeholder based on type
qrType.addEventListener('change', () => {
    const type = qrType.value;
    let placeholder = '';
    
    switch(type) {
        case 'url':
            placeholder = 'https://exemple.com';
            break;
        case 'email':
            placeholder = 'mailto:exemple@email.com';
            break;
        case 'phone':
            placeholder = 'tel:+33123456789';
            break;
        case 'sms':
            placeholder = 'sms:+33123456789?body=Bonjour';
            break;
        case 'wifi':
            placeholder = 'WIFI:T:WPA;S:NomReseau;P:MotDePasse;;';
            break;
        default:
            placeholder = 'Entrez votre texte...';
    }
    
    qrInput.placeholder = placeholder;
});

// Generate QR Code
function generateQRCode() {
    let content = qrInput.value.trim();
    
    if (!content) {
        alert('Veuillez entrer du contenu pour générer le QR code.');
        return;
    }
    
    // Format content based on type
    const type = qrType.value;
    if (type === 'url' && !content.startsWith('http')) {
        content = 'https://' + content;
    } else if (type === 'email' && !content.startsWith('mailto:')) {
        content = 'mailto:' + content;
    } else if (type === 'phone' && !content.startsWith('tel:')) {
        content = 'tel:' + content;
    } else if (type === 'sms' && !content.startsWith('sms:')) {
        content = 'sms:' + content;
    }
    
    const size = parseInt(qrSize.value);
    
    // Clear previous QR code
    qrcodeDiv.innerHTML = '';
    qrPlaceholder.style.display = 'none';
    
    // Generate new QR code
    qrCodeInstance = new QRCode(qrcodeDiv, {
        text: content,
        width: size,
        height: size,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Show download button
    downloadQrBtn.classList.remove('hidden');
}

// Download QR Code
function downloadQRCode() {
    const canvas = qrcodeDiv.querySelector('canvas');
    
    if (!canvas) {
        alert('Veuillez d\'abord générer un QR code.');
        return;
    }
    
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode-' + new Date().getTime() + '.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

generateQrBtn.addEventListener('click', generateQRCode);
downloadQrBtn.addEventListener('click', downloadQRCode);
