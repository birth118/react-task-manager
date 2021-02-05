import React from 'react'
import { Link, Redirect } from 'react-router-dom'
// import { useRequest } from "../../hooks/use-request";
// import Alerts from "../Alerts";
import { auth } from "../../utils";
import { useAuth } from '../../context/AuthContext'

const Login = ({ history, onAuthenticated }) => {


  const { isAuthenticated } = useAuth()
  // if (isAuthenticated) {
  //   history.push('/tasks')
  // }

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')


  const onFormSubmit = (e) => {
    e.preventDefault()
    // doRequest()
    auth.login(email, password).then((user) => {
      onAuthenticated(user)
      // console.log(user);
    }).catch(err => {
      console.log(err);
      setError(err)
    })
  }


  return (
    <div>
      {isAuthenticated && <Redirect to='/tasks' />}
      <section class="container">
        {/* <div class="alert alert-danger">
          Invalid credentials
      </div> */}
        <h1 class="large text-primary">Sign In</h1>
        <p class="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
        <form class="form" onSubmit={onFormSubmit} >
          <div class="form-group">
            <input
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              type="email"
              placeholder="Email Address"
              name="email"
              required
            />
          </div>
          <div class="form-group">
            <input
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              type="password"
              placeholder="Password"
              name="password"
              minLength="7"
              required
            />
          </div>
          {error && <h1>{error}</h1>}
          {/* {errors.length > 0 && <Alerts alerts={errors} />} */}
          <input type="submit" class="btn btn-primary" value="Login" />
        </form>
        <p class="my-1">
          Don't have an account? <Link to="/users/register">Sign Up</Link>
        </p>
      </section>
    </div>
  )
}

export default Login
