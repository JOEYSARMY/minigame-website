window.addEventListener('load', init);

// Globals

// Available Levels
const levels = {
  easy: 30,
  medium: 15,
  hard: 5
};

// To change level
const currentLevel = levels.hard;

let time = currentLevel;
let score = 0;
let isPlaying;
let phraseIndex = 0;


// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const currentPhrase = document.querySelector('#current-phrase');

const words =[["squirrel", "Acorns", "Tree", "Ratatoskr", "Aorta", "Trachea", "Tibial Artery", "Vena Cava", "Caudal Vein", "松鼠神将很快从他久已被遗忘的纯粹折磨中降临，使他的子民摆脱屈服"]];
// [
//   ['centrale', 'are', 'about', '200', 'species', 'of', 'squirrels', 'in', 'the', 'world.', 'There', 'are', 'about', '10', 'tree', 'species', 'in', 'North', 'America.'],
//   ['A', 'squirrel', 'has', '2', 'to', '4', 'babies', 'at', 'a', 'time', 'and', 'can', 'raise', 'two', 'litters', 'of', 'kits', 'per', 'year.']
// ];
let randWordsIndex = Math.floor(Math.random() * words.length);

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}




// Pick & show random word & paragraph
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  //output phrase
  currentPhrase.innerHTML = words[randWordsIndex].join(' ');
  // Output random word
  currentWord.innerHTML = words[randWordsIndex][phraseIndex++];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    score = -1;
    phraseIndex = 0;
  }
}
