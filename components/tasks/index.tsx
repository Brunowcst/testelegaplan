'use client'
import React, {useEffect, useState} from 'react'
import sytles from './styles.module.css'
import CardTasks from '../cardtaks'
import Modal from '../modal'

interface Task {
  id: number;
  title: string;
  checked: boolean
}

export default function TasksContainer() {
  const [isOpen, setIsOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleCheckboxChange = (taskId: number) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
  
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  
    if (taskToUpdate) {
      setCompletedTasks((prevCompletedTasks) => {
        taskToUpdate.checked = true
        const updatedCompletedTasks = [...prevCompletedTasks, taskToUpdate];
        localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
        return updatedCompletedTasks;
      });
    }
  };
  
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }

    const storedCompletedTasks = localStorage.getItem('completedTasks');
    if (storedCompletedTasks) {
      setCompletedTasks(JSON.parse(storedCompletedTasks));
    }
  }, []);

  return (
    <div  className={sytles.mainContainer}>
        <div className={sytles.mainContent}>
          <p className={sytles.tasktoday}>Suas tarefas de hoje</p>
          {tasks.map((task) => (
          <CardTasks checked={task.checked} onCheckboxChange={handleCheckboxChange} id={task.id} key={task.id} title={task.title} />
          ))}
            <p className={sytles.tasktoday}>Tarefas finalizadas</p>
            {completedTasks.map((task) => (
            <CardTasks checked={task.checked} onCheckboxChange={handleCheckboxChange} id={task.id} key={task.id} title={task.title} />
          ))}
        </div>  
        <button className={sytles.button} onClick={() => setIsOpen(true)}>Adicionar nova tarefa</button>
        <Modal setTaskList={setTasks} textButton='Adicionar' typeModal={1} isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  )
}
