'use client'
import React, { useState } from 'react';
import styles from './styles.module.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  textButton: string;
  typeModal : number;
  setTaskList?: (updatedTaskList: any[]) => void;
}

export interface Task {
  id: number;
  title: string;
  checked: boolean
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, textButton, typeModal, setTaskList }) => {
  if (!isOpen) return null;

  const [taskTitle, setTaskTitle] = React.useState<string>('');

  const handleAddTask = () => {
    if (taskTitle.trim() !== '') {
      const newTask: Task = { id: Date.now(), title: taskTitle, checked: false };

      const storedTasks = localStorage.getItem('tasks');
      const currentTasks = storedTasks ? JSON.parse(storedTasks) : [];

      const updatedTaskList = [...currentTasks, newTask];

      setTaskList && setTaskList(updatedTaskList);
      localStorage.setItem('tasks', JSON.stringify(updatedTaskList));

      setTaskTitle('');
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {typeModal === 1 ? 
          <div className={styles.mainContent}>
            <h4>Nova Tarefa</h4>
            <div className={styles.inputContainer}>
              <span>Titulo</span>
              <input 
                type="text" 
                placeholder='Digite'
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
          </div>  
          : (
            <div className={styles.mainContent}>
              <h4>Deletar Tarefa</h4>
              <p>Tem certeza que você deseja deletar essa tarefa?</p>
            </div>
          )
        }
        <div className={styles.buttonContainer}>
          <button className={styles.closeButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={typeModal === 1 ? styles.addButton : styles.deleteButton} onClick={handleAddTask}>
            {textButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
