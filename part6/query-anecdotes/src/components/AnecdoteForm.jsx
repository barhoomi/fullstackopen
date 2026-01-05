import {useMutation, useQueryClient} from '@tanstack/react-query'
import { createNewAnecdote } from '../requests'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content:content,votes:0})
  }

  const newAnecdoteMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: queryClient.invalidateQueries({queryKey:['anecdotes']})
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
