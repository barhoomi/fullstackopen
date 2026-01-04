import { useSelector, useDispatch } from 'react-redux'
import { setVotes, voteForId } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(setVotes(anecdote.id, anecdote.votes+1, anecdote.content))
    }

    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div>
            {
                filteredAnecdotes.map(anecdote => (
                    <Anecdote key={anecdote.id} anecdote={anecdote} />
                ))
            }
        </div>
    )
}

export default AnecdoteList