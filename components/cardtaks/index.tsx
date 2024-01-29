'use client'
import React, { useState } from 'react'
import styles from './styles.module.css'
import TrashIcon from '../../assets/trash.svg'
import Image from 'next/image'
import Modal from '../modal'

interface Task {
    id: number;
    title: string;
}

export default function CardTasks({id, title}: Task) {
    const [isOpen, setIsOpen] = useState(false)

    const handleCloseModal = () => {
      setIsOpen(false)
    }
    const [isChecked, setIsChecked] = useState(false);

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
                    id={`chk${id}`}
                    className={styles.checkbox}
                    name={`chk${id}`}
                />
                <label htmlFor={`chk${id}`} className={styles.taskTitle}>
                    {title}
                </label>
            </div>
            <Image
                alt='trash-icon'
                src={TrashIcon}
                className={styles.buttonTrash}
                onClick={() => setIsOpen(true)}
            />
        </div>
        <Modal textButton='Deletar' typeModal={2} isOpen={isOpen} onClose={handleCloseModal} />
    </>
  )
}
