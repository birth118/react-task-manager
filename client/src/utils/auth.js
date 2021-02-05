
import { client } from "./client";
import * as storage from './localStorage'

export const login = async (email, password) => {
  try {
    const { data } = await client.post('/users/login', {
      email, password
    })
    //  console.log(data);
    storage.login(data)
    return data
    //return Promise.resolve(data)
  } catch (err) {
    return Promise.reject('User Not Found')
    //throw new Error('User Not Found')
  }

}

export const getAuthenticatedUser = () => {
  const user = storage.getAuthenticatedUser()
  //console.log(user);
  return user
  //return Promise.resolve(user)
}

export const logout = async () => {

  const user = storage.getAuthenticatedUser()
  // const headers = {
  //   'Authorization': `Bearer ${user.token}`
  // }
  // console.log(user);
  try {
    storage.logout()

    await client.post('/users/logout', {}, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    })

  } catch (err) {
    return Promise.reject('Logout failed')
  }

}


export const register = async (email, name, password) => {
  try {
    const { data } = await client.post('/users/', {
      email, password, name
    })
    console.log(data);
    storage.login(data)
    return data
    //return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err.response)
    //throw new Error('User Not Found')
  }

}
export const authHeader = () => {
  const user = getAuthenticatedUser()
  return { 'Authorization': `Bearer ${user.token}` }
}

// {
//   "user": {
//       "age": 0,
//       "_id": "601298d2eb428a3ffef32fe5",
//       "name": "test2",
//       "email": "test2@test.com",
//       "createdAt": "2021-01-28T10:58:26.063Z",
//       "updatedAt": "2021-01-28T10:58:26.344Z",
//       "__v": 1
//   },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDEyOThkMmViNDI4YTNmZmVmMzJmZTUiLCJpYXQiOjE2MTE4MzE1MDZ9.Dyr2MmezQsCvSZefEgvHngiRVGjdrnGXevDiSlQNryI"
// }