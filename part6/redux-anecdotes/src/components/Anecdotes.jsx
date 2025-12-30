import { useSelector, useDispatch } from 'react-redux'
import { voteForId } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {

    const dispatch = useDispatch()

    const vote = id => {
        dispatch(voteForId(id))
    }

    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
    )
}

const Anecdotes = () => {
    const anecdotes = useSelector(state => state)

    return (
        <div>
            <h2>Anecdotes</h2>
            {
                anecdotes.map(anecdote => (
                    <Anecdote key={anecdote.id} anecdote={anecdote} />
                ))
            }
        </div>
    )
}

export default Anecdotes