import { createSlice, current } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    createNewAnecdote(state, action) {
      const newState = state.concat(asObject(action.payload))
      return sortByVotes(newState)
    },
    voteForId: {
      // 1. The reducer handles the state change
      reducer(state, action) {
        const { id } = action.payload // Destructure the id from our custom payload
        const anecdoteToChange = state.find(n => n.id === id)
        const changedAnecdote = { 
          ...anecdoteToChange, 
          votes: anecdoteToChange.votes + 1 
        }
        const newState = state.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote
        )
        return sortByVotes(newState)
      },
      // 2. The prepare function formats the payload
      prepare(id, content) {
        return {
          payload: { id, content }
        }
      }
    }
  }
})


const sortByVotes = (state) => {
  return state.sort((a, b) => b.votes - a.votes)
}


export const { createNewAnecdote, voteForId } = anecdoteSlice.actions
export default anecdoteSlice.reducer
