import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const [selected, setSelected] = useState(0)

  const highest = getHighestVotes(votes)

  function getRandomInt(max) {
    //non-inclusive of max
    const n = Math.floor(Math.random() * max);
    //console.log(n)
    return n
  }

  function getHighestVotes(votes){
    let out = 0
    for (let i = 0; i < votes.length; i++) {
      const element = votes[i];
      const h = votes[out]
      if(element>h){
        out = i
      }
    }
    return out
  }

  return (
    <div>
      <div>
        <h1> Highest voted anecdote </h1>
        "{anecdotes[highest]}"
        <br></br>
        has <b>{votes[highest]}</b> votes
      </div>
      <hr></hr>
      <div>
        <h1> Random Andecdote</h1>
        {anecdotes[selected]}
        <br></br>
        has <b>{votes[selected]}</b> votes
        <br></br>
        <button onClick={() => {
          const newVotes = [...votes]
          newVotes[selected] += 1
          setVotes(newVotes)
        }}>vote</button>
        <button onClick={() => setSelected(getRandomInt(anecdotes.length))}>next anecdote</button>
      </div>
    </div>
  )
}

export default App