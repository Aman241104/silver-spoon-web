"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { X, Check, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";
interface ToastItem { id: number; message: string; type: ToastType }
interface ToastCtx { toast: (msg: string, type?: ToastType) => void }

const ToastContext = createContext<ToastCtx>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

let _id = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = ++_id;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-4 py-3 shadow-xl pointer-events-auto min-w-[200px] max-w-[320px] ${
              t.type === "success"
                ? "bg-[#2F3131] text-white border-l-4 border-l-[#D4AF37]"
                : t.type === "error"
                ? "bg-red-600 text-white"
                : "bg-[#D4AF37] text-[#2c2c2c]"
            }`}
          >
            {t.type === "success" ? (
              <Check size={13} className="shrink-0 text-[#D4AF37]" />
            ) : t.type === "error" ? (
              <AlertCircle size={13} className="shrink-0" />
            ) : (
              <Info size={13} className="shrink-0" />
            )}
            <span className="text-[11px] font-bold uppercase tracking-widest flex-1 leading-snug">
              {t.message}
            </span>
            <button
              onClick={() => setToasts((ts) => ts.filter((x) => x.id !== t.id))}
              className="opacity-50 hover:opacity-100 transition-opacity shrink-0 ml-1"
            >
              <X size={11} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
