import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

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
      const newState = state.concat(action.payload)
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
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})

const {setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}


const sortByVotes = (state) => {
  return state.sort((a, b) => b.votes - a.votes)
}


export const { createNewAnecdote, voteForId } = anecdoteSlice.actions
export default anecdoteSlice.reducer
