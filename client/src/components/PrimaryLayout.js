import React from 'react'

import {
  BrowserRouter,
  Route,
  // Router,
  Switch,
  // Redirect,
  // useHistory

} from 'react-router-dom'

import {
  LOG_IN,
  useAuth,
  // AuthProvider
} from "../context";

import Landing from './Landing';
import Nav from "./Nav";

import Login from "./users/Login";
// import Logout from "./users/Logout";
import Register from "./users/Register";
import Profile from "./users/Profile";
import { Tasklists } from "./tasks/task-list";



// import { loadUser } from '../utils/loadUser'

//import PrivateRoute from "../routing/private-route";


export const PrimaryLayout = () => {

  //const history = useHistory()

  const { dispatch } = useAuth()

  return (
    <div>
      < BrowserRouter>

        {/*         <Router history={history}> */}
        <Nav />

        <Switch>
          <Route exact path="/users/register" >
            <Register onAuthenticated={(user) => {
              dispatch({ type: LOG_IN, payload: user })
            }} />
          </Route>

          <Route exact path="/users/login">
            <Login onAuthenticated={(user) => {
              dispatch({ type: LOG_IN, payload: user })

            }} />
          </Route>


          {/* <Route exact path="/users/logout" component={Logout} /> */}
          <Route exact path="/tasks" component={Tasklists} />

          {/* <PrivateRoute exact path='/users/me' user={user}>
            <Profile />
          </PrivateRoute > */}
          <Route exact path="/users/me">
            <Profile />
          </Route>




        </Switch>
        <Route exact path='/' component={Landing} />
        {/*         </Router> */}

      </BrowserRouter>
    </div>
  )
}


