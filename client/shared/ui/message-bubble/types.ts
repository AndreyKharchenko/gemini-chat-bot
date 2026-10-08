export type MessageRole = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: MessageRole;
  content: string;
};

export type MessageBubbleProps = {
  message: ChatMessage;
};
