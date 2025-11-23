// BMI Calculator
const weightInput = document.getElementById('weight-input');
const heightInput = document.getElementById('height-input');
const calculateBtn = document.getElementById('calculate-btn');
const resultSection = document.getElementById('result-section');
const bmiValue = document.getElementById('bmi-value');
const bmiCategory = document.getElementById('bmi-category');
const bmiBar = document.getElementById('bmi-bar');
const bmiInterpretation = document.getElementById('bmi-interpretation');

function calculateBMI() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    
    if (!weight || !height || weight <= 0 || height <= 0) {
        alert('Veuillez entrer des valeurs valides pour le poids et la taille.');
        return;
    }
    
    // Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    displayResult(bmi);
}

function displayResult(bmi) {
    const bmiRounded = bmi.toFixed(1);
    bmiValue.textContent = bmiRounded;
    
    let category, color, bgColor, barWidth, interpretation, advice;
    
    if (bmi < 18.5) {
        category = 'Insuffisance pondérale';
        color = 'text-blue-600';
        bgColor = 'bg-blue-100 border-blue-200';
        barWidth = (bmi / 18.5) * 20; // 0-20% of bar
        interpretation = 'Votre IMC indique une insuffisance pondérale.';
        advice = 'Consultez un professionnel de santé pour un avis personnalisé. Une alimentation équilibrée et adaptée peut vous aider.';
    } else if (bmi < 25) {
        category = 'Poids normal';
        color = 'text-green-600';
        bgColor = 'bg-green-100 border-green-200';
        barWidth = 20 + ((bmi - 18.5) / 6.5) * 30; // 20-50% of bar
        interpretation = 'Félicitations ! Votre IMC est dans la plage normale.';
        advice = 'Maintenez une alimentation équilibrée et une activité physique régulière pour rester en bonne santé.';
    } else if (bmi < 30) {
        category = 'Surpoids';
        color = 'text-yellow-600';
        bgColor = 'bg-yellow-100 border-yellow-200';
        barWidth = 50 + ((bmi - 25) / 5) * 25; // 50-75% of bar
        interpretation = 'Votre IMC indique un surpoids.';
        advice = 'Adoptez une alimentation saine et augmentez votre activité physique. Consultez un professionnel de santé pour un programme adapté.';
    } else if (bmi < 35) {
        category = 'Obésité modérée (Classe I)';
        color = 'text-orange-600';
        bgColor = 'bg-orange-100 border-orange-200';
        barWidth = 75 + ((bmi - 30) / 5) * 15; // 75-90% of bar
        interpretation = 'Votre IMC indique une obésité modérée.';
        advice = 'Il est recommandé de consulter un médecin pour établir un plan de perte de poids adapté et sécuritaire.';
    } else {
        category = 'Obésité sévère (Classe II et +)';
        color = 'text-red-600';
        bgColor = 'bg-red-100 border-red-200';
        barWidth = Math.min(90 + ((bmi - 35) / 10) * 10, 100); // 90-100% of bar
        interpretation = 'Votre IMC indique une obésité sévère.';
        advice = 'Consultez rapidement un professionnel de santé pour un suivi médical. Une prise en charge adaptée est importante pour votre santé.';
    }
    
    bmiCategory.textContent = category;
    bmiCategory.className = `text-xl font-semibold mb-4 ${color}`;
    bmiBar.style.width = barWidth + '%';
    bmiBar.className = `h-4 transition-all duration-500 ${color.replace('text', 'bg')}`;
    
    bmiInterpretation.className = `p-6 rounded-lg mb-6 border ${bgColor}`;
    bmiInterpretation.innerHTML = `
        <p class="font-semibold mb-2 ${color}">${interpretation}</p>
        <p class="text-gray-700">${advice}</p>
    `;
    
    resultSection.classList.remove('hidden');
    
    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

calculateBtn.addEventListener('click', calculateBMI);

// Calculate on Enter key
weightInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateBMI();
});

heightInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') calculateBMI();
});
