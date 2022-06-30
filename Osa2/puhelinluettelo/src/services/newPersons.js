import axios from 'axios'
const baseUrl = '/api/persons'

const create = newObject => {
    return axios.post(baseUrl, newObject)
  }

const getAll = () => {
    return axios.get(baseUrl)
  }

export default {create, getAll}