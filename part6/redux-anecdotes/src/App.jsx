import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteFilter from "./components/AnecdoteFilter"
import Notification from './components/Notification'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAnecdotes } from "./reducers/anecdoteReducer"
import anecdoteService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const results = async () => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
    }
    results()
  },[dispatch])

  return (
    <div>
      <Notification />
      <AnecdoteFilter />
      <h1>Anecdotes</h1>
      <AnecdoteList />
      <h2>Create new anecdote</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
