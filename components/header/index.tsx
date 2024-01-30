import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import Logomark from '../../assets/Logomark.svg';
import LogoType from '../../assets/Logotype.svg';

export default function Header() {
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const currentDate = new Date();
    return currentDate.toLocaleDateString('pt-BR', options);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image alt="logo-image" src={Logomark} />
        <Image alt="logo-type" height={15} width={100} src={LogoType} />
      </div>
      <p className={styles.headerTitle}>Bem-vindo de volta, Marcus</p>
      <p className={styles.headerDate}>{formatDate()}</p>
    </header>
  );
}
