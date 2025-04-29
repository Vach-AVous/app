document.addEventListener('DOMContentLoaded', () => {
    console.log("Music.js: DOM chargé."); // Log 1: Vérifie que le script commence

    const music = document.getElementById('background-music');
    const toggleBtn = document.getElementById('toggle-music-btn');

    // Vérifications initiales avec logs
    if (!music) {
        console.error("Erreur music.js : Élément audio #background-music introuvable.");
        if(toggleBtn) toggleBtn.disabled = true;
        return;
    } else {
        console.log("Music.js: Élément audio trouvé:", music); // Log 2: Confirme que l'élément audio est trouvé
    }

    if (!toggleBtn) {
        console.error("Erreur music.js : Bouton #toggle-music-btn introuvable.");
        return;
    } else {
        console.log("Music.js: Bouton trouvé:", toggleBtn); // Log 3: Confirme que le bouton est trouvé
    }

    let isPlaying = false; // État logique interne

    toggleBtn.textContent = '♪ Musique';
    console.log("Music.js: État initial -> isPlaying:", isPlaying, "| Texte bouton:", toggleBtn.textContent); // Log 4: État initial

    // --- Gestion du clic sur le bouton ---
    toggleBtn.addEventListener('click', () => {
        console.log("Music.js: Bouton cliqué ! État actuel de music.paused:", music.paused); // Log 5: Clic détecté

        // Baser la décision sur l'état réel de l'élément audio
        if (!music.paused) {
            console.log("Music.js: Musique jouait -> Appel de music.pause()"); // Log 6a: Tentative de pause
            music.pause();
        } else {
            console.log("Music.js: Musique en pause -> Appel de music.play()"); // Log 6b: Tentative de lecture
            music.play().catch(error => {
                console.error("Music.js: Erreur lors de music.play() :", error.name, error.message, error); // Log 7: Erreur de lecture
                alert(`Impossible de lancer la musique: ${error.message}. Vérifiez les permissions ou le fichier audio.`);
                // Assurer la cohérence de l'état en cas d'échec
                isPlaying = false;
                toggleBtn.textContent = '♪ Musique';
            });
        }
    });

    // --- Mise à jour basée sur les événements audio réels ---
    music.onplay = () => {
        console.log("Music.js: Événement 'onplay' reçu."); // Log 8: Lecture démarrée
        isPlaying = true;
        toggleBtn.textContent = '❚❚ Stop';
    };

    music.onpause = () => {
        console.log("Music.js: Événement 'onpause' reçu."); // Log 9: Pause effectuée
        isPlaying = false;
        toggleBtn.textContent = '♪ Musique';
    };

    music.onended = () => {
        console.log("Music.js: Événement 'onended' reçu."); // Log 10: Fin de la piste (si loop ne marche pas)
        isPlaying = false;
        toggleBtn.textContent = '♪ Musique';
    };

    // Gestion erreur chargement média
    music.onerror = (e) => {
         console.error("Music.js: Erreur de l'élément audio :", music.error, e); // Log 11: Erreur chargement audio
         alert("Erreur lors du chargement de la musique. Vérifiez le fichier et son chemin.");
         toggleBtn.textContent = 'Erreur';
         toggleBtn.disabled = true;
     };
     const sourceElement = music.querySelector('source');
     if (sourceElement) {
         sourceElement.onerror = (e) => {
              console.error("Music.js: Erreur de la source audio:", sourceElement.src, e); // Log 12: Erreur chargement source
         }
     } else {
         console.warn("Music.js: Aucun élément <source> trouvé dans l'élément <audio>."); // Log 13: Avertissement si pas de source
     }
});