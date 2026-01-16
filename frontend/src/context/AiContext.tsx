import { createContext } from "react";
import type { ReactNode } from "react";

export interface HistoryItem {
  id: number;
  prompt: string;
  result: string;
  created_at: string;
}


export type ActiveSection = "chat" | "image" | "history";

export interface AiContextType {
  // Input
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;

  // Sidebar / UI
  extended: boolean;
  setExtended: React.Dispatch<React.SetStateAction<boolean>>;

  // Prompts
  recentPrompt: string;
  setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
  prevPrompts: string[];
  setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;

  // Result
  showResult: boolean;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  resultData: string;
  setResultData: React.Dispatch<React.SetStateAction<string>>;

  // Chat actions
  onSent: (prompt?: string) => Promise<void>;
  addNewChat: () => void;
  updatesInfo: () => void;

  // Voice
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;

  // Modal ✅ FIX HERE
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;

  modalContent: ReactNode | null;
  setModalContent: React.Dispatch<React.SetStateAction<ReactNode | null>>;

  // Profile
  showProfile: boolean;
  setShowProfile: React.Dispatch<React.SetStateAction<boolean>>;

  // Theme
  toggleTheme: string;
  setToggleTheme: React.Dispatch<React.SetStateAction<string>>;
  onHandleTheme: () => void;

  // History (DB-backed)
  history: HistoryItem[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;

  // Navigation
  activeSection: ActiveSection;
  setActiveSection: React.Dispatch<React.SetStateAction<ActiveSection>>;

  //Auth

  isAuthenticated: boolean;
  login: (userId: number) => void;
  logout: () => void;

  imageCredits: number;
  setImageCredits: React.Dispatch<React.SetStateAction<number>>;
}

export const AiContext = createContext<AiContextType>({} as AiContextType);
