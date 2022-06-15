import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Add from './components/Add'
import ShowNumbers from './components/ShowNumbers'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterName, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
