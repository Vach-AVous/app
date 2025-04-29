document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music');
    const toggleBtn = document.getElementById('toggle-music-btn');

    if (!music) {
        console.error("Erreur music.js : Élément audio #background-music introuvable.");
        if(toggleBtn) toggleBtn.disabled = true; // Désactiver bouton si pas d'audio
        return;
    }
    if (!toggleBtn) {
        console.error("Erreur music.js : Bouton #toggle-music-btn introuvable.");
        return;
    }

    let isPlaying = false; // État initial : la musique ne joue pas

    // Texte initial du bouton
    toggleBtn.textContent = '♪ Musique';

    // --- Gestion du clic sur le bouton ---
    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            // Si la musique joue -> on met en pause
            music.pause();
            // L'état et le texte seront mis à jour par l'événement 'onpause'
        } else {
            // Si la musique est en pause -> on lance la lecture
            music.play().catch(error => {
                // Gérer les erreurs si la lecture échoue même après un clic
                console.error("Erreur lors de la tentative de lecture : ", error);
                alert("Impossible de lancer la musique. Vérifiez les permissions de votre navigateur ou le fichier audio.");
                // Assurer que l'état reste cohérent en cas d'échec
                isPlaying = false;
                toggleBtn.textContent = '♪ Musique';
            });
            // L'état et le texte seront mis à jour par l'événement 'onplay' en cas de succès
        }
    });

    // --- Mise à jour de l'état et du bouton basée sur les événements audio réels ---
    music.onplay = () => {
        isPlaying = true;
        toggleBtn.textContent = '❚❚ Stop'; // Ou une autre icône/texte pour pause
    };

    music.onpause = () => {
        isPlaying = false;
        toggleBtn.textContent = '♪ Musique';
    };

    // Optionnel : Gestion si le fichier audio n'est pas trouvé ou corrompu
    music.onerror = (e) => {
         console.error("Erreur de l'élément audio :", music.error);
         alert("Erreur lors du chargement de la musique.");
         toggleBtn.textContent = 'Erreur';
         toggleBtn.disabled = true;
     };
     const sourceElement = music.querySelector('source');
     if (sourceElement) {
         sourceElement.onerror = (e) => {
              console.error("Erreur de la source audio:", sourceElement.src, e);
              // L'erreur principale de l'élément audio devrait déjà se déclencher
         }
     }
});