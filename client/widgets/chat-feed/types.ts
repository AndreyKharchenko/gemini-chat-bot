import type { ChatMessage } from "@/shared/ui";

export type ChatFeedProps = {
  messages: ChatMessage[];
  isGenerating: boolean;
};
