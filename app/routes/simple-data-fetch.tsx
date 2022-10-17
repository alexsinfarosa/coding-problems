import * as React from 'react'
const {useState, useEffect} = React

export default function SimpleDataFetch() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [page, setPage] = useState(0)

  async function fetchUser(page: number, signal: AbortSignal) {
    try {
      setIsLoading(true)
      const res = await fetch(`https://www.randomuser.me/api?results=${page}`, {
        signal,
      })
      if (!res.ok) {
        throw new Error(`This is an HTTP error: The status is ${res.status}`)
      }
      const data = await res.json()
      return data.results[0]
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.log('fetchUser was aborted')
        } else {
          setIsError(true)
          setUser(null)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // let ignore = false
    const controller = new AbortController()
    const signal = controller.signal

    async function startFetchingUser() {
      const user = await fetchUser(page, signal)
      setUser(user)
    }
    startFetchingUser()

    return () => {
      console.log(`controller.abort()`)
      controller.abort()
    }
  }, [page])

  return (
    <>
      <button
        className={'mx-auto mt-4 flex rounded-md border p-1'}
        onClick={() => setPage(page + 1)}
      >
        Load User
      </button>

      <section className=" mx-auto mt-8 flex max-w-5xl items-center rounded-md bg-white p-4">
        {isLoading && <span>Loading...</span>}
        {isError && <span>There was an error.</span>}
        {isLoading === false && isError === false && (
          <pre>{JSON.stringify(user, null, 4)}</pre>
        )}
      </section>
    </>
  )
}
