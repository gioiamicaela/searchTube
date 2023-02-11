import styles from "./Spinner.module.css";

export function Spinner() {
  return (
    <div className={styles.spinner}>
      <i class="fas fa-sync fa-spin" className={styles.spinning} size={60}></i>
    </div>
  );
}
