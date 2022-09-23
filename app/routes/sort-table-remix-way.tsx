import {Link, useSearchParams} from '@remix-run/react'
import React from 'react'

// https://jsonplaceholder.typicode.com/users
const url = `https://jsonplaceholder.typicode.com/users`

async function fetchUsers(signal: any) {
  try {
    const res = await fetch(url, {signal})

    if (!res.ok) {
      throw new Error(`There was an error: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

function flatAddress(arr, key) {
  const address = arr.map(d => d[key])
  return address.map(d => {
    const {geo, ...props} = d
    return {...props, ...geo}
  })
}

export default function SortTableRemixWay() {
  const [users, setUsers] = React.useState([])
  const data = flatAddress(users, 'address')
  const [searchParams] = useSearchParams()
  const sort = searchParams.get('sort') || ''
  const [key, desc] = sort.split(':')

  const sortedData = [...data].sort((a, b) =>
    desc ? b[key]?.localeCompare(a[key]) : a[key]?.localeCompare(b[key]),
  )

  React.useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    async function startFetchingUser() {
      const users = await fetchUsers(signal)
      setUsers(users)
    }

    startFetchingUser()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-semibold">Sort Table REMIX Way</h1>
      <br />
      <section className="flex">
        API data[0]: <pre>{JSON.stringify(users[0], null, 4)}</pre>
        Address data[0] - flattened:{' '}
        <pre>{JSON.stringify(data[0], null, 4)}</pre>
      </section>

      <br />

      {sortedData.length && (
        <table className="w-full table-auto">
          <thead>
            <tr>
              {Object.keys(sortedData[0]).map(k => {
                let sorted = null
                if (key === '' || desc || key !== k) sorted = k
                if (key === k && !desc) sorted = `${k}:desc`
                return (
                  <th key={k} className="mb-2 bg-orange-200 text-left">
                    <Link
                      to={sorted ? `./?sort=${sorted}` : '.'}
                      className="text-lg font-semibold "
                    >
                      {k} {k === '' && !desc && ''}
                      {k === key && !desc && '🔼'}
                      {k === key && desc && '🔽'}
                    </Link>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((d, i) => {
              return (
                <tr
                  key={i}
                  className={`table-row border ${
                    i % 2 === 0 ? `bg-white` : ``
                  }`}
                >
                  {Object.values(d).map((val, i) => {
                    return <td key={i}>{val}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
