"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getHistory } from "@/api/history/get-history";
import { sendPrompt } from "@/api/prompt/send-prompt";
import { mapHistoryToMessages } from "@/shared/lib/mapHistory";
import type { ChatMessage } from "@/shared/ui";
import { ChatFeed } from "../chat-feed/ChatFeed";
import { ChatHeader } from "../chat-header/ChatHeader";
import { PromptForm } from "../prompt-form/PromptForm";
import styles from "./ChatWorkspace.module.css";

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data
      ? String(error.response.data)
      : error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Неизвестная ошибка";
}

export function ChatWorkspace() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getHistory();
        if (!cancelled) {
          setMessages(mapHistoryToMessages(data.requests ?? []));
        }
      } catch {
        if (!cancelled) {
          setMessages([
            {
              id: "system-history-error",
              role: "system",
              content:
                "Не удалось загрузить историю. Проверьте, что backend запущен.",
            },
          ]);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = useCallback(async (prompt: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [
      ...prev.filter((item) => item.role !== "system"),
      userMessage,
    ]);
    setIsGenerating(true);

    try {
      const { answer } = await sendPrompt({ prompt });
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `system-${Date.now()}`,
          role: "system",
          content: `Ошибка запроса: ${getErrorMessage(error)}`,
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return (
    <div className={styles.workspace}>
      <ChatHeader />
      <ChatFeed messages={messages} isGenerating={isGenerating} />
      <PromptForm isGenerating={isGenerating} onSubmit={handleSubmit} />
    </div>
  );
}
