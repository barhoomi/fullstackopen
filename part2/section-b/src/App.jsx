import { useState } from "react"
import Note from './components/Note'

const Notes = ({ notes }) => {
    return (
        <ul>
            {notes.map((note) => (
                <Note key={note.id} note={note} />
            ))}
        </ul>
    )
}

const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState("")
    const [showAll, setShowAll] = useState(true)

    const notesToShow = showAll ? notes : notes.filter(n => n.important)

    const createNote = (n) => {
        const out = {
            id: notes.length + 1,
            content: n,
            important: false
        }
        //console.log(out)
        return out
    }



    const addNote = (event) => {
        event.preventDefault()
        //console.log('button clicked', event.target)
        const newNotes = [...notes]
        newNotes.push(createNote(newNote))
        setNotes(newNotes)
        setNewNote("")
        //console.log(newNotes)
    }


    const handleNoteChange = (event) => {
        //console.log(event.target.value)
        setNewNote(event.target.value)
    }

    const toggleShowAll = (event) => {
        event.preventDefault()
        console.log("toggling")
        setShowAll(!showAll)
    }

    return (
        <div>
            <h1>Notes</h1>
            <button onClick={toggleShowAll}>{showAll ? "show only important" : "show all notes"}</button>

            <Notes notes={notesToShow} />

            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>

        </div>
    )
}

export default App