# La Ferme Connectée - Site E-commerce et Jeu Éducatif

## 1. Introduction

"La Ferme Connectée" est un projet web front-end simulant une plateforme d'e-commerce permettant aux utilisateurs d'acheter des produits directement auprès de producteurs locaux et de participer à un programme unique de "location/parrainage" de vaches. Le projet inclut également une page informative "Notre Histoire" avec un quiz interactif et un mini-jeu de collecte pour engager l'utilisateur sur les thèmes de l'agriculture locale et durable.

Ce projet a été construit en utilisant des technologies web fondamentales (HTML, CSS, JavaScript) sans framework backend, ce qui signifie que toutes les fonctionnalités (panier, commande, jeu) sont **simulées côté client** et ne persistent pas après le rechargement de la page.

## 2. Fonctionnalités Principales

*   **Site E-commerce (Simulation):**
    *   Affichage dynamique des produits et des vaches à parrainer.
    *   Système de panier : ajout, suppression d'articles, mise à jour du total et du compteur.
    *   Formulaire de commande : collecte des informations utilisateur (prénom, nom, adresse, téléphone).
    *   Validation basique du formulaire.
    *   **Popup de confirmation de commande** stylisée (remplace l'alerte standard).
    *   Concept de "Location/Parrainage" de vache intégré au panier.
*   **Page "Notre Histoire" / À Propos :**
    *   Contenu textuel présentant le concept et les valeurs.
    *   Image d'illustration.
    *   **Quiz Interactif (10 questions) :**
        *   Affichage des questions une par une (style "carte").
        *   Navigation Précédent/Suivant.
        *   Calcul et affichage du score final.
        *   **Classement simulé** des meilleurs scores.
        *   **Graphique Chart.js** comparant le score utilisateur au score maximum.
        *   **Révision des réponses** détaillée après la fin du quiz.
*   **Jeu "Collecte de Lait":**
    *   Mini-jeu intégré dans une page dédiée (`game/jeu.html`).
    *   Contrôle du joueur (camion) avec les flèches du clavier.
    *   Collecte d'objets (bouteilles de lait) tombant aléatoirement.
    *   Système de **score** et de **vies**.
    *   **Difficulté progressive** (augmentation de la vitesse de chute et du taux d'apparition).
    *   **Récompenses** basées sur le score (bons d'achat simulés) affichées via notifications.
    *   **Popup de fin de partie** stylisée (Game Over).
    *   Contrôle du volume pour la musique et les effets sonores du jeu.
    *   Effets sonores pour la collecte et la perte de vie.
*   **Fonctionnalités Transverses :**
    *   **Barre de Navigation** cohérente sur toutes les pages.
    *   **Popups d'Information Aléatoires :** Messages sur l'écologie, le circuit court, etc., apparaissant à intervalles aléatoires.
    *   **Musique de Fond (Site Principal) :** Contrôlable via un bouton Play/Pause dans le header. L'état est mémorisé (tentative) via `localStorage`.
    *   **Favicon** (Logo dans l'onglet).
    *   **Design "Ferme Familiale Premium"** appliqué sur l'ensemble du site et du jeu.
    *   Tentative de design responsive pour différentes tailles d'écran.

## 3. Technologies Utilisées

*   **Langages :**
    *   HTML5 (Structure sémantique)
    *   CSS3 (Styling, mise en page Flexbox/Grid, variables CSS, transitions, animations, pseudo-éléments)
    *   JavaScript (ES6+) (Logique client, manipulation du DOM, gestion d'événements, `setTimeout`/`setInterval`, `localStorage`, API Audio HTML5)
*   **Bibliothèques Externes :**
    *   **Chart.js** (via CDN) : Pour l'affichage du graphique des résultats du quiz.
    *   **Google Fonts** (via CDN) : Pour les polices personnalisées (Merriweather, Nunito Sans).
*   **Outils :**
    *   Aucun outil de build (Webpack, Vite, etc.) n'est utilisé dans cette version.
    *   Aucun framework JS (React, Vue, Angular) n'est utilisé.

## 4. Installation et Lancement

Ce projet est entièrement **côté client** et ne nécessite pas de serveur backend pour fonctionner (dans son état actuel de simulation).

1.  **Obtenir les fichiers :** Clonez ou téléchargez l'ensemble des fichiers et dossiers du projet.
2.  **Structure des Fichiers :** Assurez-vous de conserver la structure de dossiers indiquée ci-dessus, notamment l'emplacement des images (`image/`, `image/vache/`, `game/lib/`) et du son (`babylone.mp3`, `game/lib/*.mp3`).
3.  **Remplacer les Images/Sons :** **Crucial :** Les chemins vers les images et les sons sont présents dans le code (`script.js`, `style.css`, `jeu.html`), mais les fichiers multimédias réels doivent être fournis par l'utilisateur et placés aux emplacements corrects avec les noms correspondants. Sans cela, le site affichera des images cassées.
4.  **Ouvrir dans le Navigateur :** Ouvrez le fichier `index.html` directement dans votre navigateur web (Firefox, Chrome, Edge, Safari...).

## 5. Utilisation

*   **Navigation :** Utilisez la barre de navigation en haut pour passer entre la Boutique (`index.html`), l'Histoire/Quiz (`about.html`), et le Jeu (`game/jeu.html`). Le lien Panier fait défiler jusqu'à la section panier sur la page d'accueil.
*   **Boutique :** Cliquez sur "Ajouter au Panier" ou "Adopter [Nom]" pour ajouter des articles/parrainages.
*   **Panier :** Visualisez les articles, le total. Cliquez sur le 'X' pour retirer un article. Cliquez sur "Valider mon Panier" pour afficher le formulaire.
*   **Formulaire de Commande :** Remplissez les champs et cliquez sur "Confirmer la Commande" pour voir la popup de confirmation (simulation).
*   **Page Histoire/Quiz :** Lisez le texte. Cliquez sur "Lancer le Quiz" pour commencer le quiz. Répondez aux questions en utilisant les boutons radio et naviguez avec "Précédent"/"Suivant". Après la fin, consultez votre score, le classement simulé, le graphique et la révision des réponses.
*   **Jeu :** Cliquez sur "Commencer la Collecte". Utilisez les flèches Gauche (←) et Droite (→) pour déplacer le camion. Collectez les bouteilles de lait (🍼) pour marquer des points. Évitez de laisser tomber les bouteilles. Vous perdez une vie si une bouteille touche le bas. La partie se termine lorsque vous n'avez plus de vies. Utilisez le slider pour régler le volume du jeu. Cliquez sur "Rejouer" sur l'écran de fin pour recommencer.
*   **Musique (Site) :** Cliquez sur le bouton "♪ Musique" / "❚❚ Stop" dans le header pour lancer ou arrêter la musique de fond du site.
*   **Popups Info :** Des popups avec des informations sur l'agriculture locale peuvent apparaître aléatoirement. Cliquez sur "Bien noté !" ou en dehors de la popup pour les fermer.

## 6. Points Techniques Clés

*   **Gestion du DOM (JavaScript Natif) :**
    *   `script.js` utilise `document.querySelector`, `document.getElementById`, `createElement`, `appendChild`, `innerHTML` pour afficher dynamiquement les produits, les vaches, mettre à jour le panier et manipuler l'affichage du formulaire et des popups.
    *   `about.js` génère dynamiquement les options du quiz, met à jour le texte des questions, et crée le contenu du classement et de la révision.
    *   Le script du jeu manipule la grille de jeu en ajoutant/supprimant des éléments `div` pour le joueur et les bouteilles.
*   **Gestion d'État (Client-Side) :**
    *   Le panier (`cart` dans `script.js`), les réponses du quiz (`userAnswers` dans `about.js`), et l'état du jeu (variables dans `jeu.html`) sont stockés dans des variables JavaScript. **Ces états sont perdus lors du rechargement de la page.**
    *   `music.js` utilise `localStorage` pour tenter de *persister* l'état de lecture de la musique entre les chargements de page (fonctionnement soumis aux restrictions navigateur).
*   **Logique du Jeu (`jeu.html` script) :**
    *   **Boucle Principale :** `setInterval(gameLoop, currentGameSpeed)` gère la progression du jeu.
    *   **Mouvement des Objets :** La fonction `gameLoop` parcourt la grille et déplace les éléments `.enemy` d'une cellule vers le bas à chaque intervalle.
    *   **Génération Aléatoire :** `Math.random()` est utilisé pour déterminer l'apparition de nouvelles bouteilles (`currentSpawnRate`).
    *   **Collision :** Détectée en vérifiant si un item atteint la dernière ligne (`targetIndex >= (rows - 1) * cols`) et si sa colonne correspond à `playerPosition`.
    *   **Difficulté Progressive :** `currentGameSpeed` diminue et `currentSpawnRate` augmente à intervalles réguliers (`speedIncreaseInterval`).
    *   **Gestion des États du Jeu :** La variable `gameRunning` contrôle si la boucle de jeu est active. Les fonctions `initGame`, `startGame`, `endGame` gèrent les transitions.
*   **Intégration Chart.js :** `about.js` utilise l'API Chart.js pour créer et afficher un graphique en barres simple après le quiz. Les données (score utilisateur, score max) sont passées à la configuration du graphique.
*   **Popups Aléatoires (`popups.js`) :** Utilise `setTimeout` avec un délai calculé via `Math.random()` pour déclencher l'affichage (`popupOverlay.classList.add('popup-visible')`). Un nouveau timeout est programmé à chaque fermeture.
*   **CSS :** Utilisation de variables CSS (`:root`) pour gérer le thème, Flexbox et Grid pour la mise en page, transitions et animations simples pour les effets visuels (survol boutons, apparition popups), pseudo-éléments (`#hero::before`) pour l'effet de flou.

## 7. Limitations Actuelles

*   **Simulation Uniquement :** Le projet est une démonstration front-end. Il n'y a pas de backend pour gérer les utilisateurs, les commandes réelles, les paiements, la persistance des données (panier, scores), ou la logique métier complexe (gestion stock, abonnements vache).
*   **Sécurité :** Aucune mesure de sécurité côté serveur. La validation des entrées est minimale côté client.
*   **Gestion des Erreurs :** Très basique (principalement `alert()` ou `console.error`).
*   **Accessibilité (A11y) :** Le projet n'a pas fait l'objet d'une évaluation d'accessibilité approfondie. Des améliorations (attributs ARIA, navigation clavier, contrastes) sont probablement nécessaires.
*   **Performance :** Pourrait rencontrer des limites si le nombre de produits/vaches devenait très important ou si le jeu devenait beaucoup plus complexe (manipulations DOM intensives). Le chargement initial dépend de la taille des images.
*   **Dépendance aux Médias :** Le rendu visuel final dépend fortement de la fourniture par l'utilisateur d'images et de sons de qualité aux emplacements spécifiés.
*   **Compatibilité Navigateurs :** Développé et testé implicitement sur un navigateur moderne. Des tests et ajustements pourraient être nécessaires pour une compatibilité étendue.

## 8. Pistes d'Améliorations Futures

*   **Intégration Backend :** Développer un serveur (Node.js/Express, Python/Flask/Django, PHP/Laravel, etc.) pour gérer :
    *   Base de données (produits, utilisateurs, commandes, parrainages).
    *   Authentification utilisateur.
    *   Traitement sécurisé des commandes et intégration d'une passerelle de paiement.
    *   Gestion de stock.
    *   API REST pour la communication front-end/back-end.
*   **Améliorations Front-end :**
    *   Refactoriser le JavaScript en modules ou classes pour une meilleure organisation.
    *   Utiliser un framework/bibliothèque JS (React, Vue, Svelte) pour une gestion d'état plus robuste et une meilleure maintenabilité.
    *   Mettre en place un système de build (Vite, Webpack) pour l'optimisation (minification, bundling).
    *   Améliorer l'accessibilité (audit et corrections).
    *   Ajouter des tests unitaires et d'intégration.
*   **Améliorations Jeu :**
    *   Contrôles tactiles pour mobile.
    *   Plus de niveaux ou types d'objets/obstacles.
    *   Power-ups.
    *   Sauvegarde du meilleur score (nécessite backend ou `localStorage` plus poussé).
*   **Fonctionnalités E-commerce Avancées :**
    *   Recherche de produits.
    *   Filtres et tris.
    *   Avis clients.
    *   Gestion de compte utilisateur (historique commandes).
    *   Logique d'abonnement plus détaillée pour la location de vaches.
*   **Déploiement :** Mettre en place une stratégie pour héberger le site (ex: Netlify, Vercel pour le front-end, Heroku, AWS, etc. si un backend est ajouté).