import { useState } from 'react'

const Persons = ({ elements }) => {
  return (
    <ul>
      {elements.map(e => <li key={e.name}>{e.name} {e.number}</li>)}
    </ul>
  )
}

const SearchFilter = ({ setFilter }) => {
  return (
    <form onSubmit={(event) => { event.preventDefault() }}>
      filter shown with: <input onChange={event => setFilter(event.target.value)} />
    </form>
  )
}

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }) => {
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


  const filterPeople = (f) => {
    return persons.filter(p => p.name.toLowerCase().includes(f))
  }

  const shownPeople = filterPeople(newFilter.toLowerCase())

  return (
    <div>
      <h2>Phonebook</h2>
      
      <SearchFilter setFilter={setFilter} />
      
      <PersonForm newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons} />
        
      <h2>Numbers</h2>
      
      <Persons elements={shownPeople} />
    </div>

  )
}

export default App