import { useState } from 'react'

const List = ({elements}) => {
  return (
    <ul>
      {elements.map(e => <li key={e.name}>{e.name}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event)=>{
    event.preventDefault()
    setPersons([...persons].concat({name:newName}))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={(event)=>setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <List elements={persons} />
      <div>debug: {newName}</div>
    </div>
    
  )
}

export default App