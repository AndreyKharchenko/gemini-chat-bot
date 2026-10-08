import styles from "./Spinner.module.css";
import type { SpinnerProps } from "./types";

export function Spinner({ label = "Генерация ответа…" }: SpinnerProps) {
  return (
    <div className={styles.root} role="status" aria-live="polite">
      <div className={styles.ring} aria-hidden />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
