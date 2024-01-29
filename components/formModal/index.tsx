import styles from './styles.module.css'

export const FormTask = () => {
    return (
      <div className={styles.mainContent}>
        <h4>Nova Tarefa</h4>
        <div className={styles.inputContainer}>
          <span>Titulo</span>
          <input type="text" placeholder='Digite'/>
        </div>
      </div>
    )
  }
  