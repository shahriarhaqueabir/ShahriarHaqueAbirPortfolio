"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

type MobileCommandSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

export default function MobileCommandSheet({ open, onOpenChange, children }: MobileCommandSheetProps) {
  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        className="fixed bottom-6 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-(--accent)/45 bg-(--accent) text-(--bg) shadow-[0_18px_48px_rgba(var(--accent-rgb),0.36)] transition-transform active:scale-95 md:hidden"
        aria-label={open ? "Close chat panel" : "Open chat panel"}
      >
        {open ? (
          <>
            <X className="h-5 w-5" />
          </>
        ) : (
          <>
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-(--bg)/15">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-(--accent) bg-green-400" />
            </span>
          </>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close chat panel overlay"
              className="fixed inset-0 z-40 md:hidden bg-(--text)/20 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onOpenChange(false)}
            />
            <motion.aside
              className="fixed bottom-0 left-0 right-0 z-50 md:hidden h-[85dvh] bg-(--surface)/95 border-t border-(--border) flex flex-col backdrop-blur-3xl shadow-2xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {children}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
