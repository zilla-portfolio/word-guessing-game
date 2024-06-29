import './GameOver.css'

const GameOver = ({retry, score}) => {
  return (
    <div>
        <h1>Game Over</h1>
        <h2>Score: <span>{score}</span></h2>
        <button onClick={retry}>RESTART</button>
    </div>
  )
}

export default GameOver