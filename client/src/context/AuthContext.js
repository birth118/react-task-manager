import React from 'react'
import { LOG_IN, LOG_OUT } from './events'


export const AuthContext = React.createContext()

const initialState = {
  isAuthenticated: false,
  user: null
}

export const AuthProvider = ({ children }) => {

  //const [currentUser, setCurrentUser] = React.useState(null)

  const [state, dispatch] = React.useReducer((state, action) => {
    // console.log(action);
    if (action.type === LOG_IN) {
      return { ...state, isAuthenticated: true, user: action.payload }
    } else if (action.type === LOG_OUT) {
      return { ...state, isAuthenticated: false, user: action.payload }
    } else {
      return state
    }
  }, initialState)

  const context = {
    ...state,
    dispatch
  }
  return (
    <AuthContext.Provider value={context} children={children} />
  )
}

export const useAuth = () => {
  return React.useContext(AuthContext)
}

