function cleanUsername(name) {
    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_");
}

function validateUsername(name) {
    if (name.length < 5 || name.length > 20)
        return false;

    const firstChar = name.charAt(0);
    if (!/[a-z]/.test(firstChar))
        return false;

    if (!/^[a-z0-9_]+$/.test(name))
        return false;

    return true;
}

const input = " yasir_Sultan ";
const cleaned = cleanUsername(input);

console.log("Cleaned Username:", cleaned);

if (validateUsername(cleaned))
    console.log("Valid Username");
else
    console.log("Invalid Username");