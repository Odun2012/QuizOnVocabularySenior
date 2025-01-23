// Updated list of words with their meanings, parts of speech, and origins
const words = [
    { word: "MACAROON", meaning: "A cookie made chiefly of egg whites, sugar and coconut or almond paste", partOfSpeech: "Noun", origin: "French" },
    { word: "RAPPORT", meaning: "A close and harmonious relationship in which the people or groups concerned understand each other's feelings or ideas.", partOfSpeech: "Noun", origin: "French" },
    { word: "ARTERIOSCLEROSIS", meaning: "A condition in which the arteries become thickened and narrowed, restricting blood flow.", partOfSpeech: "Noun", origin: "Greek" },
    { word: "PIROUETTE", meaning: "A fast spin or twirl, especially on one foot.", partOfSpeech: "Noun", origin: "French" },
    { word: "CAYENNE", meaning: "A hot red pepper, often used in cooking.", partOfSpeech: "Noun", origin: "French" },
    { word: "EINSTEIN", meaning: "A renowned physicist known for the theory of relativity.", partOfSpeech: "Proper Noun", origin: "German" },
    { word: "CHEESESTEAK", meaning: "A sandwich filled with thinly sliced beef, grilled onions, and melted cheese.", partOfSpeech: "Noun", origin: "American" },
    { word: "GINGLYMUS", meaning: "A hinge joint allowing movement in one plane.", partOfSpeech: "Noun", origin: "Latin" },
    { word: "JUXTAPOSITION", meaning: "The fact of two things being seen or placed close together with contrasting effect.", partOfSpeech: "Noun", origin: "Latin" },
    { word: "IMMISCIBLE", meaning: "Incapable of being mixed or blended together.", partOfSpeech: "Adjective", origin: "Latin" },
    { word: "PSORIASIS", meaning: "A skin condition marked by red, itchy, scaly patches.", partOfSpeech: "Noun", origin: "Greek" },
    { word: "NETSUKE", meaning: "A small carved object used to fasten cords to a kimono.", partOfSpeech: "Noun", origin: "Japanese" },
    { word: "NASCENCY", meaning: "The state of being born or coming into existence.", partOfSpeech: "Noun", origin: "Latin" },
    { word: "IMMUNOLOGIC", meaning: "Relating to immunology, the study of the immune system.", partOfSpeech: "Adjective", origin: "Greek" },
    { word: "AGEUSIA", meaning: "The loss or absence of the sense of taste.", partOfSpeech: "Noun", origin: "Greek" },
    { word: "PEKOE", meaning: "A fine grade of black tea, especially from China or India.", partOfSpeech: "Noun", origin: "Chinese" },
    { word: "TATTERSALL", meaning: "A pattern of squares, typically on woolen fabric.", partOfSpeech: "Noun", origin: "English" },
    { word: "FOUDROYANT", meaning: "Striking with a sudden and powerful impact.", partOfSpeech: "Adjective", origin: "French" },
    { word: "CHAMOIS", meaning: "A type of soft leather, typically used for cleaning or polishing.", partOfSpeech: "Noun", origin: "French" },
    { word: "MASTIFF", meaning: "A large and powerful breed of dog, often used as a guard dog.", partOfSpeech: "Noun", origin: "English" },
    { word: "SCUTTLEBUTT", meaning: "A barrel of drinking water on a ship; also a term for gossip or rumor.", partOfSpeech: "Noun", origin: "Nautical" },
    { word: "VIOLONCELLO", meaning: "A large string instrument of the violin family, played by being held between the knees.", partOfSpeech: "Noun", origin: "Italian" },
    { word: "CROISSANT", meaning: "A buttery, flaky, crescent-shaped bread roll, typically eaten for breakfast.", partOfSpeech: "Noun", origin: "French" },
    { word: "SCHIZOPHRENIA", meaning: "A severe mental disorder characterized by a breakdown in thinking, emotional regulation, and behavior.", partOfSpeech: "Noun", origin: "Greek" },
    { word: "BIMILLENARY", meaning: "Relating to a period of two thousand years.", partOfSpeech: "Adjective", origin: "Latin" },
    { word: "GOURMET", meaning: "A person who enjoys and has a deep understanding of fine food and drink; or food that is of high quality.", partOfSpeech: "Noun/Adjective", origin: "French" },
    { word: "STATUESQUE", meaning: "Resembling a statue, typically implying grace or beauty.", partOfSpeech: "Adjective", origin: "Latin" },
    { word: "SEPTICAEMIA", meaning: "Blood poisoning caused by bacteria in the bloodstream.", partOfSpeech: "Noun", origin: "Greek" },
    { word: "SCYTHE", meaning: "A tool used for cutting grass or grain, typically with a long curved blade.", partOfSpeech: "Noun", origin: "Old English" },
    { word: "IMPASSE", meaning: "A situation in which no progress can be made, or a deadlock.", partOfSpeech: "Noun", origin: "French" }
];

