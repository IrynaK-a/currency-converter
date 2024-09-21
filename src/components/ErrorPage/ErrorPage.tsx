import errorIcon from '../../assets/icons/error.svg';
import { ERROR_MESSAGE } from '../../constants';

import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
  const message = ERROR_MESSAGE;

  const buttonText = 'Refresh Page';

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <img
        alt="Page not found"
        src={errorIcon}
        className={styles.icon}
      />

      <p className={styles.message}>{message}</p>

      <button
        type="button"
        className={styles.button}
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};
