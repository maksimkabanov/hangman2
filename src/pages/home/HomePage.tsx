import { useState } from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { GameComponent } from "../../features/Game/GameComponent";
import { Statistics } from "../../components/Statistics";

export const HomePage = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const onResetAllClick = () => {};

  return (
    <div className="fixed inset-0 flex flex-col items-center w-full h-[100svh] min-h-[100dvh] overflow-hidden">
      {/* Header */}
      <div className="flex flex-row items-center text-gray-300 border-b w-full">
        <div className="text-red-100">
          <IconButton onClick={onResetAllClick} color="inherit">
            <RestartAltIcon />
          </IconButton>
        </div>
        <span className="mx-auto text-center flex-1">
          Hello in Hangman by Maksim!
        </span>
        <div className="ml-auto"></div>
        {/* Burger menu (visible only on small screens) */}
        <div className="hidden max-md:flex text-blue-700">
          <IconButton onClick={() => setShowSidebar(true)} color="inherit">
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      {/* Main layout (game + stats) */}
      <div className="flex flex-1 w-full h-full overflow-hidden">
        {/* Game area */}
        <div className="flex flex-col flex-1 min-w-[400px] overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <GameComponent />
          </div>
          <div className="absolute bottom-2 left-2 text-gray-200 text-sm">
            Version: 0.1.20
          </div>
        </div>

        {/* Stats (visible on large screens) */}
        <div className="hidden md:flex flex-col border-l p-2 min-w-[300px] h-full justify-center bg-gray-900 text-white">
          <Statistics />
        </div>
      </div>

      {/* Sidebar for smaller screens */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-900 text-white shadow-md transform ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden overflow-y-auto flex justify-center`}
        style={{ minWidth: "min(75vw, 300px)" }}
      >
        <div className="p-4 flex flex-col h-full w-full">
          <Statistics onBurgerClick={() => setShowSidebar(false)} />
        </div>
      </div>
    </div>
  );
};
