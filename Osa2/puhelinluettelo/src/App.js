import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Add from './components/Add'
import ShowNumbers from './components/ShowNumbers'
import nameService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
  <div className="notification">
    {message}
  </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
  <div className="error">
    {message}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterName, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    nameService
      .getAll()
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

  const handleRemove = (props) => {
    if(window.confirm(`Delete ${props.name}?`)) {
      nameService
        .update(props.id)
        setNotificationMessage(
          `Deleted ${props.name} `
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
    }
    nameService
    .getAll()
    .then(response => {
    setPersons(response.data)
    })
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name : newName, 
      number : newNumber
    }
    for(let i=0; i<persons.length; i++){
      if (persons[i].name === newName){
        if( window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){ 
          const changeNumber = { ...persons[i], number : newNumber}
          nameService
            .change(persons[i].id, changeNumber)
            .catch(error => {
              setNotificationMessage(null)
              console.log(newNumber)
              setErrorMessage(
                `${error.response.data.error}`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 4000)
            })
            setNotificationMessage(
              `Changed ${newName}'s number`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 4000)
          setNewName('')
          setNewNumber('')}
        return
      }
    }

    nameService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
      .catch(error => {
        console.log(error.response.data)
        setNotificationMessage(null)
        setErrorMessage(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
      setNotificationMessage(
        `Added ${newName} `
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 4000)

      setNewName('')
      setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
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
      <ShowNumbers namesToShow={namesToShow} handleRemove={handleRemove}/>
    </div>
  )

}

export default App
