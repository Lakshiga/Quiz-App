const quizForm = document.getElementById('quiz-form');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result');
const timerElement = document.getElementById('timer');
const restartButton = document.getElementById('restart-button');
const tabButtons = document.querySelectorAll('.tab-button');
const showbtn1 = document.getElementById("quiznavigation1");
const endtext1 = document.getElementById("endtext");

let currentQuestionIndex = 0;
let currentCategory = 'JavaScript';
let score = 0;
let timeRemaining = 20;
let timerInterval;

document.addEventListener('DOMContentLoaded', () => {
    showTab('JavaScript');
    startQuiz();
});

function startQuiz() {
    displayQuestionList();
    displayQuestion(currentQuestionIndex);
    startTimer();
 }
    
 function startTimer() {
    let timeRemaining = 30; 
    timer = setInterval(() => {
        timeRemaining--;
        const seconds = String(timeRemaining).padStart(2, '0');
        timerElement.innerText = `00:${seconds}`; 

        if (timeRemaining <= 0) {
            endQuiz();
            clearInterval(timer); 
        }
    }, 1000);
}

function showTab(category) {
    currentCategory = category;
    currentQuestionIndex = questions.findIndex(q => q.category.toLowerCase() === category.toLowerCase());
    showQuestion();
    tabButtons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.tab-button[onclick="showTab('${category.toLowerCase()}')"]`).classList.add('active');
}
function showTab(category) {
    currentCategory1 = category;
    currentQuestionIndex = questions.findIndex(q => q.category.toLowerCase() === category.toLowerCase());
    showQuestion();
    tabButtons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.tab-button[onclick="showTab('${category.toLowerCase()}')"]`).classList.add('active');
}
function showTab(category) {
    currentCategory2 = category;
    currentQuestionIndex = questions.findIndex(q => q.category.toLowerCase() === category.toLowerCase());
    showQuestion();
    tabButtons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.tab-button[onclick="showTab('${category.toLowerCase()}')"]`).classList.add('active');
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.innerText = question.question;
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.style.display = 'flex';
        optionElement.style.alignItems = 'center';
        optionElement.innerHTML = `
            <input type="radio" id="option${index}" name="option" value="${option}"style="margin-right: 10px;">
            <label for="option${index}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });
    startTimer();
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
        alert('Please select an answer');
        return;
    }

    const question = questions[currentQuestionIndex];
    const options = optionsContainer.querySelectorAll('input[name="option"]');
    
    options.forEach(option => {
        const label = option.nextElementSibling;
        if (option.checked) {
            if (option.value === question.correctAnswer) {
                label.style.color = '#4CAF50'; 
            } else {
                label.style.color = '#FF5733'; 
            }
        } else {
            label.style.color = '#000'; 
        }
    });

    const questionButton = document.getElementById(`quiznavigation${currentQuestionIndex + 1}`);
    if (selectedOption.value === question.correctAnswer) {
        questionButton.style.backgroundColor = '#4CAF50'; 
        score++;
    } else {
        questionButton.style.backgroundColor = '#FF5733'; 
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length && questions[currentQuestionIndex].category === currentCategory) {
        showQuestion();
    } else {
        endQuiz();
    }
    clearInterval(timerInterval);
}

function endQuiz() {
    clearInterval(timer);
    resultContainer.innerText = `Quiz over! Your score is ${score}/${questions.filter(q => q.category === currentCategory).length}.`;
    quizForm.style.display = 'none';
    timerElement.style.display = 'none';
    restartButton.style.display = 'block';
    showbtn1.style.display = 'none';
    questionText.style.display = 'none';
    endtext1.style.display='block';

}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = questions.findIndex(q => q.category === currentCategory);
    timeRemaining = 30;
    resultContainer.innerText = '';
    quizForm.style.display = 'block';
    timerElement.style.display = 'block';
    restartButton.style.display = 'none';
}

function navigateQuestion(index) {
    const question = questions[index];
    if (question.category.toLowerCase() === currentCategory.toLowerCase()) {
        currentQuestionIndex = index;
        showQuestion();
    } else {
        alert(`This question belongs to the ${question.category} category. Please select the appropriate category tab.`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showTab('JavaScript');
    startQuiz();
});

