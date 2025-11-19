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
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(p => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons([...persons].concat({ name: newName, number: newNumber }))
    }
  }

  const filterPeople=(f) => {
    return persons.filter(p => p.name.toLowerCase().includes(f))
  }

  const shownPeople = filterPeople(newFilter.toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(event)=>{event.preventDefault()}}>
        filter shown with: <input onChange={event=>setFilter(event.target.value)}/>
      </form>

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
      <List elements={shownPeople} />
    </div>

  )
}

export default App