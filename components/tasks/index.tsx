'use client'
import React, {useEffect, useState} from 'react'
import sytles from './styles.module.css'
import CardTasks from '../cardtaks'
import Modal from '../modal'

interface Task {
  id: number;
  title: string;
}

export default function TasksContainer() {
  const [isOpen, setIsOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleCloseModal = () => {
    setIsOpen(false)
  }
  
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [tasks]);

  return (
    <div className={sytles.mainContainer}>
        <div className={sytles.mainContent}>
          <p className={sytles.tasktoday}>Suas tarefas de hoje</p>
          {tasks.map((task) => (
          <CardTasks id={task.id} key={task.id} title={task.title} />
          ))}
            <p className={sytles.tasktoday}>Tarefas finalizadas</p>
        </div>  
        <button className={sytles.button} onClick={() => setIsOpen(true)}>Adicionar nova tarefa</button>
        <Modal textButton='Adicionar' typeModal={1} isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  )
}
