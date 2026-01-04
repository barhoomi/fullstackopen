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
    createNew(state, action) {
      const newState = state.concat(action.payload)
      return sortByVotes(newState)
    },
    voteForId: {
      // 1. The reducer handles the state change
      reducer(state, action) {
        console.log(action.payload)
        const { id, votes, content } = action.payload // Destructure the id from our custom payload
        const changedAnecdote = { 
          id: id,
          content: content,
          votes: votes 
        }
        const newState = state.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote
        )
        return sortByVotes(newState)
      }
    },
    setAnecdotes(state,action){
      return sortByVotes(action.payload)
    }
  }
})

const {setAnecdotes, createNew} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(createNew(newAnecdote))
  }  
}

export const setVotes = (id,votes,content) => {
  return async (dispatch) => {
    const vote = await anecdoteService.setVotes(id,votes,content)
    console.log(vote)
    dispatch(voteForId(vote))
  }
}


const sortByVotes = (state) => {
  return state.sort((a, b) => b.votes - a.votes)
}


export const { voteForId } = anecdoteSlice.actions
export {createNew}
export default anecdoteSlice.reducer
