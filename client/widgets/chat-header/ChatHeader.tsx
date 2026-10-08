"use client";

import { useSyncExternalStore } from "react";
import { API_BASE_URL } from "@/shared/config";
import styles from "./ChatHeader.module.css";

function subscribe() {
  return () => {};
}

function getFrontendUrl() {
  return window.location.origin;
}

function getServerFrontendUrl() {
  return "…";
}

export function ChatHeader() {
  const frontendUrl = useSyncExternalStore(
    subscribe,
    getFrontendUrl,
    getServerFrontendUrl,
  );

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.pulse} aria-hidden />
        <div>
          <p className={styles.title}>Nexus Gemini</p>
          <p className={styles.subtitle}>Futuristic chat interface</p>
        </div>
      </div>

      <div className={styles.meta}>
        <div className={styles.chip}>
          <span className={styles.chipLabel}>Frontend</span>
          <code className={styles.chipValue}>{frontendUrl}</code>
        </div>
        <div className={styles.chip}>
          <span className={styles.chipLabel}>Backend</span>
          <code className={styles.chipValue}>{API_BASE_URL}</code>
        </div>
      </div>
    </header>
  );
}
