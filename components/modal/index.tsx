'use client'
import React from 'react';
import styles from './styles.module.css';

export interface ModalProps {
  isOpen: boolean;
  content?: React.ReactNode;
  onClose: () => void;
  textButton: string;
  typeModal : number;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content, textButton, typeModal }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {content}
        <div className={styles.buttonContainer}>
          <button className={styles.closeButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={typeModal === 1 ? styles.addButton : styles.deleteButton}>
            {textButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
