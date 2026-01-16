import { useContext, useState } from "react";
import axios from "axios";
import MainSection from "./MainSection";
import Navbar from "./Navbar";
import { AiContext } from "../context/AiContext";
import toast from "react-hot-toast";

const ImageGeneratorSection = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const { imageCredits, setImageCredits } = useContext(AiContext);

  const generate = async () => {
    if (!prompt.trim()) {
      toast.error("Enter a valid prompt");
      return;
    }

    if (imageCredits <= 0) {
      toast.error("No image credits left");
      return;
    }

    const token = localStorage.getItem("access_token"); // ✅ HERE

    if (!token) {
      toast.error("Please login again");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/generate-image`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ NOW VALID
          },
        }
      );

      setImageUrl(res.data.image_url);
      setImageCredits(res.data.remaining_credits);
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || "Image generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainSection>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <h1 className="text-2xl font-semibold dark:text-white">
          Image Generator
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          🎨 Credits left: {imageCredits}
        </p>

        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image..."
          className="w-full max-w-md border px-4 py-2 rounded-xl dark:bg-zinc-900 dark:text-white outline-violet-600"
        />

        <button
          onClick={generate}
          disabled={loading || imageCredits <= 0}
          className={`px-6 py-2 rounded-xl text-white
            ${
              imageCredits <= 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Generated"
            className="max-w-md rounded-xl shadow-lg"
          />
        )}
      </div>
    </MainSection>
  );
};

export default ImageGeneratorSection;
