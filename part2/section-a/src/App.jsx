const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = ({parts}) => {
  let output = parts.map((part, index) => {
    return <Part part={part.name} exercises={part.exercises} key={index} />
  });
  return (
    <div className="content">
      {output}
    </div>
  )
}

const Part = ({part,exercises}) => {
  return (
    <div className="part">
      <p>{part} {exercises}</p>
    </div>
  )
}


const Total = ({parts}) => {
  const exercises = parts.map(p => p.exercises)
  let total = 0;
  exercises.forEach(element => {
    total += element;
  });
  return (
    <p>Total of {total} exercises</p>
  )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course = {course.name}/>
            <Content parts = {course.parts} />
            <b><Total parts = {course.parts} /></b>
        </div>
    )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}


export default App