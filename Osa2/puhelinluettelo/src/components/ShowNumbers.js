import Person from './Person'

const ShowNumbers = (props) => {
    return ( 
    <ul>
    {props.namesToShow.map(person =>
      <Person key={person.name} person={person} />
    )}
  </ul>
    )
  }

export default ShowNumbers