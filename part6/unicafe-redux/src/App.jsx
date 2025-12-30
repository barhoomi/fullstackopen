import {useSelector, useDispatch} from "react-redux"

const App = () => {
    const store = useSelector(state => state)
    const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={() => dispatch({ type: 'OK' })}>ok</button>
      <button onClick={() => dispatch({ type: 'BAD' })} >bad</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>reset stats</button>
      <div>good {store.good}</div>
      <div>ok {store.ok}</div>
      <div>bad {store.bad}</div>
    </div>
  )
}


export default App