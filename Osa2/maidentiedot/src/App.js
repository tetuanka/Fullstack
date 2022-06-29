import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filterName, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      //http://localhost:3001/countries
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = showAll
  ? countries
  : countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase()))
  

  const handleNameFilter = (event) => {
    setNewFilter(event.target.value)
    setShowAll(false)
  }

  const Country = ({ country }) => {
    return (
      <li>{country} <button onClick={() => setNewFilter(country) }> show </button> </li>
    )
  }

  const Lang = ({ lang }) => {
    return (
      <li>{lang}</li>
    )
  }

  const ShowC = () => {
    console.log("kkk")
    return(
      <div>
        koira
        <p>koira</p>
      </div>
    )
  }

  const ShowCountry = () => {
    console.log("kk")
    console.log(countriesToShow[0])
  return (
  <div>
          <h1>{countriesToShow[0].name.common}</h1>
          <p>capital {countriesToShow[0].capital}</p>
          <p>area {countriesToShow[0].area}</p>
          <h2>languages:</h2>
          <ul>
          {Object.values(countriesToShow[0].languages).map(lang =>
          <Lang key={lang} lang={lang}/>)}
          </ul>
          <img src={countriesToShow[0].flags.png} />
        </div>
  )}

  const CountryList = (props) => {
    if(props.countriesToShow.length>10){
      return(
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )
    }
    if(props.countriesToShow.length===1){
      return(
        <ShowCountry />
      )
    }
    return ( 
      <div>
      <ul>
      {props.countriesToShow.map(country =>
        <Country key={country.name.common} country={country.name.common} />
      )}
      
    </ul>
    </div>
      )
  }

 return (
    <div>
      find countries
          <input 
            value={filterName}
            onChange={handleNameFilter}
          />
      <CountryList countriesToShow={countriesToShow}/>
      
    </div>
  )

}

export default App

