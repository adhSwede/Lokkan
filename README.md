# Lokkan

A local-first kanban board. Your planning, your data.

Built with Rust and React, powered by Tauri.

## Status

🚧 **In Development** - This is an exam project currently under active development.

## Concept

- **Local-first**: All data stored in SQLite on your machine
- **Self-owned**: Optional GitHub sync puts your data in _your_ repository
- **Offline-capable**: Works without internet connection
- **Privacy-focused**: No external services, no telemetry

## Tech Stack

- **Backend**: Rust + Tauri + SQLite + sqlx
- **Frontend**: React + Vite + Tailwind CSS
- **Drag & Drop**: @dnd-kit
- **Sync**: GitHub (optional, planned)

## Development Setup

1. Install dependencies:

```bash
   pnpm install
```

2. Copy environment config:

```bash
   cp .env.example .env
```

3. Run development server:

```bash
   pnpm tauri dev
```

The app will compile the Rust backend and start the Vite dev server automatically.

## Architecture

- **Repositories**: Data access layer (SQLite CRUD operations)
- **Commands**: Tauri command layer (bridges frontend ↔ backend)
- **Models**: Type-safe data structures shared between frontend and backend

## Roadmap

- [x] SQLite database with schema
- [x] Full CRUD for boards, columns, and tasks
- [x] Tauri commands wired up
- [ ] Kanban UI with drag-and-drop
- [ ] GitHub sync implementation
- [ ] Settings/configuration UI
- [ ] First stable release

## License

GPL-3.0 - See LICENSE file for details

---

_Your kanban, your rules. No cloud required._
