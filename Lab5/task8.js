function checkPassword(password) {
    const specialChars = ["@", "#", "$", "%"];

    const hasUpper = password.match(/[A-Z]/) !== null;
    const hasLower = password.match(/[a-z]/) !== null;
    const hasNumber = password.match(/[0-9]/) !== null;
    const hasSpecial = specialChars.some(char => password.includes(char));
    const hasLength = password.length >= 8;

    const conditionsMet = [hasUpper, hasLower, hasNumber, hasSpecial, hasLength]
        .filter(cond => cond).length;

    if (conditionsMet === 5) return "Strong";
    else if (conditionsMet >= 3) return "Medium";
    else return "Weak";
}

// Example Usage
console.log(checkPassword("Abc123"));       // Weak
console.log(checkPassword("Abc123@"));      // Medium
console.log(checkPassword("Abcdef123@"));   // Strong