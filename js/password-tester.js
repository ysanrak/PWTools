// Password Strength Tester Logic
const passwordInput = document.getElementById('password-input');
const toggleVisibility = document.getElementById('toggle-visibility');
const eyeIcon = document.getElementById('eye-icon');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const feedback = document.getElementById('feedback');

// Stats
const statLength = document.getElementById('stat-length');
const statEntropy = document.getElementById('stat-entropy');
const statTime = document.getElementById('stat-time');
const statCharset = document.getElementById('stat-charset');

// Toggle password visibility
toggleVisibility.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    eyeIcon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
});

// Test password on input
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    
    if (password.length === 0) {
        resetStrengthMeter();
        return;
    }
    
    const result = analyzePassword(password);
    updateUI(result);
});

function analyzePassword(password) {
    const length = password.length;
    
    // Check character types
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    
    // Calculate charset size
    let charsetSize = 0;
    if (hasLower) charsetSize += 26;
    if (hasUpper) charsetSize += 26;
    if (hasNumber) charsetSize += 10;
    if (hasSymbol) charsetSize += 32;
    
    // Calculate entropy
    const entropy = length * Math.log2(charsetSize);
    
    // Check for common patterns
    const hasSequential = /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password);
    const hasRepeating = /(.)\1{2,}/.test(password);
    const isCommon = checkCommonPasswords(password);
    
    // Calculate score (0-100)
    let score = 0;
    
    // Length bonus
    if (length >= 8) score += 20;
    if (length >= 12) score += 15;
    if (length >= 16) score += 15;
    if (length >= 20) score += 10;
    
    // Character variety bonus
    if (hasLower) score += 10;
    if (hasUpper) score += 10;
    if (hasNumber) score += 10;
    if (hasSymbol) score += 15;
    
    // Penalties
    if (hasSequential) score -= 10;
    if (hasRepeating) score -= 10;
    if (isCommon) score -= 30;
    if (length < 8) score -= 20;
    
    score = Math.max(0, Math.min(100, score));
    
    // Estimate crack time
    const crackTime = estimateCrackTime(charsetSize, length);
    
    return {
        score,
        length,
        entropy: Math.round(entropy),
        charsetSize,
        crackTime,
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        hasSequential,
        hasRepeating,
        isCommon
    };
}

function estimateCrackTime(charsetSize, length) {
    const combinations = Math.pow(charsetSize, length);
    const attemptsPerSecond = 1e10; // 10 billion attempts/sec (modern GPU)
    const seconds = combinations / attemptsPerSecond;
    
    if (seconds < 1) return "< 1 sec";
    if (seconds < 60) return Math.round(seconds) + " sec";
    if (seconds < 3600) return Math.round(seconds / 60) + " min";
    if (seconds < 86400) return Math.round(seconds / 3600) + " h";
    if (seconds < 2592000) return Math.round(seconds / 86400) + " j";
    if (seconds < 31536000) return Math.round(seconds / 2592000) + " mois";
    
    const years = seconds / 31536000;
    if (years < 1e6) return Math.round(years) + " ans";
    if (years < 1e9) return (years / 1e6).toFixed(1) + " M ans";
    return (years / 1e9).toFixed(1) + " Md ans";
}

function checkCommonPasswords(password) {
    const common = [
        'password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', 
        '1234567', 'letmein', 'trustno1', 'dragon', 'baseball', 'iloveyou',
        'password123', 'welcome', 'admin', 'root'
    ];
    return common.some(p => password.toLowerCase().includes(p));
}

function updateUI(result) {
    // Update stats
    statLength.textContent = result.length;
    statEntropy.textContent = result.entropy;
    statTime.textContent = result.crackTime;
    statCharset.textContent = result.charsetSize;
    
    // Update strength bar
    strengthBar.style.width = result.score + '%';
    
    let strengthLevel, strengthColor, strengthBg;
    
    if (result.score < 30) {
        strengthLevel = 'Très faible';
        strengthColor = 'text-red-600';
        strengthBg = 'bg-red-500';
    } else if (result.score < 50) {
        strengthLevel = 'Faible';
        strengthColor = 'text-orange-600';
        strengthBg = 'bg-orange-500';
    } else if (result.score < 70) {
        strengthLevel = 'Moyen';
        strengthColor = 'text-yellow-600';
        strengthBg = 'bg-yellow-500';
    } else if (result.score < 85) {
        strengthLevel = 'Bon';
        strengthColor = 'text-blue-600';
        strengthBg = 'bg-blue-500';
    } else {
        strengthLevel = 'Excellent';
        strengthColor = 'text-green-600';
        strengthBg = 'bg-green-500';
    }
    
    strengthText.textContent = strengthLevel;
    strengthText.className = `text-sm font-bold ${strengthColor}`;
    strengthBar.className = `h-4 transition-all duration-300 rounded-full ${strengthBg}`;
    
    // Update feedback
    let feedbackHTML = '';
    
    if (!result.hasLower) {
        feedbackHTML += '<div class="flex items-center text-sm text-orange-600"><i class="fas fa-exclamation-triangle mr-2"></i>Ajoutez des lettres minuscules</div>';
    }
    if (!result.hasUpper) {
        feedbackHTML += '<div class="flex items-center text-sm text-orange-600"><i class="fas fa-exclamation-triangle mr-2"></i>Ajoutez des lettres majuscules</div>';
    }
    if (!result.hasNumber) {
        feedbackHTML += '<div class="flex items-center text-sm text-orange-600"><i class="fas fa-exclamation-triangle mr-2"></i>Ajoutez des chiffres</div>';
    }
    if (!result.hasSymbol) {
        feedbackHTML += '<div class="flex items-center text-sm text-orange-600"><i class="fas fa-exclamation-triangle mr-2"></i>Ajoutez des symboles (!@#$...)</div>';
    }
    if (result.length < 12) {
        feedbackHTML += '<div class="flex items-center text-sm text-red-600"><i class="fas fa-times-circle mr-2"></i>Mot de passe trop court (minimum 12 caractères recommandé)</div>';
    }
    if (result.hasSequential) {
        feedbackHTML += '<div class="flex items-center text-sm text-red-600"><i class="fas fa-times-circle mr-2"></i>Évitez les séquences (abc, 123...)</div>';
    }
    if (result.hasRepeating) {
        feedbackHTML += '<div class="flex items-center text-sm text-red-600"><i class="fas fa-times-circle mr-2"></i>Évitez les caractères répétés</div>';
    }
    if (result.isCommon) {
        feedbackHTML += '<div class="flex items-center text-sm text-red-600"><i class="fas fa-times-circle mr-2"></i>Mot de passe trop commun, évitez les mots du dictionnaire</div>';
    }
    
    if (result.score >= 85) {
        feedbackHTML += '<div class="flex items-center text-sm text-green-600"><i class="fas fa-check-circle mr-2"></i>Excellent mot de passe !</div>';
    }
    
    feedback.innerHTML = feedbackHTML;
}

function resetStrengthMeter() {
    strengthBar.style.width = '0%';
    strengthText.textContent = '-';
    strengthText.className = 'text-sm font-bold';
    feedback.innerHTML = '';
    statLength.textContent = '0';
    statEntropy.textContent = '0';
    statTime.textContent = '-';
    statCharset.textContent = '0';
}
