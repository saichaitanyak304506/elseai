import { useContext } from "react";
import { AiContext } from "../context/AiContext";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";
import { BsChatSquare } from "react-icons/bs";
import { Tooltip } from "@radix-ui/themes";
import { IoIosImages } from "react-icons/io";
import { LuFilePen } from "react-icons/lu";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";

const SideBar: React.FC = () => {
  const {
    history,
    setRecentPrompt,
    setShowResult,
    setResultData,
    extended,
    setExtended,
    addNewChat,
    setActiveSection,
  } = useContext(AiContext);

  // Load history item into chat view
  const loadHistory = (item: { prompt: string; result: string }) => {
    setRecentPrompt(item.prompt);
    setResultData(item.result);
    setShowResult(true);
    setActiveSection("chat"); 
  };

  return (
    <div
      className={`${
        extended ? "md:w-[15%] lg:w-[16%]" : "w-[8%] lg:w-[6%]"
      } hidden md:flex flex-col justify-between py-5 px-2
      bg-[#f0f4f9] dark:bg-black dark:border-r dark:border-zinc-900
      h-screen overflow-y-auto`}
    >
      {/* TOP */}
      <div>
        <Tooltip content="Toggle sidebar" side="right">
          <button
            onClick={() => setExtended((prev) => !prev)}
            className="w-10 h-10 p-2 hover:bg-gray-300/40 rounded-full
            dark:text-white cursor-pointer text-gray-700 dark:hover:bg-slate-700"
          >
            {extended ? (
              <FaAngleDoubleLeft size={23} />
            ) : (
              <FaAngleDoubleRight size={23} />
            )}
          </button>
        </Tooltip>

        {/* Image Generator */}
        <div></div>
        <Tooltip content="Generate Image" side="right">
          <button
            onClick={() => setActiveSection("image")}
            className={`flex items-center   bg-[#e6eaf1]
            hover:bg-slate-300 mt-5 dark:bg-transparent dark:text-white dark:hover:bg-slate-700    cursor-pointer w-full ${
              extended
                ? "py-1.5 pl-3 rounded-md  justify-start"
                : "p-4 rounded-2xl  justify-center"
            }`}
          >
            <span className="text-gray-600 dark:text-white flex items-center">
              <IoIosImages size={25} />
            </span>
            {extended && <p className="ml-2">Images</p>}
          </button>
        </Tooltip>

        {/* New Chat */}
        <Tooltip content="New Chat" side="right">
          <button
            onClick={() => {
              addNewChat();
              setActiveSection("chat");
            }}
            className={`flex items-center bg-[#e6eaf1] 
            hover:bg-slate-300 mt-5 dark:bg-transparent dark:text-white dark:hover:bg-slate-700  cursor-pointer w-full ${
              extended
                ? "py-1.5 pl-3 rounded-md  justify-start"
                : "p-4 rounded-2xl  justify-center"
            }`}
          >
            <span className="text-gray-600 dark:text-white   flex items-center">
              <LuFilePen size={25} />
            </span>
            {extended && <p className="ml-2">New Chat</p>}
          </button>
        </Tooltip>

        {/* Recent */}
        {extended && (
          <div className="mt-10">
            <p className="dark:text-white text-sm mb-2">Recent</p>

            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => loadHistory(item)}
                className="flex items-center hover:bg-[#e6eaf1]
                mt-2 py-1.5 pl-2 rounded-md cursor-pointer
                dark:hover:bg-gray-800"
              >
                <BsChatSquare className="dark:text-white" />
                <p className="pl-2 dark:text-white text-sm">
                  {item.prompt.slice(0, 18)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col justify-end gap-y-1.5">
        <Tooltip content="Help" side="right">
          <button
            onClick={() => alert("Help section coming soon")}
            className={`flex items-center   bg-[#e6eaf1]
            hover:bg-slate-300 dark:bg-transparent dark:text-white dark:hover:bg-slate-700    cursor-pointer w-full ${
              extended
                ? "py-1.5 pl-3 rounded-md  justify-start"
                : "p-4 rounded-2xl  justify-center"
            }`}
          >
            <span className="dark:text-white text-gray-600">
              <FaRegCircleQuestion size={23} />
            </span>
            {extended && <p className="ml-3 dark:text-white">Help</p>}
          </button>
        </Tooltip>

        <Tooltip content="History" side="right">
          <button
            onClick={() => setActiveSection("history")}
            className={`flex items-center   bg-[#e6eaf1]
            hover:bg-slate-300 dark:bg-transparent dark:text-white dark:hover:bg-slate-700    cursor-pointer w-full ${
              extended
                ? "py-1.5 pl-3 rounded-md  justify-start"
                : "p-4 rounded-2xl  justify-center"
            }`}
          >
            <span className="dark:text-white text-gray-600">
              <MdHistory size={25} />
            </span>
            {extended && <p className="ml-3 dark:text-white">History</p>}
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default SideBar;
