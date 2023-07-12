const popupOverlay = document.getElementById('popupOverlay');
const nameInput = document.getElementById('nameInput');
const surnameInput = document.getElementById('surnameInput');
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', function() {
    if (nameInput.checkValidity()) {
        const name = nameInput.value;
        const surname = surnameInput.value;
        const completeName = `${name} ${surname}`;
        showNamePreHeader(completeName);
        closePopupName();
        saveUserName(completeName);
    } else {
        nameInput.reportValidity();
    }
});

function showPopupName() {
    popupOverlay.style.display = 'flex';
}

function closePopupName() {
    popupOverlay.style.display = 'none';
}

function showNamePreHeader(name) {
    const preheaderLabel = document.getElementById('preheader');
    preheaderLabel.textContent = `Bienvenido, ${name}!`;
}

function saveUserName(name){
    localStorage.setItem("user-name", name);
}

function getUserName(){
    return localStorage.getItem("user-name");
}

function initialize(){
    let userName = getUserName();
    if(userName) {
        showNamePreHeader(userName);
        return;
    }
    showPopupName();
}

initialize();