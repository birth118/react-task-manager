import React from 'react'
import { Link } from 'react-router-dom'



const Landing = () => {
  return (
    <div>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Task Manager</h1>
            <p className="lead">
              Organise yourself
          </p>
            <div className="buttons">
              <Link to="/users/register" className="btn btn-primary">Sign Up</Link>
              <Link to="/users/login" className="btn btn-light">Login</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
