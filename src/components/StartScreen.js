import './StartScreen.css';

const StartScreen = ({startGame}) => {
  return (
    <div className="start">
        <h1>Secret Word</h1>
        <p>Press the button to start the game.</p>
        <button onClick={startGame}>START</button>
    </div>
  )
}

export default StartScreen