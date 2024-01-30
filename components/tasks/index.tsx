'use client'
import React, {useEffect, useState} from 'react'
import sytles from './styles.module.css'
import CardTasks from '../cardTasks'
import Modal from '../modal'

interface Task {
  id: number;
  title: string;
  checked: boolean
}

export default function TasksContainer() {

  const [isOpen, setIsOpen] = useState(false)
  const [runningTasks, setRunningTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleCheckboxChange = (taskId: number) => {
    const taskToMove = runningTasks.find((task) => task.id === taskId);
    if (taskToMove) {
      const updatedTasks = runningTasks.filter((task) => task.id !== taskId);
      const updatedCompletedTasks = [...completedTasks, { ...taskToMove, checked: true }];
  
      setRunningTasks(updatedTasks);
      setCompletedTasks(updatedCompletedTasks);
  
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
    } else {
      const taskToUncheck = completedTasks.find((task) => task.id === taskId);
      if (taskToUncheck) {
        const updatedCompletedTasks = completedTasks.filter((task) => task.id !== taskId);
        const updatedTasks = [...runningTasks, { ...taskToUncheck, checked: false }];
  
        setRunningTasks(updatedTasks);
        setCompletedTasks(updatedCompletedTasks);
  
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
      }
    }
  };

  const deleteTask = (taskId: number) => {
    setRunningTasks((prevRunningTasks) => {
      const updatedRunningTasks = prevRunningTasks.filter((task) => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(updatedRunningTasks));
      return updatedRunningTasks;
    });
  
    setCompletedTasks((prevCompletedTasks) => {
      const updatedCompletedTasks = prevCompletedTasks.filter((task) => task.id !== taskId);
      localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
      return updatedCompletedTasks;
    });
  };
  
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setRunningTasks(JSON.parse(storedTasks));
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
          
          {runningTasks.length >= 1 ? runningTasks.map((task) => (
          <CardTasks 
            onDeleteTask={() => deleteTask(task.id)} 
            checked={task.checked} 
            onCheckboxChange={handleCheckboxChange} 
            id={task.id} key={task.id} 
            title={task.title} />
          )) : (
            <p className={sytles.tasktoday}>---</p>
          )}

            <p className={sytles.tasktoday}>Tarefas finalizadas</p>
            {completedTasks.length >= 1 ? completedTasks.map((task) => (
            <CardTasks 
              onDeleteTask={() => deleteTask(task.id)} 
              checked={task.checked} 
              onCheckboxChange={handleCheckboxChange} 
              id={task.id} 
              key={task.id} 
              title={task.title} 
            />
          )) : (
            <p className={sytles.tasktoday}>---</p>
          )}
        </div>  
        <button className={sytles.button} onClick={() => setIsOpen(true)}>Adicionar nova tarefa</button>
        <Modal setTaskList={setRunningTasks} textButton='Adicionar' typeModal={1} isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  )
}
