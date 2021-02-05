import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000"

const clientUsers = axios.create({
  baseURL: 'http://localhost:5000/users',
  headers: {
    'content-type': 'application/json'
  }

})

const clientTasks = axios.create({
  baseURL: 'http://localhost:5000/tasks',
  headers: {
    'content-type': 'application/json'
  }

})



const client = axios.create({
  headers: {
    'content-type': 'application/json'
  }


})



export { clientTasks, clientUsers, client }