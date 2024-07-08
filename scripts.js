const lowercase = getChars(true);
const uppercase = getChars(false);
const numbers = getNumbers();
const special = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_"];

function passwordGenerator() {
    const length = getPasswordLength();
    const properties = passwordProperties();
    const characters = [];
    if (properties.uppercase) characters.push(...uppercase);
    if (properties.lowercase) characters.push(...lowercase);
    if (properties.numbers) characters.push(...numbers);
    if (properties.special) characters.push(...special);

    if (characters.length === 0) {
        return alert("You need to select at least one of the properties before generating password.");
    }

    let password = [];
    for (let i = 0; i < length; i++) {
        const randomIdx = Math.floor(Math.random() * characters.length);
        const char = characters[randomIdx];
        password.push(char);
    }

    const passwordString = password.join("");
    document.getElementById("password").innerHTML = "<p>" + "Your password is: " + passwordString + "</p>";
    document.getElementById("password").value = passwordString;
    
}

function getPasswordLength() {
    const length = document.getElementById("pwd-length").value;
    return Number(length);
}

function passwordProperties() {
    const ids = ["uppercase", "lowercase", "numbers", "special"];
    const properties = {};

    for (const id of ids) {
        const element = document.getElementById(id);
        properties[id] = element.checked;
    }

    return properties;
}

function getChars(lowercase) {
    const start = lowercase ? 97 : 65;
    const chars = [];

    for (let i = start; i < start + 26; i++) {
        chars.push(String.fromCharCode(i));
    }

    return chars;
}

function getNumbers() {
    const nums = [];

    for (let i = 0; i < 10; i++) {
        nums.push(i);
    }

    return nums;
}

function savePassword() {
    const password = document.getElementById("password").value;
    if (password) {
        const blob = new Blob([password], { type: "text/plain" });
        const anchor = document.createElement("a");
        anchor.href = URL.createObjectURL(blob);
        anchor.download = "generated-passwords.txt";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    } else {
        return alert("You need to generate a password before saving it!");
    }
}