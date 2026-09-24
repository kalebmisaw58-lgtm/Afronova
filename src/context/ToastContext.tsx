"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextType {
  showToast: (title: string, description?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((title: string, description?: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, description }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto p-4 rounded-2xl bg-white shadow-2xl border border-[#D6A34A]/30 flex items-start gap-3 animate-slide-up transition-all"
            style={{
              borderLeftWidth: "4px",
              borderLeftColor:
                toast.type === "success"
                  ? "#D6A34A"
                  : toast.type === "error"
                  ? "#EF4444"
                  : "#3B82F6",
            }}
          >
            {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-[#9A6A31] shrink-0 mt-0.5" />}
            {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
            {toast.type === "info" && <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />}

            <div className="flex-1 min-w-0 pr-1">
              <p className="text-[#101312] text-sm font-bold leading-snug">{toast.title}</p>
              {toast.description && (
                <p className="text-[#101312]/65 text-xs font-medium mt-0.5 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#101312]/40 hover:text-[#101312] p-1 rounded-lg hover:bg-black/5 transition-colors shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

