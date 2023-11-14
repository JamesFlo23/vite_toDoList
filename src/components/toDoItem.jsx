import React from "react"
export default function ToDoItem({task,updateTask,setUpdateTask,onCheckChanged,onDeleteTask,onEditTask, onCancelClick,onSaveTask}){

  return(
    <>
      {/* <hi>To Do Item {task.task}</hi> */}
      <li className='list-group-item'>         
          {
            task.editMode ?
            <>
              <input className='form-control' value={updateTask} type='text' onChange={(evt) => setUpdateTask(evt.target.value)}/>
              <button className='btn btn-primary ms-5' onClick={() => onSaveTask(task)}>Save Task</button>
              <button className='btn btn-info ms-1' onClick={() => onCancelClick(task)}>Cancel</button>
            </>
            :
            <>
              <label className='form-check-label'>
              <input type='checkbox' className='form-check-input' checked={task.isCompleted} onChange={(evt) => onCheckChanged(evt,task)} />
              {task.task}{React.createElement(task.icon)}</label>
              <button className='btn btn-danger ms-5' onClick={() => onDeleteTask(task)}>Delete Task</button>
              <button className='btn btn-info ms-5' onClick={() => onEditTask(task)}>Edit Task</button>
            </>
          }      
        </li>
    </>
  )
}