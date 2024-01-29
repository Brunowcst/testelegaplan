'use client'
import React, {useState} from 'react'
import sytles from './styles.module.css'
import CardTasks from '../cardtaks'
import Modal from '../modal'
import { FormTask } from '../formModal'

export default function TasksContainer() {
  const [isOpen, setIsOpen] = useState(false)

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <div className={sytles.mainContainer}>
        <div className={sytles.mainContent}>
          <p className={sytles.tasktoday}>Suas tarefas de hoje</p>
          <CardTasks/>
            <p className={sytles.tasktoday}>Tarefas finalizadas</p>
            <CardTasks/>
        </div>  

        <button className={sytles.button} onClick={() => setIsOpen(true)}>Adicionar nova tarefa</button>
        <Modal textButton='Adicionar' typeModal={1} isOpen={isOpen} onClose={handleCloseModal} content={<FormTask/>}/>
    </div>
  )
}
