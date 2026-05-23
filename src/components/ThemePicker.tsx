import { useState, useEffect, useRef, useMemo } from "react";
import { readDir, readTextFile, mkdir } from "@tauri-apps/plugin-fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { openPath } from "@tauri-apps/plugin-opener";

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

const bundledThemes = Object.values(themeModules);

const getDefaultThemeId = (): string => {
  const saved = localStorage.getItem("theme");
  if (saved && bundledThemes.some((t) => t.id === saved)) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme.tokens)) {
    root.style.setProperty(key, value);
  }
  root.style.colorScheme = theme.colorScheme;
};

const getThemesDir = async () => {
  const docs = await documentDir();
  return join(docs, "Lokkan", "themes");
};

const loadUserThemes = async (): Promise<Theme[]> => {
  try {
    const themesDir = await getThemesDir();
    await mkdir(themesDir, { recursive: true });
    const entries = await readDir(themesDir);
    const results = await Promise.all(
      entries
        .filter((e) => e.name?.endsWith(".json"))
        .map(async (e) => {
          try {
            const content = await readTextFile(await join(themesDir, e.name!));
            return JSON.parse(content) as Theme;
          } catch {
            return null;
          }
        }),
    );
    return results.filter(Boolean) as Theme[];
  } catch (err) {
    console.error("Failed to load user themes:", err);
    return [];
  }
};

export const ThemePicker = () => {
  const [activeId, setActiveId] = useState<string>(() => {
    const id = getDefaultThemeId();
    const theme = bundledThemes.find((t) => t.id === id);
    if (theme) applyTheme(theme);
    return id;
  });
  const [open, setOpen] = useState(false);
  const [userThemes, setUserThemes] = useState<Theme[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const allThemes = useMemo(() => {
    const userIds = new Set(userThemes.map((t) => t.id));
    return [...bundledThemes.filter((t) => !userIds.has(t.id)), ...userThemes];
  }, [userThemes]);

  // Load user themes on mount so saved user themes apply on startup
  useEffect(() => {
    loadUserThemes().then(setUserThemes);
  }, []);

  // Reload user themes each time the picker opens
  useEffect(() => {
    if (open) loadUserThemes().then(setUserThemes);
  }, [open]);

  // Apply theme whenever active id or theme list changes
  useEffect(() => {
    const theme = allThemes.find((t) => t.id === activeId);
    if (theme) {
      applyTheme(theme);
      localStorage.setItem("theme", activeId);
    }
  }, [activeId, allThemes]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const active = allThemes.find((t) => t.id === activeId);

  const handleOpenFolder = async () => {
    try {
      const themesDir = await getThemesDir();
      await mkdir(themesDir, { recursive: true });
      await openPath(themesDir);
    } catch (err) {
      console.error("Failed to open themes folder:", err);
    }
  };

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
          {allThemes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                applyTheme(t);
                setActiveId(t.id);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left first:rounded-t hover:bg-(--color-hover)"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full border border-(--color-text)/20"
                style={{ backgroundColor: t.swatch }}
              />
              {t.label}
            </button>
          ))}
          <button
            onClick={handleOpenFolder}
            className="w-full rounded-b border-t border-(--color-input) px-3 py-1.5 text-left text-(--color-text-muted) hover:bg-(--color-hover)"
          >
            Open themes folder…
          </button>
        </div>
      )}
    </div>
  );
};
