import clsx from 'clsx'
import React from 'react'

export default function TicTacToe() {
  const [history, setHistory] = React.useState<(string | null)[][]>([
    Array(9).fill(null),
  ])

  const [currentMove, setCurrentMove] = React.useState(0)
  const squares: (string | null)[] = history[currentMove]

  const [isX, setIsX] = React.useState(false)
  const winner = calculateWinner(squares)

  function handleClick(i: number) {
    if (squares[i] || winner) return

    const nextSquares = [...squares]

    if (isX) {
      nextSquares[i] = 'O'
      setIsX(false)
    } else {
      nextSquares[i] = 'X'
      setIsX(true)
    }

    const nextHistory = [...history, nextSquares]
    setHistory(nextHistory)
    setCurrentMove(currentMove + 1)
  }

  React.useEffect(() => {
    const val = Math.random()
    if (val > 0.5) setIsX(true)
    if (val <= 0.5) setIsX(false)
  }, [])

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <section className="mb-8">
        {winner ? (
          <h2 className="text-5xl font-semibold">
            Winner: <span className="text-red-500">{winner?.player}</span>
          </h2>
        ) : (
          <h2 className="text-5xl font-semibold">
            Next Player: {isX ? 'O' : 'X'}
          </h2>
        )}
      </section>

      <div className="flex gap-8 mb-8">
        <div className="grid grid-cols-3 grid-rows-3 border">
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
        </div>
        <div className="">
          <h2 className="text-gray-500 font-semibold mb-2">Play-By-Play</h2>
          <ul>
            {history.map((move, i) => {
              if (i > 0) {
                return (
                  <li key={i} className=" my-1">
                    <button
                      className="inline-flex items-center rounded border border-transparent bg-emerald-100 px-2.5 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                      onClick={() => setCurrentMove(i)}
                    >
                      Go to move #{i}
                    </button>
                  </li>
                )
              } else {
                return null
              }
            })}
          </ul>
        </div>
      </div>

      <button
        className="w-20 h-20 items-center rounded-full border border-transparent bg-emerald-600 p-3 text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        onClick={() => {
          setHistory([Array(9).fill(null)])
          setCurrentMove(0)
        }}
      >
        Reset
      </button>
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
        'w-28 h-28 border text-7xl',
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
