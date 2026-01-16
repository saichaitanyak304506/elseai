import { useContext, useState } from "react";
import { AiContext } from "../context/AiContext";
import { IoIosCloseCircle } from "react-icons/io";
import { deleteHistory } from "../api/chatApi";

const HistoryContent: React.FC = () => {
  const { history, setHistory } = useContext(AiContext);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const removeHistoryItem = async (id: number): Promise<void> => {
    try {
      await deleteHistory(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete history", error);
    }
  };

  const filteredHistory = history.filter((item) =>
    item.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-3 h-full overflow-y-auto">
      <h2 className="text-2xl font-semibold">History</h2>

      <input
        type="text"
        placeholder="Search your history..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-4 px-3 py-2 outline-none border-[1.5px] border-gray-400 w-full rounded-md"
      />

      <div className="pt-5 px-1">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="flex flex-col border-b border-gray-200 p-3 mb-2 hover:bg-gray-200/20 rounded-2xl"
            >
              <div className="flex items-center justify-between">
                <p className="text-[18px] line-clamp-1">{item.prompt}</p>

                <button
                  onClick={() => removeHistoryItem(item.id)}
                  className="text-red-500 cursor-pointer"
                >
                  <IoIosCloseCircle size={20} />
                </button>
              </div>

              <p className="">{item.result}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center pt-10">
            No results found.
          </p>
        )}
      </div>
    </div>
  );
};

export default HistoryContent;
