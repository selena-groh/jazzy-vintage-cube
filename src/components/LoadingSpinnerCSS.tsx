import styles from "./LoadingSpinner.module.css";

function LoadingSpinnerCSS() {
  return (
    <>
      <div className={styles.LoadingSpinnerWrapper}>
        <div className={styles.LoadingSpinner}>
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </>
  );
}

export default LoadingSpinnerCSS;
