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
  const [currentTasks, setCurrentTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  //Lógica de marcar ou desmarcar uma tarefa
  const handleCheckboxChange = (taskId: number) => {
    const taskToMove = currentTasks.find((task) => task.id === taskId);
    if (taskToMove) {
      const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
      const updatedCompletedTasks = [...completedTasks, { ...taskToMove, checked: true }];
  
      setCurrentTasks(updatedTasks);
      setCompletedTasks(updatedCompletedTasks);
  
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
    } else {
      const taskToUncheck = completedTasks.find((task) => task.id === taskId);
      if (taskToUncheck) {
        const updatedCompletedTasks = completedTasks.filter((task) => task.id !== taskId);
        const updatedTasks = [...currentTasks, { ...taskToUncheck, checked: false }];
  
        setCurrentTasks(updatedTasks);
        setCompletedTasks(updatedCompletedTasks);
  
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
      }
    }
  };

  //Deletar uma tarefa específica
  const deleteTask = (taskId: number) => {
    setCurrentTasks((prevcurrentTasks) => {
      const updatedcurrentTasks = prevcurrentTasks.filter((task) => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(updatedcurrentTasks));
      return updatedcurrentTasks;
    });
  
    setCompletedTasks((prevCompletedTasks) => {
      const updatedCompletedTasks = prevCompletedTasks.filter((task) => task.id !== taskId);
      localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTasks));
      return updatedCompletedTasks;
    });
  };
  
  //atualizar a lista de tarefas de acordo com o local storage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setCurrentTasks(JSON.parse(storedTasks));
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
          
          {currentTasks.length >= 1 ? currentTasks.map((task) => (
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
        <Modal setTaskList={setCurrentTasks} textButton='Adicionar' typeModal={1} isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  )
}
