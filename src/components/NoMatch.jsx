import styles from "./NoMatch.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NoMatch() {
  return <div className={styles.NoMatch}>No channels match the search.</div>;
}
