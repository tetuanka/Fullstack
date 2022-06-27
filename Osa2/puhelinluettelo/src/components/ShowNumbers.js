import Person from './Person'

const ShowNumbers = (props) => {
  const names = props.namesToShow
  const handle = props.handleRemove
    return ( 
    <ul>
    {names.map(person =>
      <Person key={person.name} person={person} handleRemove={handle}/>
    )}
  </ul>
    )
  }

export default ShowNumbers