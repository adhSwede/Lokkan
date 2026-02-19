import { Square, X, Minus } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { DarkModeSwitch } from "./DarkModeSwitch";

export const TitleBar = () => {
  const appWindow = getCurrentWindow();

  const handleMinimize = async () => {
    await appWindow.minimize();
  };

  const handleToggleMaximize = async () => {
    await appWindow.toggleMaximize();
  };

  const handleClose = async () => {
    await appWindow.close();
  };

  return (
    <div
      data-tauri-drag-region
      className="box-border flex items-center justify-between p-2.5 px-4 text-(--bg-dark) shadow select-none dark:text-white dark:shadow-white/10"
    >
      <span data-tauri-drag-region className="pointer-events-none">
        Lokkan
      </span>
      {/* Corner Icons */}
      <div className="box-border flex gap-6">
        <DarkModeSwitch />
        <button
          onClick={handleMinimize}
          className="rounded p-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Minus className="pointer-events-none h-auto w-5" />
        </button>
        <button
          onClick={handleToggleMaximize}
          className="rounded p-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Square className="pointer-events-none h-auto w-4" />
        </button>
        <button
          onClick={handleClose}
          className="rounded p-1 transition-colors hover:bg-red-500 dark:hover:bg-red-600"
        >
          <X className="pointer-events-none h-auto w-5" />
        </button>
      </div>
    </div>
  );
};
