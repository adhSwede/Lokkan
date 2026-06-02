import { useState, useEffect, useRef, useMemo } from "react";
import {
  readDir,
  readTextFile,
  writeTextFile,
  mkdir,
  exists,
} from "@tauri-apps/plugin-fs";
import { documentDir, join } from "@tauri-apps/api/path";
import { openPath } from "@tauri-apps/plugin-opener";

type Theme = {
  id: string;
  label: string;
  swatch: string;
  colorScheme: string;
  tokens: Record<string, string>;
};

type CategorizedTheme = Theme & { category: string };

const themeModules = import.meta.glob<Theme>("../themes/**/*.json", {
  eager: true,
  import: "default",
});

const bundledThemes: CategorizedTheme[] = Object.entries(themeModules).map(
  ([path, theme]) => {
    const parts = path.split("/");
    const category = parts.length >= 2 ? parts[parts.length - 2] : "other";
    return { ...theme, category };
  },
);

const getDefaultThemeId = (): string => {
  const saved = localStorage.getItem("theme");
  if (saved && bundledThemes.some((t) => t.id === saved)) return saved;
  return "tokyo-night";
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

const seedDefaultThemes = async () => {
  try {
    const themesDir = await getThemesDir();
    for (const theme of bundledThemes) {
      const categoryDir = await join(themesDir, theme.category);
      await mkdir(categoryDir, { recursive: true });
      const filePath = await join(categoryDir, `${theme.id}.json`);
      if (!(await exists(filePath))) {
        const { category: _cat, ...themeData } = theme;
        await writeTextFile(filePath, JSON.stringify(themeData, null, 2));
      }
    }
  } catch (err) {
    console.error("Failed to seed default themes:", err);
  }
};

const loadUserThemes = async (): Promise<CategorizedTheme[]> => {
  try {
    const themesDir = await getThemesDir();
    await mkdir(themesDir, { recursive: true });
    const entries = await readDir(themesDir);
    const results: CategorizedTheme[] = [];

    for (const entry of entries) {
      if (entry.isDirectory) {
        const category = entry.name;
        const subEntries = await readDir(await join(themesDir, entry.name));
        for (const file of subEntries.filter((e) =>
          e.name?.endsWith(".json"),
        )) {
          try {
            const content = await readTextFile(
              await join(themesDir, entry.name, file.name!),
            );
            results.push({ ...(JSON.parse(content) as Theme), category });
          } catch {}
        }
      } else if (entry.name?.endsWith(".json")) {
        try {
          const content = await readTextFile(await join(themesDir, entry.name));
          results.push({
            ...(JSON.parse(content) as Theme),
            category: "other",
          });
        } catch {}
      }
    }

    return results;
  } catch (err) {
    console.error("Failed to load user themes:", err);
    return [];
  }
};

const CATEGORY_ORDER = ["dark", "light"];

const groupByCategory = (
  themes: CategorizedTheme[],
): [string, CategorizedTheme[]][] => {
  const map = new Map<string, CategorizedTheme[]>();
  for (const t of themes) {
    if (!map.has(t.category)) map.set(t.category, []);
    map.get(t.category)!.push(t);
  }
  return [...map.entries()].sort(([a], [b]) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b);
  });
};

export const ThemePicker = () => {
  const [activeId, setActiveId] = useState<string>(() => {
    const id = getDefaultThemeId();
    const theme = bundledThemes.find((t) => t.id === id);
    if (theme) applyTheme(theme);
    return id;
  });
  const [open, setOpen] = useState(false);
  const [userThemes, setUserThemes] = useState<CategorizedTheme[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const allThemes = useMemo(() => {
    const userIds = new Set(userThemes.map((t) => t.id));
    return [...bundledThemes.filter((t) => !userIds.has(t.id)), ...userThemes];
  }, [userThemes]);

  const grouped = useMemo(() => groupByCategory(allThemes), [allThemes]);

  useEffect(() => {
    if (open)
      seedDefaultThemes().then(() => loadUserThemes().then(setUserThemes));
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

  const handleOpenFolder = async () => {
    try {
      await openPath(await getThemesDir());
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
        Theme
        <svg
          className="h-3 w-3 opacity-60"
          viewBox="0 0 10 6"
          fill="currentColor"
        >
          <path d="M0 0l5 6 5-6z" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-1 min-w-full rounded border border-(--color-input) bg-(--color-surface) text-(--color-text) shadow-lg">
          {grouped.map(([category, themes], gi) => (
            <div key={category}>
              <div
                className={`px-3 py-1 text-xs font-semibold tracking-wide text-(--color-text-muted) uppercase${gi > 0 ? " border-t border-(--color-input)" : ""}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveId(t.id);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-1.5 text-left hover:bg-(--color-hover)"
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border"
                    style={{
                      backgroundColor: t.swatch,
                      borderColor: "var(--color-text)",
                    }}
                  >
                    {t.id === activeId && (
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: t.tokens["--color-text"] }}
                      />
                    )}
                  </span>
                  {t.label}
                </button>
              ))}
            </div>
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
