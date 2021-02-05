import React from 'react'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers = { 'content-type': 'application/json' };


export const useRequest = ({ method = 'get', body, url, headers, onSuccess }) => {

  const [errors, setErrors] = React.useState([])

  const doRequest = async (props = {}) => {

    try {
      setErrors([])
      const resp = await axios[method](url, { ...body, headers: { ...headers } })
      // See the calling exmaple below

      if (onSuccess) {        // just consider the case onSuccess argument is not provided 
        onSuccess(resp.data)  // just we need something 'defined' to pass 
      }
      return resp.data

    } catch (err) {
      setErrors(
        err.response.data.errors.map(error => error.message)
      )
      // console.log(err.response.data.errors)

    }

  }

  return { doRequest, errors }
}

/*
***** Calling Example

doReq({
  url: '/users/login',
  method: 'post',
  body: {
    email: "test1@test.com",
    password: "MyPass777"
  },
  onSuccess: (data) => {
    const tok = data.token
    console.log(tok);

    doReq({
      url: '/users/me',
      method: 'get',
      headers: {
        'Authorization': `Bearer ${tok}`
      },
      onSuccess: (data) => {

        console.log(data);
      }
    })

    doReq({
      url: '/tasks',
      method: 'get',
      headers: {
        'Authorization': `Bearer ${tok}`
      },
      onSuccess: (data) => {

        console.log(data);
        const id = data.id

        doReq({
          url: `/tasks/600b61e95c33310013120653`,
          method: 'get',
          headers: {
            'Authorization': `Bearer ${tok}`
          },
          onSuccess: (data) => { console.log(data); }
        })
      }
    })

  }
})
 */