import React from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from "../../context";
import { auth, client } from "../../utils";
import { TaskItem } from "./task-item";
import { TaskAdd } from "./task-add";


export const Tasklists = ({ history }) => {

  const { isAuthenticated, user } = useAuth()
  const [tasks, setTasks] = React.useState([])
  const [error, setError] = React.useState(null)




  // if (!isAuthenticated) {
  //   history.push('/')
  // }

  React.useEffect(() => {
    let isCurrent = true
    if (isAuthenticated && isCurrent) {
      client.get('/tasks', { headers: { 'Authorization': `Bearer ${user.token}` } })
        .then(({ data }) => { setTasks(data) })
        .catch(({ response }) => {
          console.log(response);
          setError(response.data.errors[0].message)
        })
    }

    return () => {
      isCurrent = false
    }
  }, [isAuthenticated])

  const onItemChange = (taskId, completed) => {
    // console.log(taskId);
    // console.log(completed);
    // console.log(auth.authHeader())
    client.patch(`/tasks/${taskId}`, { completed }, { headers: auth.authHeader() })
      .then(({ data }) => { })
      .catch(() => {

      })

  }
  const onItemDelete = (taskId) => {
    // console.log(taskId);

    // console.log(auth.authHeader())
    client.delete(`/tasks/${taskId}`, { headers: auth.authHeader() })
      .then(({ data }) => {
        setTasks(
          tasks.filter((item) => { return item._id !== data._id })
        )
      })
      .catch(() => {

      })

  }

  const onFormSubmit = (description) => {
    setTasks(...tasks, description)
    client.post('/tasks', { description }, { headers: auth.authHeader() })
      .then(({ data }) => { setTasks([...tasks, data]) }).catch(({ response }) => { setError(response.errors[0].message) })
  }

  return (
    < section class="container" >
      { !isAuthenticated ? <div>
        <h4>Not Logged In </h4>
        <p className="my-1">
          Already have an account? <Link to="/users/login">Sign In</Link>
        </p>
      </div> :
        <div>
          <TaskAdd onFormSubmit={onFormSubmit} />
          <br />

          {!error && tasks.length === 0 ? <div> Loading... </div> :
            <table className="table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Created</th>
                  <th>Completed?</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 && tasks.map((task, index) =>
                  <TaskItem
                    key={index} task={task}
                    onItemChange={onItemChange}
                    onItemDelete={onItemDelete} />
                )}
                {error}

              </tbody>
            </table>
          }
        </div>}


    </section>
  )
}

/*

[
  {
      "completed": false,
      "_id": "600b61e95c33310013120653",
      "description": "test1 post #1",
      "owner": "600a72e06728107e38a6a541",
      "createdAt": "2021-01-22T23:38:17.082Z",
      "updatedAt": "2021-01-22T23:38:17.082Z",
      "__v": 0
  }
]

*/