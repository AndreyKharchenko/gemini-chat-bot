import styles from "./Button.module.css";
import type { ButtonProps } from "./types";

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classes = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
