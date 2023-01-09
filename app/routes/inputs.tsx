import React from 'react'

export default function Inputs() {
  const [value, setValue] = React.useState('') // <- cannot be undefined

  const id = React.useId()
  const textInputUncontrolled = `${id}-text-uncontrolled`
  const textInputControlled = `${id}-text-controlled`

  return (
    <main className="p-8">
      <pre className="p-2 mb-4">Value: </pre>
      <form className="w-1/3">
        <fieldset className="bg-gray-50 p-2 rounded-md">
          <legend className="text-gray-500">Uncontrolled Text Input</legend>
          <label htmlFor={textInputUncontrolled}>Uncontrolled Input:</label>
          <input
            id={textInputUncontrolled}
            className="rounded-md border border-gray-300 ml-2"
            type="text"
          />
        </fieldset>
      </form>
      <br></br>

      <pre className="p-2 mb-4">Value: {value}</pre>
      <form className="w-1/3">
        <fieldset className="bg-gray-50 p-2 rounded-md">
          <legend className="text-gray-500">Controlled Text Input</legend>
          <label htmlFor={textInputControlled}>Controlled Input:</label>
          <input
            id={textInputControlled}
            className="rounded-md border border-gray-300 ml-2"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </fieldset>
      </form>
    </main>
  )
}
