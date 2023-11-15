// import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ToDoList from './components/toDoList';

function App() {


  return (
    <>
    <div className='container bg-dark text-white'>
    <ToDoList />
    </div>
    </>
  )
}

export default App