// Shuffle function to randomize the order of questions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Set up initial state
let currentWordIndex = 0;
let timerInterval;
let timeRemaining = 25;
let userAnswers = [];
let correctAnswersCount = 0;

// Get DOM elements
const meaningDisplay = document.getElementById("meaning");
const partOfSpeechDisplay = document.getElementById("partOfSpeech");
const timerDisplay = document.getElementById("timer");
const userAnswerInput = document.getElementById("userAnswer");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const answersDisplay = document.getElementById("answers");
const correctAnswersDisplay = document.getElementById("correctAnswers");
const scoreDisplay = document.getElementById("score");
const retakeBtn = document.getElementById("retakeBtn");
const endQuizBtn = document.getElementById("endQuizBtn");
const questionNumberDisplay = document.getElementById("question-number-span");

// Function to start the timer
function startTimer() {
    // Clear any existing interval before starting a new one
    clearInterval(timerInterval);

    timerInterval = setInterval(function () {
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            submitAnswer(); // Automatically submit answer when timer runs out
        }
    }, 1000);
}

// Function to show the next word
function showNextWord() {
    if (currentWordIndex < words.length) {
        // Update question number
        questionNumberDisplay.textContent = currentWordIndex + 1;

        timeRemaining = 25;
        timerDisplay.textContent = timeRemaining; // Reset the timer display
        meaningDisplay.textContent = `Meaning: ${words[currentWordIndex].meaning}`;
        partOfSpeechDisplay.textContent = `Part of Speech: ${words[currentWordIndex].partOfSpeech}`;
        userAnswerInput.value = '';
        startTimer(); // Start the timer for the new word
        nextBtn.style.display = 'none'; // Hide the next button until after submission
        submitBtn.disabled = false; // Enable the submit button
    } else {
        showResults(); // Show results after the last word
    }
}

// Function to submit an answer
function submitAnswer() {
    const userAnswer = userAnswerInput.value.trim().toUpperCase();
    const correctAnswer = words[currentWordIndex].word;

    if (userAnswer === correctAnswer) {
        correctAnswersCount++; // Increase correct answer count
    }

    userAnswers.push({
        userAnswer: userAnswer,
        correctAnswer: correctAnswer
    });

    answersDisplay.innerHTML += `<div>Your answer: <span class="${userAnswer === correctAnswer ? 'correct' : 'incorrect'}">${userAnswer}</span></div>`;
    correctAnswersDisplay.innerHTML += `<div>Correct answer: <span class="correct">${correctAnswer}</span></div>`;

    currentWordIndex++; // Move to the next word
    nextBtn.style.display = 'block'; // Show the next button
    submitBtn.disabled = true; // Disable the submit button after answering
}

// Function to show the results at the end of the quiz
function showResults() {
    scoreDisplay.innerHTML = `<p>Total Score: ${correctAnswersCount} / ${words.length}</p>`;
    answersDisplay.innerHTML += `<h3>Your Answers</h3>`;
    correctAnswersDisplay.innerHTML += `<h3>Correct Answers</h3>`;
    document.getElementById("results").style.display = 'block'; // Show results
    nextBtn.style.display = 'none'; // Hide next button after quiz ends
}

// Function to retake the quiz
function retakeQuiz() {
    // Reshuffle the questions
    shuffleArray(words);
    // Reset states
    currentWordIndex = 0;
    correctAnswersCount = 0;
    userAnswers = [];
    answersDisplay.innerHTML = '';
    correctAnswersDisplay.innerHTML = '';
    scoreDisplay.innerHTML = '';
    document.getElementById("results").style.display = 'none'; // Hide results
    showNextWord(); // Start the quiz again
}

// Event listeners for buttons
submitBtn.addEventListener('click', submitAnswer);
nextBtn.addEventListener('click', showNextWord);
retakeBtn.addEventListener('click', retakeQuiz);
endQuizBtn.addEventListener('click', function() {
    alert("Thank you for playing!"); // End quiz alert
    window.close(); // Close the quiz window (optional)
});

// Start with the first word
shuffleArray(words); // Shuffle questions initially
showNextWord();


// I want to add more questons, what must I adjust in my code?
// I can't see the full display of the correct answers after the quiz, what adjustment can I make?