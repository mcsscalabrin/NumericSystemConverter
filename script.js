// Base validation patterns
const basePatterns = {
    binario: /^[01]+$/,
    octal: /^[0-7]+$/,
    decimal: /^[0-9]+$/,
    hexadecimal: /^[0-9A-Fa-f]+$/
};

// GitHub profiles
const githubProfiles = {
    member1: "https://github.com/your-username1",
    member2: "https://github.com/your-username2"
};

// Theme management
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
}

// Checkbox management
function handleCheckboxChange(changedCheckbox) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox !== changedCheckbox) {
            checkbox.checked = false;
        }
    });
}

// Base validation
function validateInput(input, base) {
    const pattern = basePatterns[base];
    if (!pattern.test(input)) {
        alert(`O número contém caracteres inválidos para a base ${base}!`);
        return false;
    }
    return true;
}

// Convert number to different bases
function convertNumber(input, fromBase) {
    let decimal;
    
    switch(fromBase) {
        case 'binario':
            decimal = parseInt(input, 2);
            break;
        case 'octal':
            decimal = parseInt(input, 8);
            break;
        case 'decimal':
            decimal = parseInt(input, 10);
            break;
        case 'hexadecimal':
            decimal = parseInt(input, 16);
            break;
    }

    return {
        binario: decimal.toString(2),
        octal: decimal.toString(8),
        decimal: decimal.toString(10),
        hexadecimal: decimal.toString(16).toUpperCase()
    };
}

// Copy to clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copiado para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}

// Main conversion function
function converter() {
    const input = document.getElementById('demo1').value;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let selectedBase = null;

    // Find selected base
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedBase = checkbox.id.replace('is', '').toLowerCase();
        }
    });

    if (!selectedBase) {
        alert('Por favor, selecione uma base numérica!');
        return;
    }

    // Validate input
    if (!validateInput(input, selectedBase)) {
        return;
    }

    // Convert number
    const results = convertNumber(input, selectedBase);

    // Update results
    Object.entries(results).forEach(([base, value]) => {
        const resultElement = document.getElementById(`result${base.charAt(0).toUpperCase() + base.slice(1)}`);
        if (base === selectedBase) {
            resultElement.textContent = input;
        } else {
            resultElement.textContent = value;
        }
    });
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();

    // Add checkbox event listeners
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => handleCheckboxChange(e.target));
    });

    // Add theme toggle listener
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}); 