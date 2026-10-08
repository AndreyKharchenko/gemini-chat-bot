import styles from "./MessageBubble.module.css";
import type { MessageBubbleProps } from "./types";

export function MessageBubble({ message }: MessageBubbleProps) {
  const roleClass =
    message.role === "user"
      ? styles.user
      : message.role === "assistant"
        ? styles.assistant
        : styles.system;

  const label =
    message.role === "user"
      ? "Вы"
      : message.role === "assistant"
        ? "Gemini"
        : "Система";

  return (
    <article className={`${styles.bubble} ${roleClass}`}>
      <header className={styles.meta}>
        <span className={styles.role}>{label}</span>
      </header>
      <p className={styles.content}>{message.content}</p>
    </article>
  );
}
