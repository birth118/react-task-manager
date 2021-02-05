import React from 'react'

export function TaskAdd({ onFormSubmit }) {

  const [task, setTask] = React.useState('')


  // const onFormSubmit = (params) => {

  // }

  return (
    <div>
      <h1 class="large text-primary">Things to do</h1>
      <p class="lead"><i class="fas fa-task"></i> Add your things to do</p>
      <form class="form"
        onSubmit={(e) => {
          e.preventDefault()
          onFormSubmit(task)
        }} >
        <div class="form-group">
          <input
            value={task}
            onChange={(e) => { setTask(e.target.value) }}
            type="text"
            placeholder="Task..."
            name="task"
            required
            spellCheck="false"
          />
        </div>


        {/* {errors.length > 0 && <Alerts alerts={errors} />} */}
        <input type="submit" class="btn tiny btn-primary" value="Submit" />
      </form>
    </div>
  )
}
