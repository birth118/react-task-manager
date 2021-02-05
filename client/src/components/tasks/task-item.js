import React from 'react'

export function TaskItem({ task, onItemChange, onItemDelete }) {
  // const [completed, setCompleted] = React.useState(task.completed)
  const createdDate = new Date(task.createdAt).toLocaleDateString('en-US')

  const checkBoxRef = React.useRef()

  React.useEffect(() => {
    checkBoxRef.current.checked = task.completed

  }, [])

  const onInputChange = (e) => {
    e.stopPropagation()
    const checked = e.target.checked
    //   console.log(checked)
    // setCompleted(e.target.checked)
    //  console.log(completed);
    onItemChange(task._id, checked)
  }

  const onDelete = (e) => {
    e.stopPropagation()
    onItemDelete(task._id)

  }

  return (

    <tr
      onClick={() => {
        //console.log(checkBoxRef)
        checkBoxRef.current.click()
      }}
    >
      <td>{task.description}</td>

      <td> {createdDate}</td>
      <td style={{ textAlign: 'center' }}>
        <input ref={checkBoxRef}
          type='checkbox'
          onClick={onInputChange}
        // value={completed}
        // checked={completed}

        />
        <button
          onClick={onDelete}
          className="btn small btn-light"
          value="✗"
        >✗ </button>
      </td>
    </tr>

  )
}


