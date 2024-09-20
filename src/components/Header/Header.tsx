import { Logo } from '../Logo';
import { MainCurrencyToUAHSection } from '../MainCurrencyToUAHSection';

import styles from './Header.module.scss';

export const Header = () => {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <header className={styles.header}>
      <Logo />

      <div className={styles.infoContainer}>
        <p className={styles.updateDataSection}>
          Last update: <span className={styles.date}>{date}</span>{' '}
        </p>

        <MainCurrencyToUAHSection />
      </div>
    </header>
  );
};
