import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { NotificationContextProvider } from './NotificationContext'
import Anecdotes from './components/Anecdotes'


const App = () => {


  return (
    <NotificationContextProvider>

      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm/>

        <Anecdotes />
      </div>
    </NotificationContextProvider>
  )
}

export default App
