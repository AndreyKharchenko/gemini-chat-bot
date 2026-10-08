import styles from "./Textarea.module.css";
import type { TextareaProps } from "./types";

export function Textarea({ className, ...props }: TextareaProps) {
  const classes = [styles.textarea, className].filter(Boolean).join(" ");

  return <textarea className={classes} {...props} />;
}
