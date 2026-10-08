import { api } from "@/api";
import type { SendPromptRequest, SendPromptResponse } from "./types";

export async function sendPrompt(payload: SendPromptRequest) {
  const { data } = await api.post<SendPromptResponse>("/requests", payload);
  return data;
}
