const Person = ({ person, handleRemove }) => {
    return (
      <li>{person.name} {person.number} 
      <button onClick={() => handleRemove(person)}> delete</button>
      </li>
    )
  }
export default Person