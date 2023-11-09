import {FaBeer,FaFacebook} from 'react-icons/fa';
import { nanoid } from 'nanoid'; 
import { useState } from 'react';

export default function ToDoList() {
  const [tasks,setTasks] = useState([
    {id:nanoid(),task:"Learn React",isCompleted:false},
    {id:nanoid(),task:"Pass the exam",isCompleted:false},
    {id:nanoid(),task:"Get a job",isCompleted:false}
  ]);

return(
<>
    <h1>To Do List <FaBeer />< FaFacebook/></h1>

    <ul className=''>
      {tasks.map((task)=>(
        <li key={task.id} className='list-group-item'>
          
          <label className='form-check-label'>
            <input type='checkbox' className='form-check-input' checked={task.isCompleted} />
          {task.task}</label>
        </li>
      ))}
    </ul>
</>
  );
}