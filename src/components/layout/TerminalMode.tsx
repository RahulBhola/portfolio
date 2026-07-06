"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Terminal, X } from "lucide-react";
import { useTerminal } from "@/hooks/useTerminal";

export function TerminalMode() {
  const { isOpen, toggle, input, setInput, history, handleSubmit } =
    useTerminal();

  return (
    <>
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-surface border border-border text-subtext hover:text-accent hover:border-accent/40 transition-all shadow-lg cursor-pointer"
        aria-label="Toggle terminal"
      >
        <Terminal size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-[90vw] max-w-md rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-subtext font-mono ml-2">
                  rahul@portfolio
                </span>
              </div>
              <button
                onClick={toggle}
                className="p-1 text-subtext hover:text-foreground cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            <div className="h-48 overflow-y-auto p-4 font-mono text-xs space-y-1">
              {history.map((line, i) => (
                <p
                  key={i}
                  className="text-subtext whitespace-pre-wrap leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-border">
              <span className="text-accent font-mono text-xs">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-foreground font-mono text-xs outline-none placeholder:text-subtext/40"
                placeholder="Type a command..."
                autoFocus
                spellCheck={false}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
