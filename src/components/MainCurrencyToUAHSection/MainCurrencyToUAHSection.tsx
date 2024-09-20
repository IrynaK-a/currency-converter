import styles from './MainCurrencyToUAHSection.module.scss';

export const MainCurrencyToUAHSection = () => {
  return (
    <section className={styles.infoSection}>
      <div className={styles.currencyBlock}>
        <p className={styles.currency}>USD/UAH:</p>
        <span>41.25</span>
      </div>

      <div className={styles.currencyBlock}>
        <p className={styles.currency}>EUR/UAH:</p>
        <span>41.25</span>
      </div>
    </section>
  );
};
