import { useDispatch } from "react-redux"
import { useState } from "react"
import { createNewAnecdote } from "../reducers/anecdoteReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const [formValue, setFormValue] = useState("")
    const dispatch = useDispatch()

    const handleFormSubmission = async (e) => {
        setFormValue("")
        e.preventDefault()

        const newAnecdote = await anecdoteService.createNew(formValue)
        dispatch(createNewAnecdote(newAnecdote))
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