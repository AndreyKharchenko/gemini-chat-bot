import { ChatWorkspace } from "@/widgets";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <div className={styles.glow} aria-hidden />
      <div className={styles.grid} aria-hidden />
      <ChatWorkspace />
    </main>
  );
}
