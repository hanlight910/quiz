function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateQuiz(questionsData) {
    const quizContainer = document.getElementById("quiz-container");
    let sectionId = 1;
    
    questionsData.forEach((questionData, index) => {
        const shuffledOptions = [...questionData.options];
        shuffle(shuffledOptions);

        const section = document.createElement('section');
        section.className = `section-${sectionId}`;
        section.id = `section-${sectionId}`;
        
        const main = document.createElement('main');
        section.appendChild(main);
        
        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';
        
        const h3 = document.createElement('h3');
        h3.innerText = `Pure CSS Quiz`;

        const pQuestionNum = document.createElement('p');
        pQuestionNum.innerText = `QUESTION ${index + 1} OF ${questionsData.length}`;

        const pQuestion = document.createElement('p');
        pQuestion.innerText = questionData.question;

        textContainer.appendChild(h3);
        textContainer.appendChild(pQuestionNum);
        textContainer.appendChild(pQuestion);

        main.appendChild(textContainer);

        const form = document.createElement('form');

        const quizOptions = document.createElement('div');
        quizOptions.className = 'quiz-options';

        shuffledOptions.forEach((option, optionIndex) => {
            const input = document.createElement('input');
            input.type = 'radio';
            input.className = `input-radio one-${String.fromCharCode(97 + optionIndex)}`;
            input.id = `question-${index + 1}-${String.fromCharCode(97 + optionIndex)}`;
            input.name = `question-${index + 1}`;
            input.required = true;

            const label = document.createElement('label');
            label.className = `radio-label`;
            label.setAttribute('for', input.id);

            const span = document.createElement('span');
            span.className = 'alphabet';
            span.innerText = String.fromCharCode(65 + optionIndex);

            label.appendChild(span);
            label.appendChild(document.createTextNode(option));
            quizOptions.appendChild(input);
            quizOptions.appendChild(label);
        });

        form.appendChild(quizOptions);
        
        const nextButton = document.createElement('a');
        nextButton.id = 'btn';
        nextButton.innerText = 'Next';
        nextButton.href = `#section-${sectionId + 1}`;

        form.appendChild(nextButton);
        main.appendChild(form);

        quizContainer.appendChild(section);
        sectionId++;
    });
}

fetch('../test/questions.json')
    .then(response => response.json())
    .then(data => {
        generateQuiz(data);
    })
    .catch(error => {
		alert("Error laoding the quiz data:", error);
        console.error('Error loading the quiz data:', error);
    });
