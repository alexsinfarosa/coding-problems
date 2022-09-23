import React from 'react'

export default function CounterPage() {
  console.count(`rendering CounterPage`)
  return (
    <>
      <h1 className="pt-6 text-center text-5xl font-bold">Separate Counters</h1>
      <div className="flex justify-center">
        <Counter bg="bg-green-100"></Counter>
        <Counter bg="bg-blue-100"></Counter>
      </div>
    </>
  )
}

function Counter({bg}: {bg: string}) {
  console.count(`rendering Counter`)
  const [count, setCount] = React.useState(0)
  return (
    <div
      className={`m-8 flex flex-col items-center rounded-md border ${bg} p-4 shadow-md`}
    >
      <h1 className="text-4xl">Counter</h1>
      <p className="text-9xl">{count}</p>
      <div className="space-x-4">
        <button
          onClick={() => setCount(d => d - 1)}
          className="mt-4 rounded-md border bg-white px-2 py-1"
        >
          Decrement
        </button>
        <button
          onClick={() => setCount(d => d + 1)}
          className="mt-4 rounded-md border bg-white px-2 py-1"
        >
          Increment
        </button>
      </div>
    </div>
  )
}
