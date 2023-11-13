import {FaReact, FaPencilAlt, FaApplePay,FaPlus} from 'react-icons/fa';
import { nanoid } from 'nanoid'; 
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

export default function ToDoList() {
  const [tasks,setTasks] = useState([
    {id:nanoid(),task:"Learn React",isCompleted:false, icon:<FaReact />,editMode:false},
    {id:nanoid(),task:"Pass the exam",isCompleted:false, icon:<FaPencilAlt />,editMode:false},
    {id:nanoid(),task:"Get a job",isCompleted:false, icon:<FaApplePay />,editMode:false}
  ]);

  const [newTask,setNewTask] = useState("")

  function onCheckChanged(evt, task){
    const newTasks = [...tasks];
    const index = newTasks.indexOf(task);
    newTasks[index].isCompleted = evt.target.checked;
    setTasks(newTasks);
  }

  function onAddTask(){
    const newTasks = [...tasks];
    newTasks.push({id:nanoid(),task:newTask,isCompleted:false});
    setTasks(newTasks);
    setNewTask("");
  }

  function onDeleteTask(task){
    const newTasks = [...tasks];
    const index = newTasks.indexOf(task);
    newTasks.splice(index,1);
    setTasks(newTasks);
  }

  function onEditTask(task){
    const newTasks = [...tasks];
    const index = newTasks.indexOf(task);
    newTasks[index].editMode = true;
    setTasks(newTasks);
  }

return(
<>
    <h1>To Do List <FaReact/></h1>
    <ul>
      {tasks.map((task)=>(
        <li key={task.id} className='list-group-item'>         
          {
            task.editMode ? <p>Welcome to Edit Mode</p> :
            <>
              <label className='form-check-label'>
              <input type='checkbox' className='form-check-input' checked={task.isCompleted} onChange={(evt) => onCheckChanged(evt,task)} />
              {task.task}</label>
              <button className='btn btn-danger ms-5' onClick={() => onDeleteTask(task)}>Delete Task</button>
        <button className='btn btn-info ms-5' onClick={() => onEditTask(task)}>Edit Task</button>
            </>
          }      
        </li>
      ))}
    </ul>
    <div>
      <button className='btn btn-warning rounded-circle ms-5 mb-4' onClick={onAddTask}><FaPlus /></button>
      <input className='form-control mb-4' placeholder='Add a new task' type="text" />
    </div>
</>
  );
}