"use client";

import { useCallback, useEffect, useState } from "react";
import { TERMINAL_COMMANDS } from "@/constants/navigation";
import { scrollToSection } from "@/lib/utils";

const HELP_TEXT = `Available commands:
  about          Navigate to About section
  skills         Navigate to Skills section
  projects       Navigate to Projects section
  experience     Navigate to Experience section
  certifications Navigate to Certifications section
  github         Navigate to GitHub section
  contact        Navigate to Contact section
  resume         Download resume
  help           Show this help
  clear          Clear terminal`;

export function useTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    'Type "help" for available commands.',
  ]);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    if (!trimmed) return;

    setHistory((prev) => [...prev, `> ${cmd}`]);

    if (trimmed === "help") {
      setHistory((prev) => [...prev, HELP_TEXT]);
      return;
    }

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    const target = TERMINAL_COMMANDS[trimmed as keyof typeof TERMINAL_COMMANDS];

    if (target === "help") {
      setHistory((prev) => [...prev, HELP_TEXT]);
      return;
    }

    if (target === "clear") {
      setHistory([]);
      return;
    }

    if (target) {
      scrollToSection(target);
      setHistory((prev) => [...prev, `Navigating to ${trimmed}...`]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      `Command not found: ${trimmed}. Type "help" for available commands.`,
    ]);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      executeCommand(input);
      setInput("");
    },
    [input, executeCommand]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  return {
    isOpen,
    toggle,
    input,
    setInput,
    history,
    handleSubmit,
    executeCommand,
  };
}
