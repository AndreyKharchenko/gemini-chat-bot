export type ChatRequestRecord = {
  id: number;
  ip_address: string;
  prompt: string;
  response: string;
};

export type HistoryResponse = {
  requests: ChatRequestRecord[];
};
