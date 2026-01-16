import { useCallback, useContext, useRef } from "react";
import toast from "react-hot-toast";
import { AiContext } from "../context/AiContext";

/**
 * Extend Window interface for SpeechRecognition
 */
declare global {
  interface Window {
    SpeechRecognition?: typeof SpeechRecognition;
    webkitSpeechRecognition?: typeof SpeechRecognition;
  }
}

export function useSpeechToText() {
  const { setInput, setIsListening } = useContext(AiContext);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = useCallback((): void => {
    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      toast.error("Speech Recognition not supported in this browser.", {
        style: { border: "1px solid yellow" },
      });
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("🎤 Listening...");
      setIsListening(true);
    };

    recognition.onspeechstart = () => {
      console.log("🗣️ Speech has started");
    };

    recognition.onspeechend = () => {
      console.log("🔇 Speech has ended");
    };

    recognition.onend = () => {
      console.log("🛑 Stopped listening");
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      console.log("You said:", transcript);
      setInput(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      toast.error("Speech recognition error", {
        style: { border: "1px solid red" },
      });
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  }, [setInput, setIsListening]);

  const stopListening = useCallback((): void => {
    recognitionRef.current?.stop();
  }, []);

  return { startListening, stopListening };
}
