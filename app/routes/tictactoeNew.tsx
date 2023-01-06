import clsx from 'clsx'
import React from 'react'

export default function TicTacToe() {
  const [squares, setSquares] = React.useState<(string | null)[]>(
    Array(9).fill(null),
  )
  const [isX, setIsX] = React.useState(false)

  const winner = calculateWinner(squares)

  function handleClick(i: number) {
    if (winner) return

    const nextSquares = [...squares]

    if (isX) {
      nextSquares[i] = 'O'
      setIsX(false)
    } else {
      nextSquares[i] = 'X'
      setIsX(true)
    }

    setSquares(nextSquares)
  }

  React.useEffect(() => {
    const val = Math.random()
    if (val > 0.5) setIsX(true)
    if (val <= 0.5) setIsX(false)
  }, [])

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      {winner ? (
        <h2 className="text-4xl font-semibold mb-4">
          Winner is <span className="text-red-500">{winner?.player}</span>
        </h2>
      ) : (
        <h2 className="text-4xl font-semibold mb-4">
          Next Player: {isX ? 'O' : 'X'}
        </h2>
      )}

      <section className="grid grid-cols-3 grid-rows-3 mb-4">
        {squares.map((square, i) => {
          let isColored = false
          if (winner) {
            isColored = winner.line.includes(i)
          }
          return (
            <Square
              key={i}
              i={i}
              onSquareClick={handleClick}
              isColored={isColored}
            >
              {square}
            </Square>
          )
        })}
      </section>
      {winner && (
        <button
          className="inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          onClick={() => setSquares(Array(9).fill(null))}
        >
          Reset
        </button>
      )}
    </main>
  )
}

function Square({
  i,
  children,
  onSquareClick,
  isColored,
}: {
  i: number
  children: string | null
  onSquareClick: (i: number) => void
  isColored: boolean | undefined
}) {
  return (
    <button
      className={clsx(
        'w-28 h-28 border text-6xl font-bold',
        isColored ? 'text-red-500' : '',
      )}
      onClick={() => onSquareClick(i)}
    >
      {children}
    </button>
  )
}

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {player: squares[a], line: lines[i]}
    }
  }
}
