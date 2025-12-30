import { useDispatch } from "react-redux"
import { useState } from "react"
import { createNewAnecdote } from "../reducers/anecdoteReducer"


const AnecdoteForm = () => {
    const [formValue, setFormValue] = useState("")
    const dispatch = useDispatch()

    const handleFormSubmission = (e) => {
        e.preventDefault()
        dispatch(createNewAnecdote(formValue))
        setFormValue("")
    }
    return (
        <form onSubmit={(e) => handleFormSubmission(e)}>
            <div>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
            </div>
            <button>create</button>
        </form>
    )
}


export default AnecdoteForm