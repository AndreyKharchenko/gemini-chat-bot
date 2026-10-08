import type { ChatRequestRecord } from "@/api/history/types";
import type { ChatMessage } from "@/shared/ui";

export function mapHistoryToMessages(
  requests: ChatRequestRecord[],
): ChatMessage[] {
  return requests.flatMap((item) => [
    {
      id: `user-${item.id}`,
      role: "user" as const,
      content: item.prompt,
    },
    {
      id: `assistant-${item.id}`,
      role: "assistant" as const,
      content: item.response,
    },
  ]);
}
