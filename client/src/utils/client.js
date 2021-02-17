import axios from "axios";

//axios.defaults.baseURL = "http://localhost:5000" // for local dev
axios.defaults.baseURL = "/"    //for Kubernetes


const client = axios.create({
  headers: {
    'content-type': 'application/json'
  }


})


export {

  client
}