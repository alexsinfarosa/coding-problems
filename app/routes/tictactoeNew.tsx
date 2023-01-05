import React from 'react'

export default function TicTacToe() {
  const [squares, setSquares] = React.useState<(string | null)[]>(
    Array(9).fill(null),
  )
  const [isX, setIsX] = React.useState(false)
  console.log(squares, isX)

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = `Winner is: ${winner}`
  } else {
    status = `Next Player: ${isX ? 'O' : 'X'}`
  }

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
      <h2 className="text-4xl font-semibold mb-4">{status}</h2>
      <section className="grid grid-cols-3 grid-rows-3">
        <Square i={0} onSquareClick={handleClick}>
          {squares[0]}
        </Square>
        <Square i={1} onSquareClick={handleClick}>
          {squares[1]}
        </Square>
        <Square i={2} onSquareClick={handleClick}>
          {squares[2]}
        </Square>
        <Square i={3} onSquareClick={handleClick}>
          {squares[3]}
        </Square>
        <Square i={4} onSquareClick={handleClick}>
          {squares[4]}
        </Square>
        <Square i={5} onSquareClick={handleClick}>
          {squares[5]}
        </Square>
        <Square i={6} onSquareClick={handleClick}>
          {squares[6]}
        </Square>
        <Square i={7} onSquareClick={handleClick}>
          {squares[7]}
        </Square>
        <Square i={8} onSquareClick={handleClick}>
          {squares[8]}
        </Square>
      </section>
    </main>
  )
}

function Square({
  i,
  children,
  onSquareClick,
}: {
  i: number
  children: string | null
  onSquareClick: (i: number) => void
}) {
  return (
    <button
      className="w-28 h-28 border text-6xl font-bold"
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
      return squares[a]
    }
  }
}
