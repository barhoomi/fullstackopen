import Anecdotes from "./components/Anecdotes"
import { useState } from "react"
import { createNewAnecdote } from "./reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import CreationForm from "./components/CreationForm"

const App = () => {
  const [formValue, setFormValue] = useState("")
  const dispatch = useDispatch()

  const handleFormSubmission = (e) => {
    e.preventDefault()
    dispatch(createNewAnecdote(formValue))
    setFormValue("")
  }
  return (
    <div>
      <Anecdotes />
      <CreationForm />
    </div>
  )
}

export default App
