import { useContext, useState } from "react";
import { AiContext } from "../context/AiContext";
import { deleteHistory } from "../api/chatApi";
import { Card, Text, Button, Flex, Tooltip } from "@radix-ui/themes";
import { BsTrash } from "react-icons/bs";
import Navbar from "./Navbar";

const HistorySection: React.FC = () => {
  const { history, setHistory } = useContext(AiContext);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      setLoadingId(id);
      await deleteHistory(id);

      // ✅ Update UI without reload
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen w-full dark:bg-black">
        <Navbar />
        <div className="p-6 overflow-y-auto ">
          <h1 className="text-2xl font-medium dark:text-white">Chat History</h1>

          <Flex direction="column" gap="3" className="mt-5">
            {history.length === 0 && (
              <Text color="gray">No history found.</Text>
            )}

            {history.map((item) => (
              <>
                <div className="flex items-center justify-between py-3 px-2.5 border border-gray-300 rounded-lg">
                  <p className="dark:text-white">{item.prompt}</p>

                  <Tooltip content="Delete">
                    <button
                      className="cursor-pointer text-red-600 p-3 rounded-md hover:text-white hover:bg-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      <BsTrash />
                    </button>
                  </Tooltip>
                </div>
              </>
            ))}
          </Flex>
        </div>
      </div>
    </>
  );
};

export default HistorySection;
