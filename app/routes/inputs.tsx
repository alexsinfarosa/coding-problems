import React from 'react'

export default function Inputs() {
  const [value, setValue] = React.useState('') // <- cannot be undefined

  const id = React.useId()
  const textInputControlled = `${id}-text-controlled`
  return (
    <main className="p-8">
      <p className="p-2">Value: {value}</p>
      <form className=" w-1/3">
        <fieldset className="bg-gray-50 p-2 rounded-md">
          <legend>Controlled Text Input</legend>
          <label htmlFor={textInputControlled}>Controlled Input:</label>
          <input
            id={textInputControlled}
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </fieldset>
      </form>
    </main>
  )
}
