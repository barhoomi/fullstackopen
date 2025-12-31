import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteFilter from "./components/AnecdoteFilter"


const
 App = () => {
  return (
    <div>
      <AnecdoteFilter />
      <h1>Anecdotes</h1>
      <AnecdoteList />
      <h2>Create new anecdote</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App
