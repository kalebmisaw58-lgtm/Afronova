"use client";

import React, {
  createContext, useContext, useState, useCallback,
  useEffect, ReactNode,
} from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────
export type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error:   (message: string) => void;
  info:    (message: string) => void;
}

// ── Context ───────────────────────────────────────────────────
const ToastContext = createContext<ToastContextType>({
  toast:   () => {},
  success: () => {},
  error:   () => {},
  info:    () => {},
});

// ── Provider ──────────────────────────────────────────────────
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const success = useCallback((m: string) => toast(m, "success"), [toast]);
  const error   = useCallback((m: string) => toast(m, "error"),   [toast]);
  const info    = useCallback((m: string) => toast(m, "info"),    [toast]);

  // Auto-dismiss after 5 s
  useEffect(() => {
    if (toasts.length === 0) return;
    const id = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 5000);
    return () => clearTimeout(id);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}

      {/* ── Toast stack ──────────────────────────────────── */}
      {toasts.length > 0 && (
        <div
          aria-live="polite"
          className="fixed bottom-6 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full"
        >
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

// ── Individual toast item ─────────────────────────────────────
function ToastItem({
  toast: t,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: (id: string) => void;
}) {
  const styles: Record<ToastType, { bg: string; border: string; icon: React.ReactNode }> = {
    success: {
      bg:     "rgba(255,255,255,0.97)",
      border: "1px solid rgba(214,163,74,0.40)",
      icon:   <CheckCircle className="w-5 h-5 shrink-0" style={{ color: "#9A6A31" }} />,
    },
    error: {
      bg:     "rgba(255,255,255,0.97)",
      border: "1px solid rgba(192,57,43,0.40)",
      icon:   <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />,
    },
    info: {
      bg:     "rgba(255,255,255,0.97)",
      border: "1px solid rgba(214,163,74,0.25)",
      icon:   <Info className="w-5 h-5 shrink-0" style={{ color: "#B9853B" }} />,
    },
  };

  const { bg, border, icon } = styles[t.type];

  return (
    <div
      role="alert"
      className="flex items-start gap-3 px-4 py-3.5 rounded-xl shadow-lg backdrop-blur-sm
                 animate-slide-up"
      style={{ background: bg, border }}
    >
      {icon}
      <p className="flex-1 text-sm font-semibold text-[#101312] leading-snug">{t.message}</p>
      <button
        onClick={() => onDismiss(t.id)}
        aria-label="Dismiss"
        className="shrink-0 text-[#101312]/40 hover:text-[#101312]/70 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export const useToast = () => useContext(ToastContext);
