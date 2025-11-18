import { useState } from 'react'

const Button = ({callback, text}) => {
  return (
    <button onClick={callback}>{text}</button>
  )
}

const Display = ({state, text}) => {
  return (
    <p>{text} {state}</p>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad


  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button callback={()=>{
          setGood(good+1)
          }} text="good" />
        <Button callback={()=>{
        setNeutral(neutral+1)
        }} text="neutral" />
        <Button callback={()=>{
        setBad(bad+1)
        }} text="bad" />
      </div>
      <h1>statistics</h1>
      <div>
        <Display state={good} text="good"/>
        <Display state={neutral} text="neutral"/>
        <Display state={bad} text="bad"/>

        <Display state={total} text="all"/>
        <Display state={(good-bad)/total} text="average"/>
        <Display state={((good/total)*100)+" %"} text="positive"/>
      </div>
    </div>
  )
}

export default App