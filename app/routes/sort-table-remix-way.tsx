import React from 'react'
import {Link, useLoaderData} from '@remix-run/react'
import sortBy from 'sort-by'

// https://jsonplaceholder.typicode.com/users
const url = `https://jsonplaceholder.typicode.com/users`

async function fetchUsers() {
  try {
    const res = await fetch(url)

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

export async function loader({request}: {request: Request}) {
  const users = await fetchUsers()
  const data = flatAddress(users, 'address')
  const url = new URL(request.url)
  const sort = url.searchParams.get('sort') || 'asc'
  const by = url.searchParams.get('by') || 'street'
  return {
    users,
    data: data.sort(sortBy(sort === 'asc' ? by : `-${by}`)),
    sort,
    by,
  }
}

function SortLink({
  field,
  children,
}: {
  field: string
  children: React.ReactNode
}) {
  const {sort, by} = useLoaderData()
  const isActive = by === field
  const sortParam = !isActive ? sort : sort === 'asc' ? 'desc' : 'asc'

  return (
    <Link
      to={`?sort=${sortParam}&by=${field}`}
      className={isActive ? 'text-red-600' : 'inherit'}
    >
      {children} {sort === 'asc' ? '↓' : '↑'}
    </Link>
  )
}

export default function SortTableRemixWay() {
  const {users, sort, by, data} = useLoaderData()
  const linkSort = sort === 'asc' ? 'desc' : 'asc'
  console.log({linkSort, by})

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

      {data.length && (
        <table className="w-full table-auto">
          <thead>
            <tr>
              {Object.keys(data[0]).map(key => (
                <th key={key} className="mb-2 bg-orange-200 text-left">
                  <SortLink field={key}>{key}</SortLink>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => {
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
