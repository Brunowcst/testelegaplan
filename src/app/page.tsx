import Image from "next/image";
import styles from "./page.module.css";
import Logomark from "../../assets/Logomark.svg"
import LogoType from "../../assets/Logotype.svg"

export default function Home() {
  return (
    <main >
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image alt="logo-image"
            src={Logomark}
          />
          <Image alt="logo-type"
            height={15}
            width={100}
            src={LogoType}
          />
        </div>
        <p className={styles.headerTitle}>Bem-vindo de volta, Marcus</p>
        <p className={styles.headerDate}>Segunda, 22 de dezembro de 2024</p>
      </header>
    </main>
  );
}
