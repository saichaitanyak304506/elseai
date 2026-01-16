import { useContext } from "react";
import SideBar from "./components/SideBar";
import HeroSection from "./components/HeroSection";
import HistorySection from "./components/HistorySection";
import ImageGeneratorSection from "./components/ImageGeneratorSection";
import { AiContext } from "./context/AiContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { toggleTheme, activeSection } = useContext(AiContext);

  return (
    <div className={`${toggleTheme === "dark" ? "dark" : ""} flex h-screen`}>
      <Toaster position="top-center" />
      <SideBar />
     

      {activeSection === "chat" && <HeroSection />}
      {activeSection === "history" && <HistorySection />}
      {activeSection === "image" && <ImageGeneratorSection />}
    </div>
  );
};

export default App;
