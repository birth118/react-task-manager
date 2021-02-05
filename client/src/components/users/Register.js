import React from 'react'

import { Link } from 'react-router-dom'

// import Alerts from '../Alerts'

// import { useRequest } from "../../hooks/use-request";
import { auth } from '../../utils';


const Register = ({ history, onAuthenticated }) => {

  //const { currentUser } = useAuth()

  // if (currentUser) {
  //   history.push('/tasks')
  // }

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [password2, setPassword2] = React.useState('')
  const [error, setError] = React.useState('')

  // const { doRequest, errors } = useRequest({   // Like usual hooks, just define here
  //   method: 'post',
  //   url: '/users/',
  //   body: { email, name, password },
  //   onSuccess: (data) => {
  //     console.log(data)
  //     //   const alertMsg = {
  //     //     message: `User '${data.name}' is successfully created`,
  //     //     className: 'alert-green'
  //     //   }
  //     //   setAlerts([alertMsg, ...alerts])
  //     // }

  //   }
  // })

  const [alerts, setAlerts] = React.useState([])


  React.useEffect(() => {

    const time = setTimeout(() => {
      setAlerts([])
    }, 2000)

    return () => {
      clearTimeout(time)
    }
  }, [alerts])


  const onFormSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      // const alertMsg = {
      //   message: 'Password do not match',
      //   // className: 'alert-danger'
      // }
      //  setAlerts([alertMsg, ...alerts])
      // console.log(...alerts)
      console.log(password2);
      setError('Password do not match')
      return

    }

    // doRequest()
    auth.register(email, name, password)
      .then((user) => {
        onAuthenticated(user)
        auth.login(email, password)
      })
      .catch((err) => { setError(err.statusText) })

    // if (errors.length !== 0) {
    //   console.log(errors)
    // }


  }



  return (

    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form onSubmit={onFormSubmit} className="form">
        <div className="form-group">
          <input
            onChange={
              (e) => setName(e.target.value)
            }
            value={name} type="text" placeholder="Name" name="name" required />
        </div>
        <div className="form-group">
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email"
            placeholder="Email Address" name="email" />

        </div>
        <div className="form-group">
          <input onChange={(e) => setPassword(e.target.value)} value={password}
            type="password"
            placeholder="Password"
            name="password"
            minLength="7"
            required
          />
        </div>
        <div className="form-group">
          <input onChange={(e) => setPassword2(e.target.value)} value={password2}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="7"
            required
          />
        </div>
        {error}
        {/* {errors.length > 0 && <Alerts alerts={errors} />}

        {alerts.length > 0 && <Alerts alerts={alerts} />} */}
        {/* {errors.length > 0 && <Alerts alerts={errors} className='alert-dark' />} */}

        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/users/login">Sign In</Link>
      </p>
    </section>

  )
}

export default Register
