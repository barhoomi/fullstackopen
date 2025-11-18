import { useState } from 'react'

const Button = ({callback, text}) => {
  return (
    <button onClick={callback}>{text}</button>
  )
}

const StatisticLine = ({value, text}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total})=>{
  const output = <h1>statistics</h1>
  if(total>0){
    return (
      <div>
        {output}
        <table>
          <tbody>
            <StatisticLine value={good} text="good"/>
            <StatisticLine value={neutral} text="neutral"/>
            <StatisticLine value={bad} text="bad"/>

            <StatisticLine value={total} text="all"/>
            <StatisticLine value={(good-bad)/total} text="average"/>
            <StatisticLine value={((good/total)*100)+" %"} text="positive"/>
          </tbody>
        </table>
      </div>
    )
  }
  else{
    return(
      <div>
        {output}
        <p>No feedback given</p>
      </div>
    )
  }
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  const increment = (callback,current,i) => {
    return ()=>{callback(current+i)}
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button callback={increment(setGood,good,1)} text="good"/>
        <Button callback={increment(setNeutral,neutral,1)} text="neutral" />
        <Button callback={increment(setBad,bad,1)} text="bad" />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App