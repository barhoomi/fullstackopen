import { useState } from 'react'

const List = ({ elements }) => {
  return (
    <ul>
      {elements.map(e => <li key={e.name}>{e.name} {e.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons([...persons].concat({ name: newName, number: newNumber }))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          number: <input onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>



      <h2>Numbers</h2>
      <List elements={persons} />
    </div>

  )
}

export default App