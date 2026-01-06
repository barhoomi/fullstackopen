import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNewAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    notificationDispatch({ type: "ADD", payload: { content: content } })

    event.target.anecdote.value = ''
    const result = newAnecdoteMutation.mutate({ content: content, votes: 0 })
    setTimeout(() => notificationDispatch({ type: "RESET" }), 3000)
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
    onError: (error) => notificationDispatch({ type: "SET", payload: error})
  })

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
