const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  let output = props.parts.map((part,index) => {
    return <Part part={part.name} exercises={part.exercises} key={index}/>
  });
  return (
    <div className="content">
      {output}
    </div>
  )
}

const Part = (props) => {
  return (
    <div className="part">
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}


const Total = (props) => {
  let total = 0;
  props.values.forEach(element => {
    total += element;
  });
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
     <div>
      <Header course={course} />
      <Content parts={[part1,part2,part3]} />
      <Total values={[part1.exercises,part2.exercises,part3.exercises]} />
    </div>
  )
}


export default App