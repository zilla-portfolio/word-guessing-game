import './Game.css'
import { useState, useRef } from 'react'

const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score}) => {

  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)

    setLetter("")
    letterInputRef.current.focus()
  }

  return (
    <div className="game">
      <p className="points">
        <span>Score: {score}</span>
      </p>
      <h1>Guess the word</h1>
      <h3 className="tip">
        Tip: <span>{pickedCategory}</span>
      </h3>
      <p>You still have {guesses} attempts</p>
      <div className="wordContainer">
        {letters.map((letter,i) => (
          guessedLetters.includes(letter) ?
          (
            <span key={i} className="blankSquare">{letter}</span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        ))}
      </div>
      <div className="letterContainer">
        <p>Try to guess a letter:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
            autoFocus
          />
          <button>PLAY!</button>
        </form>
      </div>
      <div className="wrongLetterContainer">
        <p>Wrong letters already tried</p>
        {wrongLetters.map((letter,i) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game