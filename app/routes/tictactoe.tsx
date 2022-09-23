import clsx from 'clsx'
import {useState} from 'react'

function calculateWinner(squares: (null | string)[]): number[] | undefined {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  return wins.find(win => {
    const a = squares[win[0]]
    const b = squares[win[1]]
    const c = squares[win[2]]
    if (!a && !b && !c) {
      return undefined
    } else {
      return a === b && b === c
    }
  })
}

function nextValue(val: string | null) {
  if (!val) return Math.random() > 0.5 ? 'X' : 'O'
  if (val === 'X') return 'O'
  if (val === 'O') return 'X'
}

function Board() {
  const [squares, setSquares] = useState(() => Array(9).fill(null))
  const [current, setCurrent] = useState(null)
  const winner = calculateWinner(squares)

  function selectSquare(index: number) {
    const squaresCopy = [...squares]
    squaresCopy[index] = nextValue(current)
    setCurrent(squaresCopy[index])
    setSquares(squaresCopy)
  }

  return (
    <div className="">
      <h1 className="mb-4 text-3xl font-medium text-gray-700">Tic Tac Toe</h1>
      <div className="grid h-96 w-96 grid-cols-3 grid-rows-3 rounded-lg border">
        {squares.map((cell, index) => (
          <button
            key={index}
            disabled={winner !== undefined}
            className={clsx(
              (index + 1) % 3 === 0 ? '' : 'border-r',
              index < 6 && `border-b`,
              'text-7xl',
              winner &&
                (winner[0] === index ||
                  winner[1] === index ||
                  winner[2] === index) &&
                'text-rose-600',
            )}
            onClick={() => selectSquare(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="flex items-baseline space-x-4">
        <button
          type="button"
          className="mt-8 inline-flex items-center rounded-md border border-transparent bg-rose-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          onClick={() => setSquares(Array(9).fill(null))}
        >
          Reset
        </button>
        {winner && (
          <h3 className="text-3xl font-medium text-gray-700">Winner! 🎉 </h3>
        )}
      </div>
    </div>
  )
}

export default function Index() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="flex justify-center space-x-8 px-4 py-5 sm:p-6">
          <Board></Board>
        </div>
      </div>
    </div>
  )
}
