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

export default Course