import React, { useEffect, useState } from 'react'
import styles from './header.module.css';
import Logo from '../assets/Logo.svg';
import Tasks from './Tasks';

function Header() {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('');
    const LOCAL_STORAGE_KEY = "todo:savedTasks";

    let loadSavedTasks = () =>{
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        // console.log(saved);
        if(saved){
            setTasks(JSON.parse(saved))
        }
    }

    useEffect(()=> {
        loadSavedTasks();
    }, [])

    let setTaskAndSave = (newTasks) =>{
        setTasks(newTasks);(newTasks);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
    }

    let handleInputChange =(e) =>{
        setNewTask(e.target.value)
    }

    let handleSubmit = (e)=>{
        e.preventDefault();
        if (newTask.trim() !== '') {
            setTaskAndSave([...tasks, { id: crypto.randomUUID(), text: newTask, isCompleted: false }]);
            setNewTask('');
        }
    }

    let toggleTaskCompletedById = (taskId) =>{
        const newTasks = tasks.map(task =>{
            if (task.id === taskId) {
                return {
                    ...task,
                    isCompleted: !task.isCompleted,
                }
            }
            return task;
        })
        setTaskAndSave(newTasks);
    }

    let deleteTaskById = (taskId) =>{
        const newTasks = tasks.filter((task)=> task.id !== taskId);
        setTaskAndSave(newTasks)
    }

  return (
    <>
    <header className={styles.header}>
        <img src={Logo} alt="Todo" />

        <form className={styles.newTaskForm} onSubmit={handleSubmit}>
            <input type="text" placeholder='add new task' value={newTask} onChange={handleInputChange} />
            <button>Create</button>
        </form>
    </header>
    <Tasks 
    tasks={tasks}
    onComplete={toggleTaskCompletedById}
    onDelete={deleteTaskById}
    />

    </>
  )
}

export default Header