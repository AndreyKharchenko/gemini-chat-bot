import { api } from "@/api";
import type { HistoryResponse } from "./types";

export async function getHistory() {
  const { data } = await api.get<HistoryResponse>("/requests");
  return data;
}
