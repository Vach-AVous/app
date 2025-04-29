document.addEventListener('DOMContentLoaded', () => {
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const quizContainer = document.getElementById('quiz-container');
    const resultsDiv = document.getElementById('quiz-results');
    const questionProgress = document.getElementById('quiz-progress');
    const questionText = document.getElementById('quiz-question-text');
    const optionsDiv = document.getElementById('quiz-options');
    const prevBtn = document.getElementById('prev-question-btn');
    const nextBtn = document.getElementById('next-question-btn');
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const quizExtrasDiv = document.getElementById('quiz-extras');
    const scoreChartCanvas = document.getElementById('scoreChart');
    const quizReviewSection = document.getElementById('quiz-review-section');
    const quizReviewList = document.getElementById('quiz-review-list');

    const quizQuestions = [
        { question: "Quelle est la principale source de nourriture des vaches laitières dans une ferme traditionnelle ?", options: [ { value: 'a', text: "Des céréales uniquement" }, { value: 'b', text: "De l'herbe et du foin" }, { value: 'c', text: "Des fruits et légumes" } ], correctAnswer: 'b' },
        { question: "Combien de temps une poule met-elle environ pour pondre un œuf ?", options: [ { value: 'a', text: "1 heure" }, { value: 'b', text: "12 heures" }, { value: 'c', text: "Environ 24-26 heures" } ], correctAnswer: 'c' },
        { question: "Qu'est-ce que l'agriculture biologique interdit principalement ?", options: [ { value: 'a', text: "L'utilisation de pesticides et d'engrais chimiques de synthèse" }, { value: 'b', text: "L'utilisation de tracteurs" }, { value: 'c', text: "La vente directe aux consommateurs" } ], correctAnswer: 'a' },
        { question: "Quel est l'avantage principal d'acheter directement au producteur ?", options: [ { value: 'a', text: "Produits moins chers car moins de taxes" }, { value: 'b', text: "Soutien à l'économie locale et produits plus frais" }, { value: 'c', text: "Uniquement des produits exotiques" } ], correctAnswer: 'b' },
        { question: "Comment appelle-t-on le petit de la vache ?", options: [ { value: 'a', text: "Un agneau" }, { value: 'b', text: "Un chevreau" }, { value: 'c', text: "Un veau" } ], correctAnswer: 'c' },
        { question: "Quel légume est souvent associé à la couleur orange et bon pour la vue ?", options: [ { value: 'a', text: "La courgette" }, { value: 'b', text: "La carotte" }, { value: 'c', text: "Le poireau" } ], correctAnswer: 'b' },
        { question: "Qu'est-ce que la 'jachère' dans l'agriculture ?", options: [ { value: 'a', text: "Une technique de récolte rapide" }, { value: 'b', text: "Laisser une terre au repos sans culture pendant un temps" }, { value: 'c', text: "Un type d'engrais naturel" } ], correctAnswer: 'b' },
        { question: "Quel animal de la ferme est réputé pour produire de la laine ?", options: [ { value: 'a', text: "Le cochon" }, { value: 'b', text: "La chèvre" }, { value: 'c', text: "Le mouton" } ], correctAnswer: 'c' },
        { question: "Quel est le nom de l'habitat principal des abeilles géré par un apiculteur ?", options: [ { value: 'a', text: "Une fourmilière" }, { value: 'b', text: "Une ruche" }, { value: 'c', text: "Un terrier" } ], correctAnswer: 'b' },
        { question: "Que signifie 'locavore' ?", options: [ { value: 'a', text: "Manger uniquement des légumes" }, { value: 'b', text: "Préférer consommer des aliments produits localement" }, { value: 'c', text: "Cuisiner des plats très épicés" } ], correctAnswer: 'b' }
    ];

    let currentQuestionIndex = 0;
    let userAnswers = new Array(quizQuestions.length).fill(null);
    let scoreChartInstance = null;

    function displayQuestion(index) {
        if (index < 0 || index >= quizQuestions.length) return;
        const currentQuestion = quizQuestions[index];
        questionProgress.textContent = `Question ${index + 1} / ${quizQuestions.length}`;
        questionText.textContent = currentQuestion.question;
        optionsDiv.innerHTML = '';
        currentQuestion.options.forEach(option => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `q${index}`;
            input.value = option.value;
            input.required = true;
            if (userAnswers[index] === option.value) { input.checked = true; }
            input.addEventListener('change', () => { userAnswers[index] = input.value; nextBtn.disabled = false; });
            const span = document.createElement('span');
            span.textContent = ` ${option.text}`;
            label.appendChild(input);
            label.appendChild(span);
            optionsDiv.appendChild(label);
        });
        prevBtn.disabled = index === 0;
        nextBtn.textContent = (index === quizQuestions.length - 1) ? "Voir mon score" : "Suivant";
        nextBtn.disabled = userAnswers[index] === null;
    }

    function generateFakeLeaderboard(userScore, totalQuestions) {
        const names = ["Alex L.", "Marie P.", "Julien R.", "Sophie D.", "Lucas M.", "Chloé B.", "Hugo T.", "Léa G.", "Arthur N."];
        const leaderboard = [];
        leaderboard.push({ name: "Vous", score: userScore, isUser: true });
        for (let i = 0; i < names.length; i++) {
            let fakeScore = Math.floor(Math.random() * (totalQuestions + 1));
            if(Math.random() < 0.1) fakeScore = totalQuestions;
            else if (Math.random() < 0.15) fakeScore = Math.floor(Math.random() * (totalQuestions / 2));
            else fakeScore = Math.floor(Math.random() * (totalQuestions - 2)) + 1 ;
            leaderboard.push({ name: names[i], score: fakeScore, isUser: false });
        }
        leaderboard.sort((a, b) => {
            if (b.score !== a.score) { return b.score - a.score; }
             if (a.name < b.name) return -1;
             if (a.name > b.name) return 1;
             return 0;
        });
        return leaderboard.slice(0, 10);
    }

    function displayLeaderboard(leaderboardData, totalQuestions) {
        if (!leaderboardContainer) return;
        leaderboardContainer.innerHTML = '';
        const table = document.createElement('table');
        table.innerHTML = `<thead><tr><th>Rang</th><th>Nom</th><th>Score</th></tr></thead><tbody></tbody>`;
        const tbody = table.querySelector('tbody');
        leaderboardData.forEach((entry, index) => {
            const row = tbody.insertRow();
             if (entry.isUser) { row.classList.add('user-row'); }
            row.innerHTML = `<td>${index + 1}</td><td>${entry.name}</td><td>${entry.score} / ${totalQuestions}</td>`;
        });
        leaderboardContainer.appendChild(table);
    }

    function displayScoreChart(userScore, totalQuestions) {
         if (!scoreChartCanvas) return;
         const ctx = scoreChartCanvas.getContext('2d');
         if (scoreChartInstance) { scoreChartInstance.destroy(); }
         scoreChartInstance = new Chart(ctx, {
            type: 'bar',
            data: { labels: ['Votre Score', 'Score Maximum Possible'], datasets: [{ label: 'Points', data: [userScore, totalQuestions], backgroundColor: ['rgba(143, 188, 143, 0.6)', 'rgba(205, 133, 63, 0.6)'], borderColor: ['#556B2F', '#CD853F'], borderWidth: 1 }] },
            options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false }, title: { display: true, text: 'Comparaison de votre score', font: { size: 16, family: getComputedStyle(document.documentElement).getPropertyValue('--font-heading') } } }, scales: { y: { beginAtZero: true, max: totalQuestions, ticks: { stepSize: Math.max(1, Math.floor(totalQuestions / 5)), font: { family: getComputedStyle(document.documentElement).getPropertyValue('--font-body') } } }, x: { ticks: { font: { size: 14, family: getComputedStyle(document.documentElement).getPropertyValue('--font-body') } } } } }
        });
    }

    function getOptionText(questionIndex, answerValue) {
        if (answerValue === null) return "Non répondu";
        const question = quizQuestions[questionIndex];
        const option = question.options.find(opt => opt.value === answerValue);
        return option ? option.text : "Réponse inconnue";
    }

    function showResults() {
        quizContainer.style.display = 'none';
        resultsDiv.style.display = 'block';
        if (quizExtrasDiv) quizExtrasDiv.style.display = 'grid';
        if (quizReviewSection) quizReviewSection.style.display = 'block';
        if (quizReviewList) quizReviewList.innerHTML = '';

        let score = 0;
        const totalQuestions = quizQuestions.length;

        for (let i = 0; i < totalQuestions; i++) {
            const isCorrect = userAnswers[i] === quizQuestions[i].correctAnswer;
            if (isCorrect) {
                score++;
            }

            if (quizReviewList) {
                const li = document.createElement('li');
                const userAnswerValue = userAnswers[i];
                const correctAnswerValue = quizQuestions[i].correctAnswer;

                const userAnswerText = getOptionText(i, userAnswerValue);
                const correctAnswerText = getOptionText(i, correctAnswerValue);

                let userAnswerClass = 'unanswered';
                if(userAnswerValue !== null) {
                    userAnswerClass = isCorrect ? 'correct' : 'incorrect';
                }

                li.innerHTML = `
                    <strong>${i + 1}. ${quizQuestions[i].question}</strong>
                    <span class="user-answer ${userAnswerClass}">Votre réponse : ${userAnswerText}</span>
                    ${!isCorrect && userAnswerValue !== null ? `<span class="correct-answer-display">Bonne réponse : ${correctAnswerText}</span>` : ''}
                    ${userAnswerValue === null ? `<span class="correct-answer-display">Bonne réponse : ${correctAnswerText}</span>` : ''}
                `;
                quizReviewList.appendChild(li);
            }
        }

        let resultMessage = `Votre score : ${score} / ${totalQuestions}. `;
        let resultClass = 'score-bad';
         if (score === totalQuestions) { resultMessage += "Parfait ! Vous êtes un véritable connaisseur de la ferme ! 🥳"; resultClass = 'score-good'; }
         else if (score >= totalQuestions * 0.7) { resultMessage += "Très bon score ! Vous maîtrisez bien le sujet. 👍"; resultClass = 'score-good'; }
         else if (score >= totalQuestions / 2) { resultMessage += "Pas mal ! Vous avez de bonnes connaissances. 🙂"; resultClass = 'score-average'; }
         else { resultMessage += "Continuez d'apprendre sur le monde fascinant de la ferme ! 🌱"; }
        resultsDiv.innerHTML = resultMessage;
        resultsDiv.className = `quiz-results ${resultClass}`;

        const fakeLeaderboard = generateFakeLeaderboard(score, totalQuestions);
        displayLeaderboard(fakeLeaderboard, totalQuestions);
        displayScoreChart(score, totalQuestions);

        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    startQuizBtn.addEventListener('click', () => {
        startQuizBtn.style.display = 'none';
        resultsDiv.style.display = 'none';
        if (quizExtrasDiv) quizExtrasDiv.style.display = 'none';
        if (quizReviewSection) quizReviewSection.style.display = 'none';
        quizContainer.style.display = 'block';
        currentQuestionIndex = 0;
        userAnswers.fill(null);
        if (scoreChartInstance) {
            scoreChartInstance.destroy();
            scoreChartInstance = null;
        }
        displayQuestion(currentQuestionIndex);
        quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) { currentQuestionIndex--; displayQuestion(currentQuestionIndex); }
    });

    nextBtn.addEventListener('click', () => {
         if (userAnswers[currentQuestionIndex] === null) { alert("Veuillez sélectionner une réponse avant de continuer."); return; }
        if (currentQuestionIndex < quizQuestions.length - 1) { currentQuestionIndex++; displayQuestion(currentQuestionIndex); }
        else { showResults(); }
    });
});