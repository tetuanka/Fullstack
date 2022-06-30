import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const create = newObject => {
    return axios.post(baseUrl, newObject)
  }

const getAll = () => {
    return axios.get(baseUrl)
  }

export default {create, getAll}