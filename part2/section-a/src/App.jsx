const Header = ({course}) => {
  return (
    <h2>{course}</h2>
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
  const total = parts.reduce((s,p) => s+p.exercises, 0)

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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(
    <div>
        <h1>Web Development Curriculum</h1>
        {courses.map((c)=>
            <div key={c.id}>
                <Course course={c}/>
            </div>
        )}
    </div>
  )
}


export default App