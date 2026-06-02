import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useMatch, useNavigate } from "react-router";

export const NavArrows = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const match = useMatch("/boards/:id");
  const [lastBoardId, setLastBoardId] = useState<string | null>(null);

  useEffect(() => {
    if (match?.params.id) setLastBoardId(match.params.id);
  }, [location, match]);

  const canGoBack = location.pathname !== "/";
  const canGoForward = !canGoBack && !!lastBoardId;

  return (
    <div className="flex gap-1">
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
