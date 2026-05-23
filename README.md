# Lokkan

A local-first kanban board. Your planning, your data.

Built with Rust and React, powered by Tauri.

## Status

In development - exam project.

## Concept

- **Local-first**: All data stored in SQLite on your machine
- **Offline-capable**: Works without internet connection
- **Privacy-focused**: No external services, no telemetry

## Tech Stack

- **Backend**: Rust + Tauri + SQLite + sqlx
- **Frontend**: React + Vite + Tailwind CSS
- **Drag and drop**: @dnd-kit

## Development Setup

1. Install dependencies:

```bash
pnpm install
```

2. Run development server:

```bash
pnpm tauri dev
```

The app will compile the Rust backend and start the Vite dev server automatically. The database and data directory are created automatically on first launch.

## Architecture

- **Repositories**: Data access layer (SQLite CRUD operations)
- **Commands**: Tauri command layer (bridges frontend and backend)
- **Models**: Type-safe data structures shared between frontend and backend

## Roadmap

- [x] SQLite database with schema
- [x] Full CRUD for boards, columns, and tasks
- [x] Tauri commands wired up
- [x] Kanban UI with drag and drop
- [x] Custom theming with user-defined themes
- [ ] GitHub sync (planned)
- [ ] Settings UI
- [ ] First stable release

## License

GPL-3.0 - See LICENSE file for details

---

_Your kanban, your rules. No cloud required._
