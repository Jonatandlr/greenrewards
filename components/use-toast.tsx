// Simplified version of the toast hook
import type { ToastProps } from "./sonner"
import { toast as sonnerToast } from "./sonner"

export const toast = ({ title, description, action, variant = "default" }: ToastProps) => {
  return sonnerToast({
    title,
    description,
    action,
    variant,
  })
}

