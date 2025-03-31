
import { ToastActionElement } from "@/components/ui/toast";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: ToastActionElement;
};

export type ToastType = {
  (props: ToastProps): void;
  dismiss: (toastId?: string) => void;
};
