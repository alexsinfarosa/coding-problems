export default function IndexRoute() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl my-4">Start!</h1>

      <div className="max-w-7xl">
        <Outer city={'New York'}></Outer>
      </div>
    </div>
  )
}

function Outer({city, size = 100}: {city: string; size?: number}) {
  return (
    <section>
      There are {size} Guests in {city}
    </section>
  )
}
