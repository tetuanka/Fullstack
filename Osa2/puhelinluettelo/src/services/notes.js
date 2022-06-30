import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const create = newObject => {
    return axios.post(baseUrl, newObject)
  }

export default create