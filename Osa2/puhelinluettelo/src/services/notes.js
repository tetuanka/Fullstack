import axios from 'axios'
const baseUrl = 'https://shrouded-sea-58094.herokuapp.com/api/persons'

const create = newObject => {
    return axios.post(baseUrl, newObject)
  }

export default create