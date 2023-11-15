import {FaReact, FaPencilAlt, FaShoppingBag,FaPlus} from 'react-icons/fa';
import { nanoid } from 'nanoid'; 
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ToDoItem from './toDoItem';


export default function ToDoList() {
  
  const [tasks,setTasks] = useState(() =>{
  
    const localValue = localStorage.getItem("TASKS");
    
    //initial seed data
    if(localValue == null) return [
      {id:nanoid(),task:"Learn React",isCompleted:true,icon:FaReact,editMode:false},
      {id:nanoid(),task:"Pass the exam",isCompleted:false,icon:FaPencilAlt,editMode:false},
      {id:nanoid(),task:"Get a job",isCompleted:false,icon:FaShoppingBag,editMode:false}
    ]
    //returns from local storage if exists
    return JSON.parse(localValue);
  });
  const [filteredTasks,setFilteredTasks] = useState(tasks);

  useEffect(() =>{
    localStorage.setItem("TASKS", JSON.stringify(tasks));
  }),[tasks];

  const [updateTask,setUpdateTask] = useState("");
  const [newTask,setNewTask] = useState("");
  const [filter,setFilter] = useState("all");
 
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
    setUpdateTask(task.task);
    setTasks(newTasks);
  }
  function onSaveTask(task){
    const newTasks = [...tasks];
    const index = newTasks.indexOf(task);
    newTasks[index].task = updateTask;
    newTasks[index].editMode = false;
    setTasks(newTasks);
  }
  const onCancelClick = (task) => {
    const newTasks = [...tasks];
    const index = newTasks.indexOf(task);
    newTasks[index].editMode = false;
    setTasks(newTasks);  
  }
  const onSelectChange = (evt) => {
    setFilter(evt.target.value);
    setFilteredTasks(tasks.filter((task) => {
      if(evt.target.value === "all") return true;
      if(evt.target.value === "completed") return task.isCompleted;
      if(evt.target.value === "incomplete") return !task.isCompleted;
    }));
  }
  
return(
<>
    <header className='d-flex'>
      <h1>To Do List {filter}</h1>
      <select defaultValue='all' className='form-select-sm' aria-label="Default select example" onChange={(evt) => onSelectChange(evt)}>
        <option value="all">Show All Items</option>
        <option value="completed">Show Completed Items</option>
        <option value="incomplete">Show Incomplete Items</option>
      </select>
    </header>
    <ul>
      {filteredTasks.map((task)=>(
        <ToDoItem 
        task={task} 
        key={task.id}
        updateTask={updateTask}
        setUpdateTask={(evt) => setUpdateTask(evt)}
        onCheckChanged={(evt) => onCheckChanged(evt,task)}
        onDeleteTask={() => onDeleteTask(task)}
        onEditTask={() => onEditTask(task)}
        onSaveTask={() => onSaveTask(task)}
        onCancelClick={() => onCancelClick(task)} />
      ))}
    </ul>
    <div className='d-flex'>
      <button className='btn btn-warning rounded-circle ms-5 mb-4' onClick={onAddTask}><FaPlus /></button>
      <input className='form-control mb-4' placeholder='Add a new task' type="text" value={newTask} onChange={(evt) => setNewTask(evt.target.value)}/>
    </div>
</>
  );
}