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

const guessedWords = []

//setting Game Variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6
let pointAmount = 0

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

    if (selectedWord.includes(guessedLetter)) {
        correctGuess(guessedLetter)
    } else {
        wrongGuess(guessedLetter)
    }

    inputField.value = '' //clear input field
    inputField.innerText = '' //clear input field
    inputField.focus() //refocus input field for next guess
}


document.getElementById('letterInput').addEventListener("keydown", (event) => {
    let guessedLetter = document.getElementById('letterInput').value.toLowerCase() //convert input to lowercase

    if (event.key === "Enter") {
        //check if input is a valid letter (a-z)
        if (!guessedLetter.match(/^[a-z]$/)) {
            alert(`Please enter a valid letter between A-Z!`)
            document.getElementById('letterInput').value = '' //clear input field
            document.getElementById('letterInput').innerText = '' //clear input field
            return //exit
        }

        //check if letter was already guessed using .include()
        if (guessedLetters.includes(guessedLetter)) {
            alert(`You've already guessed this letter!`)
            document.getElementById('letterInput').value = '' //clear input field
            document.getElementById('letterInput').innerText = '' //clear input field
            return //exit
        } else {
            //store guessed letter in guessedLetters array
            guessedLetters.push(guessedLetter)
        }

        if (selectedWord.includes(guessedLetter)) {
            correctGuess(guessedLetter)
        } else {
            wrongGuess(guessedLetter)
        }

        document.getElementById('letterInput').value = '' //clear input field
        document.getElementById('letterInput').innerText = '' //clear input field
        document.getElementById('letterInput').focus() //refocus input field for next guess
    }
})

function wrongGuess(guessedLetter) {
    //increment # of wrong guesses
    wrongGuesses++

    //add guessed letter to wrong  HTML div
    document.getElementById('wrongLetters').textContent += `${guessedLetter} `

    document.getElementById('shamrock').src = `imgs/shamrock${6 - wrongGuesses}.png`

    const wrong = new Audio('WRONG.mp3');
    wrong.play();

    const maxMistakes = 6
    //change back to see ig % of wrong guesses is - max mistakes
    if (wrongGuesses === maxMistakes) {
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

    const correct = new Audio('yay.mp3');
    correct.play();

    if (!displayedWord.includes('_')) {
        endGame(true)
        pointCount(true)
        removeWord()
    }
}

function endGame(won) {
    document.getElementById('end').classList.remove('win', 'lost')
    document.getElementById('letterInput').disabled = true

    if (won === true) {
        document.getElementById('end').classList.remove('d-none')
        document.getElementById('end').textContent = `Congratulations, you guessed the word correctly!`
        document.getElementById('end').classList.add('win')
    } else if (won === false) {
        document.getElementById('end').classList.remove('d-none')
        document.getElementById('end').innerHTML = `Try again next time, the word was <b>${selectedWord}</b>!`
        document.getElementById('end').classList.add('lost')
    }

}

function pointCount(won){
    if (won === true) {
        pointAmount++
        return document.getElementById('points').innerHTML = `<p>So far you have won <b>${pointAmount}</b> times!</p>`
    } else {
        return document.getElementById('points').innerHTML = `<p>So far you have won <b>${pointAmount}</b> times!</p>`
    }

}

function removeWord(){
    guessedWords.push(selectedWord)
    wordList.with([selectedWord], '')
    document.getElementById('grave').textContent = `${guessedWords}`
}

function restartGame() {
    //Hide Difficulty Selection and Show Game Area & Difficulty Box
    //Add d-none to difficultySelection div
    document.getElementById('difficultySelection').classList.remove('d-none')
    //Remove d-none from difficultyBox & gameArea
    document.getElementById('difficultyBox').classList.add('d-none')
    document.getElementById('gameArea').classList.add('d-none')
    document.getElementById('gameArea2').classList.add('d-none')
    //Add d-block to difficultyBox & gameArea
    document.getElementById('difficultyBox').classList.remove('d-block')
    document.getElementById('gameArea').classList.remove('d-block')
    document.getElementById('gameArea2').classList.remove('d-block')
    document.getElementById('guessing').classList.remove('d-none')

    document.getElementById('end').classList.remove('win', 'lost')
    document.getElementById('end').classList.add('d-none')
    document.getElementById('letterInput').disabled = false

    document.getElementById('wrongLetters').textContent = `Wrong Guesses: `
    document.getElementById('shamrock').src = 'imgs/shamrock6.png'

    document.getElementById('letterInput').value = ''
    document.getElementById('letterInput').innerText = ''

    wrongGuesses = 0
    guessedLetters = ['']
}