import { Square, X, Minus } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { ThemePicker } from "./ThemePicker";

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
      className="box-border flex items-center justify-between p-2.5 px-4 text-(--color-text) shadow select-none"
    >
      <span data-tauri-drag-region className="pointer-events-none">
        Lokkan
      </span>
      {/* Corner Icons */}
      <div className="box-border flex gap-6">
        <ThemePicker />

        <button
          onClick={handleMinimize}
          className="w-fit rounded p-1.5 transition-colors hover:bg-(--color-hover)"
        >
          <Minus className="pointer-events-none h-auto w-5" />
        </button>
        <button
          onClick={handleToggleMaximize}
          className="w-fit rounded p-2 transition-colors hover:bg-(--color-hover)"
        >
          <Square className="pointer-events-none h-auto w-4" />
        </button>
        <button
          onClick={handleClose}
          className="rounded p-1.5 transition-colors hover:bg-red-500 dark:hover:bg-red-600"
        >
          <X className="pointer-events-none h-auto w-5" />
        </button>
      </div>
    </div>
  );
};
