import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteFilter from "./components/AnecdoteFilter"
import Notification from './components/Notification'

const
 App = () => {
  return (
    <div>
      <Notification/>
      <AnecdoteFilter />
      <h1>Anecdotes</h1>
      <AnecdoteList />
      <h2>Create new anecdote</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
