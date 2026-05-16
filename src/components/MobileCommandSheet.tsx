"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

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
        className="fixed bottom-6 right-6 z-50 md:hidden w-12 h-12 bg-(--text) text-(--bg) rounded-sm font-mono text-[10px] uppercase tracking-widest flex items-center justify-center shadow-xl"
        aria-label={open ? "Close command panel" : "Open command panel"}
      >
        {open ? <X className="w-4 h-4" /> : "CMD"}
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close command panel overlay"
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
