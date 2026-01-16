import {type ReactNode } from "react";

const MainSection = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex-1 h-screen overflow-y-auto bg-white dark:bg-black">
      {children}
    </div>
  );
};

export default MainSection;
