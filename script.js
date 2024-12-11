const quizData = [
    {
        question: "The word COMPUTER comes from the ___________ word COMPUTARE, which means TO CALCULATE, TO COUNT, TO THINK, or TO SUM UP",
    },
    {
        question: "What does URL stand for?",
    },
    {
        question: "___________ translates human-readable domain names into IP addresses that computers use to identify each other on the network.",
    },
    {
        question: "WAV file is associated with what type of files?",
    },
    {
        question: "A Program that can copy itself without the permission of the owner is called?",
    },
    {
        question: "The first ever web server soft ware is?",
    },
    {
        question: "Bcc in mail means what",
    },
    {
        question: "Father of java programming language is ",
    },
    {
        question: "The first web based mail service is ",
    },
    {
        question: "____________ Was Called the 'X-Y Position Indicator for Display Systems",
    },
    {
        question: "In 2010, the domain name __________ was sold for $35.6 million, making it one of the most expensive domain name purchases in history",
    },
    {
        question: "The first world leader to create a YouTube channel was the British Prime Minister,_____________, who made his account in 2007.",
    },
    {
        question: "Facebook’s primary color is blue because founder Mark Zuckerberg has _____________.",
    },
    {
        question: "Project Nanjunda is a SOS button within this brands app for delivery boys when used it will send an SMS and an email notification alerting the hub in charge and nearest field executives. which company ?",
    },
    {
        question: "Which classic NOKIA game was made available for other smartphones via an app in 2015?",
    },
    {
        question: "Which Web Site tells that “Discover what’s happening right now”? ",
    },
    {
        question: "Vic heyes is considered as the father of ________?",
    },
    {
        question: "First pop song written by artificial intelligence?",
    },
    {
        question: "The world's first ______________ was unveiled on June 27, 1967 at a Barclays Bank branch in Enfield, north London",
    },
    {
        question: "The animal in the Mozilla Firefox logo?",
    },
];

const quizContainer = document.getElementById("quiz");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

let currentQuestionIndex = 0;
let answers = new Array(quizData.length).fill("");

// Function to load a question
function loadQuestion(index) {
    quizContainer.innerHTML = "";

    const questionData = quizData[index];
    const questionEl = document.createElement("h2");
    questionEl.textContent = `${index + 1}. ${questionData.question}`;
    quizContainer.appendChild(questionEl);

    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.value = answers[index] || ""; // Pre-fill if previously answered
    inputEl.placeholder = "Type your answer here...";
    inputEl.classList.add("answer-input");

    inputEl.addEventListener("input", (event) => {
        answers[index] = event.target.value.trim(); // Save the typed answer
    });

    quizContainer.appendChild(inputEl);

    // Enable or disable navigation buttons
    prevBtn.disabled = index === 0;
    nextBtn.style.display = index === quizData.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = index === quizData.length - 1 ? "inline-block" : "none";
}

// Event listeners for navigation buttons
prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
});

submitBtn.addEventListener("click", () => {
    // Save questions and answers to localStorage
    const quizResult = quizData.map((data, index) => ({
        question: data.question,
        answer: answers[index],
    }));
    localStorage.setItem("quizResult", JSON.stringify(quizResult));

    // Redirect to result page
    location.href = "result.html";
});



// Timer variables
const timerDisplay = document.getElementById("time-display");
let timeLeft = 1200; // Set the timer duration to 25 minutes in seconds
let timer;

// Function to format time as mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Function to start the timer
function startTimer() {
    timerDisplay.textContent = formatTime(timeLeft); // Initialize display

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = formatTime(timeLeft); // Update display
        } else {
            clearInterval(timer);
            alert("Time's up! Submitting your answers.");
            submitQuiz();
        }
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
}


// Function to submit the quiz
function submitQuiz() {
    const quizResult = quizData.map((data, index) => ({
        question: data.question,
        answer: answers[index],
    }));
    localStorage.setItem("quizResult", JSON.stringify(quizResult));
    location.href = "result.html";
}

// Start the timer when the first question is loaded
window.addEventListener("load", startTimer);

// Ensure the timer stops when the quiz is submitted
submitBtn.addEventListener("click", stopTimer);

// Load the first question on page load
loadQuestion(currentQuestionIndex);
