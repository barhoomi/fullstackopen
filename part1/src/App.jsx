import { useState } from 'react'

const App = () => {

  
  const [ counter, setCounter ] = useState(100)

  const buildings = [
    {
      base: 1,
      amount: 1,
      mult: 1,
      speed: 1000,
      calc: function(){
        return this.base * this.amount * this.mult
      },
      added: false
    },
    {
      base: 2,
      amount: 2,
      mult: 1,
      speed: 2000,
      calc: function(){
        return this.base * this.amount * this.mult
      },
      added: false
    }
  ]

  buildings.forEach(building => {
    if(building.added == true) return 0
    setTimeout(
      () => setCounter(counter+building.calc()),
      building.speed
    )
    building.added = true
  })


  return (
    <div>{counter}</div>
  )
}

export default App