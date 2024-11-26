import { useState } from 'react'
import './App.css'

import Square from './components/Square'

const TURNS = {X: 'x', O: 'o'}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(() => {
    // si hay una partida guardada
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  }) /* Estado del tablero */

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  }) /* Estado de los turnos, arranca X*/

  const [winner, setWinner] = useState(null) /* true hay ganador, false es empate */

  const checkWinner = (boardCheck) =>{
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo;
      if ( boardCheck[a] && boardCheck[a]==boardCheck[b] && boardCheck[a]==boardCheck[c]){
        return boardCheck[a]
      }
    }
    return null
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    if(board[index] || winner) return // no actualiza

    // update turno
    const newTurn = turn==TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // update tablero
    const newBoard = [...board] /* esto es una copia del board */
    newBoard[index]=turn // agrega la ficha (x u o) donde se seleccionó
    setBoard(newBoard) // setea nuevo estado

    //guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    // chequeo ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      setWinner(newWinner)
    }

    // chequeo si es empate
    if(!newWinner){
      if(newBoard.every((square)=> square!= null)){
        setWinner(false)
      }
    }
  }
  
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
        board.map((_, index) =>{
          return(
            <Square 
              key={index} index={index} 
              updateBoard={updateBoard}>
              {board[index]}
            </Square>
          )
        })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}> {TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}> {TURNS.O}</Square>
      </section>

      {
        winner != null && (
          <section className="winner">
            <div className="text">
              <h2>{winner== false ? 'Es un empate!' : 'Ganó '+ winner}</h2>

              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo :)</button>
              </footer>
            </div>
          </section>
        )
      }

    </main>
  )
}

export default App
