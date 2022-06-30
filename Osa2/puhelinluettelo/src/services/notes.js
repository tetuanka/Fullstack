import axios from 'axios'
const baseUrl = '/api/persons'

const create = newObject => {
    return axios.post(baseUrl, newObject)
  }

export default create