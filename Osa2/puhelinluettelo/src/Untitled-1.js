import Person from './components/Person'

const ShowNumbers = () => {
    return ( 
    <ul>
    {namesToShow.map(person =>
      <Person key={person.name} person={person} />
    )}
  </ul>
    )
  }

export default ShowNumbers