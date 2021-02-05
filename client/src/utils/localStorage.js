const LOCAL_STORAGE_AUTH_TOKEN = 'taskmanager-auth'

export const login = (user) => {
  localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN, JSON.stringify(user))
}

export const logout = () => {
  localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN, null)

}


export const getAuthenticatedUser = () => {

  try {
    const localStorageUser = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN)
    if (!localStorageUser) return
    return JSON.parse(localStorageUser)
  } catch (e) {
    return
  }
}

/*
{
  "user": {
      "age": 0,
      "_id": "600a72e06728107e38a6a541",
      "name": "test1",
      "email": "test1@test.com",
      "createdAt": "2021-01-22T06:38:24.474Z",
      "updatedAt": "2021-01-27T07:20:09.531Z",
      "__v": 73
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBhNzJlMDY3MjgxMDdlMzhhNmE1NDEiLCJpYXQiOjE2MTE3MzIwMDl9.nv2kaxMK-4uV10JkjMHo8gr6AqTSIOXcFMV4pmIKthE"
}
*/