const wordList = [
    'gold',
    'luck',
    'clover',
    'rain',
    'charm',
    'parade',
    'leprechaun',
    'treasure',
    'celebration',
    'greenery',
    'shenanigans',
    'tradition',
    'rainbow',
    'pot'
]

//setting Game Variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6

function startGame(level) {
    selectedWord = getRandomWord(level)

    //Update Difficulty Display Div
    updateDifficultyDisplay(level)

    //Create the placeholder for the selected word
    displayedWord = '_'.repeat(selectedWord.length)
    //display the updated word
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')

    //Hide Difficulty Selection and Show Game Area & Difficulty Box
    //Add d-none to difficultySelection div
    document.getElementById('difficultySelection').classList.add('d-none')
    //Remove d-none from difficultyBox & gameArea
    document.getElementById('difficultyBox').classList.remove('d-none')
    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('gameArea2').classList.remove('d-none')
    //Add d-block to difficultyBox & gameArea
    document.getElementById('difficultyBox').classList.add('d-block')
    document.getElementById('gameArea').classList.add('d-block')
    document.getElementById('gameArea2').classList.add('d-block')
}

function getRandomWord(level) {
    let filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4;// Easy: 4 or fewer letters
        else if (level === 'medium') return 5 <= word.length && word.length <= 7;// Medium: 5-7 letters
        else if (level === 'hard') return 8 <= word.length// Hard: 8+ letters
    })
    //Select and return random word from the filtered list
    return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

function updateDifficultyDisplay(level) {
    //document.getElementById('difficultyBox').textContent =
    let difficultyBox = document.getElementById('difficultyBox')
    //Remove any present difficulty classes
    difficultyBox.classList.remove('easy', 'medium', 'hard')
    //Set text & apply class dynamically using template literals
    difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`
    //Apply the appropriate css style for chosen difficulty
    difficultyBox.classList.add(level)
}

function guessLetter() {
    let inputField = document.getElementById('letterInput') //get input field
    let guessedLetter = inputField.value.toLowerCase() //convert input to lowercase

    //check if input is a valid letter (a-z)
    if (!guessedLetter.match(/^[a-z]$/)) {
        alert(`Please enter a valid letter between A-Z!`)
        inputField.value = '' //clear input field
        inputField.innerText = '' //clear input field
        return //exit
    }

    //check if letter was already guessed using .include()
    if (guessedLetters.includes(guessedLetter)) {
        alert(`You've already guessed this letter!`)
        inputField.value = '' //clear input field
        inputField.innerText = '' //clear input field
        return //exit
    } else {
        //store guessed letter in guessedLetters array
        guessedLetters.push(guessedLetter)
    }

    if (selectedWord.includes(guessedLetters)) {
        correctGuess(guessedLetter)
    } else {
        wrongGuess(guessedLetter)
    }

    inputField.value = '' //clear input field
    inputField.innerText = '' //clear input field
    inputField.focus() //refocus input field for next guess
}

function wrongGuess(guessedLetter) {
    //increment # of wrong guesses
    wrongGuesses++
    //add guessed letter to wrong  HTML div
    document.getElementById('wrongLetters').textContent += `${guessedLetter}`

    document.getElementById('shamrock').arc = `img/shamrock${6 - wrongGuesses}.png`

    const maxMistakes = 6
    //change back to see ig % of wrong guesses is - max mistakes
    if (wrongGuess === maxMistakes) {
        endGame(false)
    }
}

function correctGuess(guessedLetter) {
    let newDisplayedWord = ''

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
            newDisplayedWord += guessedLetter
        } else {
            newDisplayedWord += displayedWord[i]
        }
    }
    displayedWord = newDisplayedWord

    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')

    if (!displayedWord.includes('_')) {
        endGame(true)
    }
}

function endGame(won) {
    if (won === true) {
        setTimeout(() => alert("yay u won"), 100)
    } else {

    }
}

function restartGame() {
    location.reload()
}