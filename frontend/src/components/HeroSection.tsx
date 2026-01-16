import { useContext } from "react";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

import Navbar from "./Navbar";
import Cards from "./Cards";
import ListenerButton from "./ListenerButton";

import { assets } from "../assets/assets.ts";
import { AiContext } from "../context/AiContext";
import { useSpeechToText } from "../hooks/useSpeechToText";

import { FaRegStopCircle, FaMicrophoneAlt } from "react-icons/fa";
import { RiImageCircleFill, RiSendPlane2Fill } from "react-icons/ri";
import { Tooltip } from "@radix-ui/themes";

const HeroSection: React.FC = () => {
  const {
    input,
    setInput,
    onSent,
    showResult,
    resultData,
    recentPrompt,
    loading,
    updatesInfo,
    addNewChat,
    isListening,
    setModalContent,
    setModalState,
  } = useContext(AiContext);

  const { startListening, stopListening } = useSpeechToText();

  const onHandleInput = (): void => {
    if (!input.trim()) {
      toast("‼️ Enter Valid Text ‼️");
      return;
    }
    onSent(input);
  };

  const renderResult = () => (
    <div className="flex flex-col gap-y-5 w-full max-w-[700px] max-h-[600px] overflow-y-auto pb-15 mb-10">
      <div className="flex items-center justify-end">
        <p className="mr-3">{recentPrompt}</p>
        <img
          src={assets.user_icon}
          alt="user-icon"
          className="w-9 h-9 rounded-full"
        />
      </div>

      <div className="flex items-start p-3 gap-3">
        <img
          src={assets.gemini_icon}
          alt="gemini-icon"
          className="w-9 h-9 rounded-full"
        />

        {loading ? (
          <div
            className="animate-spin inline-block size-6 border-3 border-current border-t-transparent rounded-full mt-1"
            role="status"
          />
        ) : (
          <div className="prose prose-slate max-w-[700px] text-[17px] leading-8 tracking-wide mt-4 dark:text-white">
            <ReactMarkdown>{resultData}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col relative dark:bg-black">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center">
        {showResult ? (
          renderResult()
        ) : (
          <>
            <div className="text-left mb-6">
              <p className="text-2xl md:text-5xl font-medium">
                <span className="bg-linear-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">
                  Hello, Dev.
                </span>
              </p>
              <p className="text-2xl md:text-5xl font-medium text-[#c4c7c5]">
                How can I help you today?
              </p>
            </div>
            <Cards />
          </>
        )}

        {/* Input section */}
        <div className="absolute bottom-1 md:bottom-4 w-full max-w-[800px] z-40">
          <div className="flex items-center justify-between bg-[#f0f4f9] px-8 py-3 border border-gray-300 rounded-2xl gap-3 dark:bg-black dark:border dark:border-gray-400">
            {isListening ? (
              <ListenerButton />
            ) : (
              <input
                type="text"
                placeholder="Enter a prompt here"
                className="flex-1 outline-none border-none dark:text-white"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            )}

            <div className="flex items-center gap-4">
              {!isListening && (
                <Tooltip content="Image Upload" side="top">
                  <button
                    onClick={updatesInfo}
                    className="cursor-pointer hover:bg-gray-200 rounded-md p-1.5 dark:text-white dark:hover:bg-slate-700"
                  >
                    <RiImageCircleFill size={28} />
                  </button>
                </Tooltip>
              )}

              {isListening ? (
                <>
                  <Tooltip content="Stop Audio" side="top">
                    <button
                      onClick={stopListening}
                      className="cursor-pointer hover:bg-gray-200 rounded-md p-1.5 dark:text-white dark:hover:bg-slate-700"
                    >
                      <FaRegStopCircle size={28} />
                    </button>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip content="Start Audio" side="top">
                    <button
                      onClick={startListening}
                      className="cursor-pointer hover:bg-gray-200 rounded-md p-1.5 dark:text-white dark:hover:bg-slate-700"
                    >
                      <FaMicrophoneAlt size={25} />
                    </button>
                  </Tooltip>
                </>
              )}

              <Tooltip content="Send Text" side="top">

              <button
              
                onClick={onHandleInput}
                className="cursor-pointer hover:bg-gray-200 rounded-md p-1.5 dark:text-white dark:hover:bg-slate-700"
              >
                <RiSendPlane2Fill size={25} />
              </button>
              </Tooltip>
            </div>
          </div>

          <p className="text-center text-gray-700 hidden md:block">
            AI can make mistakes. Double-check responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
