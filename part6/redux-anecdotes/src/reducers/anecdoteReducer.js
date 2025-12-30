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

const reducer = (state = initialState, action) => {

  const payload = action.payload

  switch (action.type) {
    case "VOTE":{
      const current = state.find(anecdote => anecdote.id == payload.id)
      const updatedAnecdote = {...current,votes:current.votes + 1}
      const newState = state.map(i => i.id==payload.id?updatedAnecdote:i)
      return sortByVotes(newState)
    }
    case "CREATE":{
      const newState = state.concat(asObject(payload.content))
      return sortByVotes(newState)
    }
    default:
      return sortByVotes(state)
  }
}

const sortByVotes = (state) => {
  console.log("sorting by votes")
  return state.sort((a,b)=>b.votes-a.votes)
}

export const voteForId = (id) => {
  return {
      type: "VOTE",
      payload: {
        id: id
      }
  }
}

export const createNewAnecdote = (content) => {
  return {
      type: "CREATE",
      payload: {
        content: content
      }
  }
}

export default reducer
