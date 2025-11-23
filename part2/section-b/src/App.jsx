import { useState, useEffect } from "react"
import Note from './components/Note'
import noteService from './services/notes'
import Notification from "./components/Notification"
import Footer from "./components/Footer"

const Notes = ({ notes, toggleImportance }) => {
    return (
        <ul>
            {notes.map((note) => (
                <Note key={note.id} note={note} toggleImportance={toggleImportance} />
            ))}
        </ul>
    )
}


const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState("")
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    const loadNotes = () => {
        noteService.getAll()
            .then(n => {
                setNotes(n)
            })
    }

    useEffect(loadNotes, [])



    const notesToShow = showAll ? notes : notes.filter(n => n.important)

    const createNote = (n) => {
        const out = {
            content: n,
            important: false
        }
        return out
    }

    const addNote = (event) => {
        event.preventDefault()
        noteService.create(createNote(newNote))
            .then(n => {
                setNotes(notes.concat(n))
                setNewNote('')
            })
    }

    const toggleShowAll = (event) => {
        event.preventDefault()
        console.log("toggling")
        setShowAll(!showAll)
    }

    const toggleImportance = (note) => {
        const changedNote = { ...note, important: !note.important }
        noteService.update(note.id, changedNote).then(loadNotes)
            .catch(error => {

                setErrorMessage(`Note '${note.content}' was already removed from server`)
                setTimeout(() => { setErrorMessage(null) }, 5000)
                setNotes(notes.filter((n) => n.id !== note.id))
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <button onClick={toggleShowAll}>{showAll ? "show only important" : "show all notes"}</button>

            <Notes notes={notesToShow} toggleImportance={toggleImportance} />

            <form onSubmit={addNote}>
                <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                <button type="submit">save</button>
            </form>

            <Notification message={errorMessage} />
            <Footer/>

        </div>
    )
}

export default App