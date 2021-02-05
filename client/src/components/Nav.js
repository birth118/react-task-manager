import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { LOG_IN, LOG_OUT, useAuth } from '../context'
import { auth } from "../utils";



const Nav = ({ children }) => {
  const { isAuthenticated, user, dispatch
  } = useAuth()

  React.useEffect(() => {
    let isCurrent = true
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      const user = auth.getAuthenticatedUser()
      console.log(user);
      if (user && isCurrent) {
        dispatch({ type: LOG_IN, payload: user })
      }

    }

    return () => {
      isCurrent = false
    }
  }, [isAuthenticated, dispatch])


  //console.log(isAuthenticated);


  const onLogoutClick = (params) => {

    auth.logout().then(() => {
      //  dispatch({ type: LOG_OUT, payload: null })
    }).catch()
    dispatch({ type: LOG_OUT, payload: null })

  }

  //const userToken = localStorage.getItem('task-manager-current-user')
  return (
    <div>
      <nav className="navbar bg-dark">

        {!isAuthenticated ?
          <Fragment>
            <h1>
              <Link to="/"><i class="fas fa-tasks"></i> Task Manager</Link>
            </h1>
            <ul>
              <li><Link to="/users/register">Register</Link></li>
              <li><Link to="/users/login">Login</Link></li>
            </ul>

          </Fragment>

          :

          <Fragment>
            <h1>
              <Link to="/tasks"><i class="fas fa-tasks"></i> Task Manager</Link>
            </h1>
            <ul>
              <li><Link to="/tasks">Tasks</Link></li>
              <li><Link to="/users/me"><i className="fas fa-user-circle"></i></Link></li>
              <li>
                <a onClick={onLogoutClick} href='#!'>
                  Logout
              </a>
              </li>
            </ul>
          </Fragment>
        }


      </nav>
    </div>
  )
}

export default Nav
