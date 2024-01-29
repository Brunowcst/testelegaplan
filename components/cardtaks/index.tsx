'use client'
import React, { useState } from 'react'
import styles from './styles.module.css'
import TrashIcon from '../../assets/trash.svg'
import Image from 'next/image'
import Modal from '../modal'
import DeleteModal from '../deleteModal'

export default function CardTasks() {
    const [isOpen, setIsOpen] = useState(false)

    const handleCloseModal = () => {
      setIsOpen(false)
    }
    const [isChecked, setIsChecked] = useState(false);

    let completeTasks = []
    let incompleteTasks = []

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

  return (
    <>
        <div className={styles.cardContainer}>
            <div className={styles.checkbox}>
                <input 
                    onChange={handleCheckboxChange}
                    checked={isChecked} 
                    type="checkbox" 
                    id="chk1" 
                    className={styles.checkbox} 
                    name="chk"
                />
                <label htmlFor="chk1" className={styles.taskTitle}>
                    Checkbox 1
                </label>
            </div>
            <Image
                alt='trash-icon'
                src={TrashIcon}
                className={styles.buttonTrash}
                onClick={() => setIsOpen(true)}
            />
        </div>
        <Modal textButton='Deletar' typeModal={2} isOpen={isOpen} onClose={handleCloseModal} content={<DeleteModal/>}/>
    </>
  )
}
