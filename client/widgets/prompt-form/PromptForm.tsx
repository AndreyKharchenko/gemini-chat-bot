"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Button, Spinner, Textarea } from "@/shared/ui";
import styles from "./PromptForm.module.css";
import type { PromptFormProps } from "./types";

export function PromptForm({ isGenerating, onSubmit }: PromptFormProps) {
  const [value, setValue] = useState("");

  const canSend = value.trim().length > 0 && !isGenerating;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const prompt = value.trim();
    if (!prompt || isGenerating) return;

    setValue("");
    await onSubmit(prompt);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (canSend) {
        event.currentTarget.form?.requestSubmit();
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Введите промпт… (Enter — отправить, Shift+Enter — новая строка)"
        disabled={isGenerating}
        aria-label="Текст промпта"
      />

      <div className={styles.footer}>
        <div className={styles.status}>
          {isGenerating ? (
            <Spinner />
          ) : (
            <span className={styles.hint}>Готов к запросу</span>
          )}
        </div>

        <Button type="submit" disabled={!canSend}>
          Отправить
        </Button>
      </div>
    </form>
  );
}
