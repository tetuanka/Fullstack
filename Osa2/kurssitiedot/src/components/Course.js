const Course = (props) => {

    const Total = (props) => {
      const sum = 0
      const exs = props.course.parts.map(part => part.exercises)
      const total = exs.reduce( 
        (previousValue, currentValue) => previousValue + currentValue,
      sum)
      return ( 
      <strong>total of {total} exercises</strong>
      )
    }
  
    return (
    <div>
      {props.course.map(course =>
        <div key={course.id}>
          <h1>{course.name}</h1> 
          <div>{course.parts.map(part => 
            <p key={part.id}>{part.name} {part.exercises} 
            </p>)
            }
          </div>
          <Total course={course}/>
        </div>
        )}    
      </div>
    )
  }

  export default Course