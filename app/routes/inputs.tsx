import React from 'react'

export default function Inputs() {
  const oneWayDataBinding = 'Static content'
  const [value, setValue] = React.useState('') // <- cannot be undefined

  const id = React.useId()
  const textInputUncontrolled = `${id}-text-uncontrolled`
  const textInputControlled = `${id}-text-controlled`

  return (
    <main className="p-8">
      <h1 className="text-3xl mb-4">Data Binding</h1>

      <pre className="p-4 mb-4 bg-slate-50">Value: </pre>
      <form className="w-1/3">
        <fieldset className="p-4 rounded-md border border-gray-200">
          <legend className="text-gray-500 font-serif">
            Uncontrolled Text Input
          </legend>
          <label htmlFor={textInputUncontrolled}>Uncontrolled Input:</label>
          <input
            id={textInputUncontrolled}
            className="rounded-md border border-gray-300 ml-2"
            type="text"
          />
        </fieldset>
      </form>
      <p className="p-4 text-gray-500 text-sm">
        No way data binding 😂. React does not handle it. The user agent
        (browser) does...
      </p>
      <br></br>

      <pre className="p-4 mb-4 bg-slate-50">Value: </pre>
      <form className="w-1/3">
        <fieldset className="p-4 rounded-md border border-gray-200">
          <legend className="text-gray-500 font-serif">
            Controlled Text Input
          </legend>
          <label htmlFor={textInputControlled}>Controlled Input:</label>
          <input
            id={textInputControlled}
            className="rounded-md border border-gray-300 ml-2"
            type="text"
            value={oneWayDataBinding}
            readOnly // <- needed since the presence of the value attribuite requires also the onChange handler
          />
        </fieldset>
      </form>
      <p className="p-4 text-gray-500 text-sm">
        One-way data binding. Since the state does not change, the input will
        not change either.
      </p>
      <br></br>

      <pre className="p-4 mb-4 bg-slate-50">Value: {value}</pre>
      <form className="w-1/3">
        <fieldset className="p-4 rounded-md border border-gray-200">
          <legend className="text-gray-500 font-serif">
            Controlled Text Input
          </legend>
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
      <p className="p-4 text-gray-500 text-sm">
        Two-way data binding. The state is updated when the input is edited. The
        state update triggers a re-render. The newly updated value goes into the
        input.
      </p>
      <br></br>
    </main>
  )
}
