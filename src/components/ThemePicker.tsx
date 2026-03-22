import { useState, useEffect, useRef } from "react";

type Theme = {
  id: string;
  label: string;
  swatch: string;
  colorScheme: string;
  tokens: Record<string, string>;
};

const themeModules = import.meta.glob<Theme>("../themes/*.json", {
  eager: true,
  import: "default",
});

const themes = Object.values(themeModules);

function getDefaultThemeId(): string {
  const saved = localStorage.getItem("theme");
  if (saved && themes.some((t) => t.id === saved)) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.tokens)) {
    root.style.setProperty(key, value);
  }
  root.style.colorScheme = theme.colorScheme;
}

export const ThemePicker = () => {
  const [activeId, setActiveId] = useState<string>(() => {
    const id = getDefaultThemeId();
    const theme = themes.find((t) => t.id === id);
    if (theme) applyTheme(theme);
    return id;
  });
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const theme = themes.find((t) => t.id === activeId);
    if (theme) {
      applyTheme(theme);
      localStorage.setItem("theme", activeId);
    }
  }, [activeId]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const active = themes.find((t) => t.id === activeId);

  return (
    <div ref={ref} className="relative p-1 text-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer items-center gap-1.5 rounded px-2 py-0.5 text-(--color-text)"
      >
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full border border-(--color-text)/20"
          style={{ backgroundColor: active?.swatch }}
        />
        {active?.label}
      </button>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-1 min-w-full rounded border border-(--color-input) bg-(--color-surface) text-(--color-text) shadow-lg">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveId(t.id);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left first:rounded-t last:rounded-b hover:bg-(--color-hover)"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full border border-(--color-text)/20"
                style={{ backgroundColor: t.swatch }}
              />
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
