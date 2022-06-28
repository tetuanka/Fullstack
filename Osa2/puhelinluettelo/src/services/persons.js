import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = newObject => {
    return axios.post(baseUrl, newObject)
  }

const getAll = () => {
    return axios.get(baseUrl)
  }

const update = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
  }

const change = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {create, getAll, update, change}