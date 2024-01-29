import styles from "./page.module.css";
import Header from "../../components/header";
import TasksContainer from "../../components/tasks";

export default function Home() {
  return (
    <main className={styles.mainContent}>
     <Header/>
     <TasksContainer/>
    </main>
  );
}
