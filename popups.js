document.addEventListener('DOMContentLoaded', () => {
    const popupOverlay = document.getElementById('info-popup-overlay');
    const popupContent = document.getElementById('popup-content');
    const closePopupBtn = document.getElementById('close-popup-btn');

    if (!popupOverlay || !popupContent || !closePopupBtn) { return; }

    const popupMessages = [
        "Saviez-vous que le circuit court réduit considérablement l'empreinte carbone liée au transport des aliments ?",
        "En achetant local, vous soutenez directement les agriculteurs de votre région et dynamisez l'économie locale.",
        "L'agriculture raisonnée cherche à limiter l'impact sur l'environnement tout en assurant la viabilité économique des fermes.",
        "Manger de saison, c'est profiter de produits plus savoureux, moins chers et plus respectueux des cycles naturels.",
        "Le bien-être animal est essentiel pour une production de qualité. Nos vaches profitent de grands espaces et d'une alimentation saine.",
        "Réduire le gaspillage alimentaire commence à la ferme ! Nous valorisons au maximum nos productions.",
        "La biodiversité est cruciale pour un écosystème agricole sain. Haies, jachères fleuries... chaque détail compte !",
        "En louant une vache, vous créez un lien direct avec l'animal et comprenez mieux d'où vient votre lait.",
        "Comparer les étiquettes vous aide à choisir des produits plus durables et à mieux comprendre leur origine.",
        "L'eau est une ressource précieuse. Les fermes modernes mettent en place des systèmes d'irrigation économes."
    ];

    const minDelay = 10000;
    const maxDelay = 60000;
    let popupTimer = null;

    function getRandomDelay() {
        return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    }

    function showRandomPopup() {
        const randomIndex = Math.floor(Math.random() * popupMessages.length);
        popupContent.textContent = popupMessages[randomIndex];
        popupOverlay.classList.add('popup-visible');
    }

    function hidePopup() {
        popupOverlay.classList.remove('popup-visible');
        scheduleNextPopup();
    }

    function scheduleNextPopup() {
        clearTimeout(popupTimer);
        const delay = getRandomDelay();
        popupTimer = setTimeout(showRandomPopup, delay);
    }

    closePopupBtn.addEventListener('click', hidePopup);
    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) { hidePopup(); }
    });

    scheduleNextPopup();
});