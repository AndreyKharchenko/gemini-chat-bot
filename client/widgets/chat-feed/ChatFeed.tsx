"use client";

import { useEffect, useRef } from "react";
import { MessageBubble, Spinner } from "@/shared/ui";
import styles from "./ChatFeed.module.css";
import type { ChatFeedProps } from "./types";

export function ChatFeed({ messages, isGenerating }: ChatFeedProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  console.log("messages", messages);

  return (
    <section className={styles.feed} aria-label="История чата">
      <div className={styles.scanline} aria-hidden />

      {messages.length === 0 && !isGenerating ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Канал открыт</p>
          <p className={styles.emptyText}>
            Отправьте первый промпт — ответ Gemini появится здесь.
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isGenerating && (
            <div className={styles.generating}>
              <Spinner label="Ожидание ответа сервера…" />
            </div>
          )}
        </div>
      )}

      <div ref={bottomRef} />
    </section>
  );
}
