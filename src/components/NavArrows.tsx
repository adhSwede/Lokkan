import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export const NavArrows = ({ lastBoardId }: { lastBoardId: string | null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const canGoBack = location.pathname !== "/";
  const canGoForward = !canGoBack && !!lastBoardId;

  return (
    <div className="fixed right-4 bottom-4 flex gap-1">
      <button
        onClick={() => canGoBack && navigate(-1)}
        disabled={!canGoBack}
        className={`rounded p-1 ${canGoBack ? "cursor-pointer hover:bg-(--color-hover)" : "cursor-default text-(--color-text-muted) opacity-40"}`}
        aria-label="Back"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => canGoForward && navigate(`/boards/${lastBoardId}`)}
        disabled={!canGoForward}
        className={`rounded p-1 ${canGoForward ? "cursor-pointer hover:bg-(--color-hover)" : "cursor-default text-(--color-text-muted) opacity-40"}`}
        aria-label="Last board"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
