import React from 'react'
import styles from './styles.module.css'

export default function DeleteModal() {
  return (
    <div className={styles.mainContent}>
      <h4>Deletar Tarefa</h4>
      <p>Tem certeza que você deseja deletar essa tarefa?</p>
    </div>
  )
}
