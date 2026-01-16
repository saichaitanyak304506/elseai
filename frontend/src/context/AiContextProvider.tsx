import { useState, useEffect, type ReactNode } from "react";
import toast from "react-hot-toast";
import { AiContext } from "./AiContext";
import { sendPrompt } from "../api/chatApi.ts";
import { fetchHistory, type HistoryItem } from "../api/chatApi";
import { type ActiveSection } from "./AiContext";

interface AiContextProviderProps {
  children: ReactNode;
}

const AiContextProvider = ({ children }: AiContextProviderProps) => {
  const [input, setInput] = useState<string>("");
  const [extended, setExtended] = useState<boolean>(false);
  const [recentPrompt, setRecentPrompt] = useState<string>("");
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultData, setResultData] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [toggleTheme, setToggleTheme] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeSection, setActiveSection] = useState<ActiveSection>("chat");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    Boolean(localStorage.getItem("user_id"))
  );
  const [imageCredits, setImageCredits] = useState<number>(0);

  const login = (userId: number) => {
    localStorage.setItem("user_id", String(userId));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("access_token");
    localStorage.removeItem("username")
    setIsAuthenticated(false);
    setHistory([]);
    setRecentPrompt("");
    setResultData("");
  };

  const onHandleTheme = (): void => {
    setToggleTheme((prev) => (prev === "dark" ? "" : "dark"));
  };

  const delayPara = (index: number, nextWord: string): void => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt?: string): Promise<void> => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    const finalPrompt = prompt ?? input;
    setRecentPrompt(finalPrompt);

    setPrevPrompts((prev) =>
      prev.includes(finalPrompt) ? prev : [...prev, finalPrompt]
    );

    const userId = Number(localStorage.getItem("user_id"));
    const response: string = await sendPrompt(userId, finalPrompt);

    setHistory((prev) => [
      {
        id: Date.now(),
        prompt: finalPrompt,
        result: response,
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);

    response.split(" ").forEach((word, index) => {
      delayPara(index, word + " ");
    });

    setLoading(false);
    setInput("");
  };

  const addNewChat = (): void => {
    setLoading(false);
    setRecentPrompt("");
    setShowResult(false);
  };

  const updatesInfo = (): void => {
    toast(
      <div className="flex flex-col items-start">
        <h2 className="mb-3">🔔 Future Updates :</h2>
        <p className="border border-gray-200 px-2 py-2 rounded-2xl bg-gray-100">
          🖼️ Image Upload 📸
        </p>
      </div>,
      { duration: 4000 }
    );
  };

  useEffect(() => {
    const userId = Number(localStorage.getItem("user_id"));
    if (!userId) return;

    fetchHistory(userId).then(setHistory);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token"); 
    if (!token) return;

    fetch(`${import.meta.env.VITE_BACKEND_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setImageCredits(data.image_credits);
      })
      .catch(() => {
        setImageCredits(0);
      });
  }, [isAuthenticated]);

  return (
    <AiContext.Provider
      value={{
        input,
        setInput,
        extended,
        setExtended,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
        updatesInfo,
        addNewChat,
        isListening,
        setIsListening,
        modalContent,
        setModalContent,
        modalState,
        setModalState,
        showProfile,
        setShowProfile,
        onHandleTheme,
        toggleTheme,
        setToggleTheme,
        history,
        setHistory,
        activeSection,
        setActiveSection,
        isAuthenticated,
        login,
        logout,
        imageCredits,
        setImageCredits,
      }}
    >
      {children}
    </AiContext.Provider>
  );
};

export default AiContextProvider;
