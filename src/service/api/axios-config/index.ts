import axios from 'axios'

const Api = axios.create({
  baseURL: 'http://192.168.0.182:3333'
})

export { Api }