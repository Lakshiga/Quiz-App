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
const fullDashArray = 283;

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
    clearInterval(timerInterval);
    timeRemaining = 20;
    updateCircle();
    timerInterval = setInterval(() => {
        timeRemaining--;
        document.getElementById('timeRemaining').innerText = timeRemaining;
        updateCircle();
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            displayResult();
        }
    }, 1000);
}

function updateCircle() {
    const circle = document.getElementById('timeCircle');
    const dashOffset = fullDashArray - (fullDashArray * timeRemaining) / 20;
    circle.style.strokeDashoffset = dashOffset;
}

function showTab(category) {
    currentCategory = category;
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
            <input type="radio" id="option${index}" name="option" value="${option}" style="margin-right: 10px;">
            <label for="option${index}">${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });
    startTimer();
}

const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', submitAnswer);

function submitAnswer() {
  // Existing logic for answer selection check and alert (if needed)

  const question = questions[currentQuestionIndex];
  const options = optionsContainer.querySelectorAll('input[name="option"]');

  options.forEach(option => {
    const label = option.nextElementSibling;
    if (option.checked) {
      if (option.value === question.correctAnswer) {
        label.style.color = '#4CAF50'; // green for correct answer
      } else {
        label.style.color = '#FF5733'; // red for wrong answer
      }
    } else {
      label.style.color = '#000'; // reset color for other options
    }
  });

  // Get question button and update its color immediately on submit
  const questionButton = optionsContainer.parentElement.querySelector('.question-button'); // Assuming button has class 'question-button'

  if (selectedOption.value === question.correctAnswer) {
    questionButton.style.backgroundColor = '#4CAF50'; // green for correct answer
    score++;
  } else {
    questionButton.style.backgroundColor = '#FF5733'; // red for wrong answer
  }

  // Move to next question after updating colors (key change)
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length && questions[currentQuestionIndex].category === currentCategory) {
    showQuestion();
  } else {
    endQuiz();
  }
}


const cancelButton = document.querySelector(".Cancelbtn");

cancelButton.addEventListener("click", () => {
  // Clear timer interval
  clearInterval(timerInterval);
  // Display cancel message or handle logic as needed
});


function endQuiz() {
    clearInterval(timerInterval);
    resultContainer.innerText = `Quiz over! Your score is ${score}/${questions.filter(q => q.category === currentCategory).length}.`;
    quizForm.style.display = 'none';
    timerElement.style.display = 'none';
    restartButton.style.display = 'block';
    showbtn1.style.display = 'none';
    questionText.style.display = 'none';
    endtext1.style.display = 'block';
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = questions.findIndex(q => q.category === currentCategory);
    timeRemaining = 30;
    resultContainer.innerText = '';
    quizForm.style.display = 'block';
    timerElement.style.display = 'block';
    restartButton.style.display = 'none';
    showQuestion(); // restart by showing the first question again
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

const navButtons = document.querySelectorAll(".nav-button");

navButtons.forEach(button => {
  button.addEventListener("click", () => {
    const questionIndex = parseInt(button.id) - 1;
    currentQuestionIndex = questionIndex;
    showQuestion();
  });
});


function displayResult() {
    // Calculate score
    const score = correctAnswers;
    // Display results (e.g., final score, correct/incorrect answers) in the "result" element
  }
  