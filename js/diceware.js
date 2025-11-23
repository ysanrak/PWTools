// Diceware passphrase generator
const wordList = [
    'abeille', 'acteur', 'adresse', 'affaire', 'agent', 'aigle', 'alarme', 'album', 'allume', 'amande',
    'amour', 'ancien', 'ange', 'animal', 'anneau', 'antenne', 'appel', 'arbre', 'argent', 'armoire',
    'artiste', 'assiette', 'attaque', 'atelier', 'autobus', 'automne', 'avenir', 'aventure', 'avion', 'badge',
    'bagage', 'balcon', 'baleine', 'ballon', 'banane', 'banque', 'barbe', 'barreau', 'bateau', 'baton',
    'batterie', 'beaute', 'bebete', 'beige', 'berceau', 'besoin', 'betail', 'beurre', 'bijou', 'billet',
    'biscuit', 'blague', 'blanc', 'blason', 'blessure', 'bocal', 'boeuf', 'boisson', 'bonbon', 'bonheur',
    'bonnet', 'bordure', 'bouche', 'bougie', 'bouquin', 'bourse', 'bouton', 'branche', 'brique', 'brocoli',
    'bronze', 'brosse', 'brouette', 'brume', 'budget', 'bureau', 'cabane', 'cable', 'cacao', 'cadeau',
    'cadre', 'cafe', 'cahier', 'caillou', 'caisse', 'calcul', 'calme', 'camarade', 'camion', 'canape',
    'canard', 'canif', 'canon', 'caoutchouc', 'capital', 'capsule', 'capuche', 'caramel', 'carotte', 'carte',
    'carton', 'casque', 'casserole', 'castor', 'catalogue', 'cauchemar', 'caverne', 'ceinture', 'cellule', 'cendrier',
    'cercle', 'cerise', 'chaine', 'chaise', 'chaleur', 'chambre', 'chameau', 'champ', 'champion', 'chance',
    'chandail', 'chanson', 'chapeau', 'chapitre', 'charbon', 'chariot', 'chasse', 'chat', 'chateau', 'chaussure',
    'chemin', 'chemise', 'chene', 'cheval', 'cheveu', 'chien', 'chiffre', 'chocolat', 'ciel', 'cigare',
    'ciment', 'cinema', 'cirque', 'citron', 'clavier', 'client', 'climat', 'cloche', 'clou', 'coccinelle',
    'cochon', 'coeur', 'coffre', 'coin', 'colere', 'collier', 'colline', 'colonne', 'combat', 'comedie',
    'comete', 'commande', 'compas', 'concert', 'conduire', 'conge', 'conseil', 'conte', 'controle', 'copain',
    'copie', 'coquille', 'corail', 'corbeau', 'corde', 'corps', 'costume', 'coton', 'cou', 'couche',
    'coude', 'couleur', 'coupure', 'courage', 'couronne', 'courrier', 'course', 'cousin', 'couteau', 'couverture',
    'craie', 'crapaud', 'cravate', 'crayon', 'creature', 'creche', 'credit', 'creme', 'crepe', 'crevette'
];

const passphraseOutput = document.getElementById('passphrase-output');
const wordCountSlider = document.getElementById('word-count');
const wordCountValue = document.getElementById('word-count-value');
const capitalizeCheckbox = document.getElementById('capitalize');
const addNumbersCheckbox = document.getElementById('add-numbers');
const separatorSelect = document.getElementById('separator');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const copyFeedback = document.getElementById('copy-feedback');

// Update word count display
wordCountSlider.addEventListener('input', (e) => {
    wordCountValue.textContent = e.target.value;
});

// Generate passphrase
function generatePassphrase() {
    const wordCount = parseInt(wordCountSlider.value);
    const capitalize = capitalizeCheckbox.checked;
    const addNumbers = addNumbersCheckbox.checked;
    const separator = separatorSelect.value;
    
    const words = [];
    const array = new Uint32Array(wordCount);
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < wordCount; i++) {
        let word = wordList[array[i] % wordList.length];
        if (capitalize) {
            word = word.charAt(0).toUpperCase() + word.slice(1);
        }
        words.push(word);
    }
    
    let passphrase = words.join(separator);
    
    if (addNumbers) {
        const numArray = new Uint32Array(2);
        window.crypto.getRandomValues(numArray);
        const randomNum = (numArray[0] % 9000) + 1000; // 4-digit number
        passphrase += separator + randomNum;
    }
    
    passphraseOutput.value = passphrase;
    copyFeedback.classList.add('hidden');
}

// Copy to clipboard
async function copyToClipboard() {
    const passphrase = passphraseOutput.value;
    
    if (passphrase === 'Cliquez sur \'Générer\'' || passphrase === '') {
        return;
    }
    
    try {
        await navigator.clipboard.writeText(passphrase);
        copyFeedback.classList.remove('hidden');
        setTimeout(() => {
            copyFeedback.classList.add('hidden');
        }, 3000);
    } catch (err) {
        passphraseOutput.select();
        document.execCommand('copy');
        copyFeedback.classList.remove('hidden');
        setTimeout(() => {
            copyFeedback.classList.add('hidden');
        }, 3000);
    }
}

generateBtn.addEventListener('click', generatePassphrase);
copyBtn.addEventListener('click', copyToClipboard);

// Generate on page load
window.addEventListener('load', generatePassphrase);
