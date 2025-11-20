import { useState, useEffect } from 'react'
import personsService from './services/persons'

const DeleteButton = ({ id, setPersons }) => {
  const handeDeletion = () => {
    const c = window.confirm(`are you sure you want to delete user ${id}?`)
    if(c){
      personsService.deletePerson(id)
      .then(s => personsService.getPersons().then(p => setPersons(p)))
    }
  }
  return (
    <button onClick={handeDeletion}>Delete</button>
  )
}

const Persons = ({ elements, setPersons }) => {
  return (
    <ul>
      {elements.map(e => <li key={e.name}>{e.name} {e.number} <DeleteButton id={e.id} setPersons={setPersons} /></li>)}
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

    const getPersons = () => {
      personsService.getPersons().then(p => setPersons(p))
    }


    const repeatName = persons.filter(p => p.name === newName)
    console.log(repeatName)
    if (repeatName.length > 0) {
      
      if(newNumber === repeatName[0].number){
        alert(`${newName} is already added to phonebook`)
      }
      else{
        const updateNumber = window.confirm(`user already exists, update number?`)
        if(updateNumber){
          personsService.updateNumber(repeatName[0],newNumber)
          .then(p => getPersons())
        }
        return 0
      }
    }
    else {
      personsService.addPerson(newName, newNumber)
        .then(p => setPersons(persons.concat(p)))
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const getPersons = () => {
    personsService.getPersons().then(p => setPersons(p))
  }

  useEffect(getPersons, [])

  const filterPeople = (f) => {
    console.log(f)
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

      <Persons elements={shownPeople} setPersons={setPersons} />
    </div>

  )
}

export default App