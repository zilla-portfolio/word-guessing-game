// CSS
import './App.css'

// REACT
import { useState, useEffect, useCallback } from 'react'

// DATA
import { wordsList } from './data/words'

// COMPONENTS
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

// Setting Up the Game Stages
const stages = [
  { id: 1, name: "Start" },
  { id: 2, name: "Game" },
  { id: 3, name: "GameOver" }
]

function App() {

  const [gameStage,setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState("")

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {

    // Pick Random de Categoria
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // Pick Random de Palavra
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  }, [words])

  // Start
  const startGame = useCallback(() => {

    clearLetterStates()

    // Choosing word and category
    const { category, word } = pickWordAndCategory()

    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    // Fill States
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  // Proccess the game
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase()

    if(
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return
    }

    if(letters.includes(normalizedLetter)) {

      // Correct Letter
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])
      setScore((actualScore) => actualScore+100)

    } else {
      
      // Wrong Letter
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])

      setGuesses((actualGuesses) => actualGuesses-1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if(guesses <= 0) {
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  useEffect(() => {

    const uniqueLetters = [... new Set(letters)]
    
    if(guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore += 1000)
      startGame()
    }
    
  },[guessedLetters, letters, startGame])

  // Restart
  const retry = () => {
    setGuesses(3)
    setScore(0)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      { gameStage === "Start" && <StartScreen startGame={startGame} /> }
      { gameStage === "Game" && <Game
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score} /> }
      { gameStage === "GameOver" && <GameOver retry={retry} score={score} /> }
    </div>
  )
}

export default App
