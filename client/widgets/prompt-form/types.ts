export type PromptFormProps = {
  isGenerating: boolean;
  onSubmit: (prompt: string) => Promise<void> | void;
};
