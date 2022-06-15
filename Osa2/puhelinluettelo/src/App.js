import { useState } from 'react'
import Person from './components/Person'
import Add from './components/Add'
import ShowNumbers from './components/ShowNumbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterName, setNewFilter] = useState('')

  const namesToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleNameFilter = (event) => {
    setNewFilter(event.target.value)
    setShowAll(false)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name : newName, 
      number : newNumber
    }
    for(let i=0; i<persons.length; i++){
      if (persons[i].name === newName){
        window.alert(`${newName} is already added to phonebook`)
        return
      }
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    console.log('name added', event.target)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
          <input 
            value={filterName}
            onChange={handleNameFilter}
          />
        <form onSubmit={addName}>
        <div>
          <h2>Add a new</h2>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
          </div>
          <div>
          number: 
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <Add/>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowNumbers namesToShow={namesToShow}/>
    </div>
  )

}

export default App
