mod commands;
mod db;
mod repositories;
mod sync;

use anyhow::Context;
use db::connection::create_pool;
use db::schema::initialize_schema;
use sqlx::SqlitePool;
use std::path::PathBuf;
use tauri::Manager;

// <================== State ==================>
pub struct AppState {
    pub pool: SqlitePool,
}

// <================== Init ==================>
async fn init(db_path: PathBuf) -> anyhow::Result<SqlitePool> {
    let pool = create_pool(db_path)
        .await
        .context("Failed to create DB pool")?;
    initialize_schema(&pool)
        .await
        .context("Failed to initialize schema")?;
    Ok(pool)
}

// <================== Run ==================>
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            let data_dir = app.path().document_dir()
                .context("Failed to resolve documents directory")?
                .join("Lokkan");
            std::fs::create_dir_all(&data_dir)
                .context("Failed to create Lokkan data directory")?;
            let db_path = data_dir.join("lokkan.db");
            let pool = tauri::async_runtime::block_on(init(db_path))?;
            app.manage(AppState { pool });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // <== Boards ==>
            commands::board_commands::create_board,
            commands::board_commands::update_board,
            commands::board_commands::get_all_boards,
            commands::board_commands::get_board_by_id,
            commands::board_commands::delete_board,
            // <== Columns ==>
            commands::column_commands::create_column,
            commands::column_commands::update_column,
            commands::column_commands::reorder_column,
            commands::column_commands::get_all_columns,
            commands::column_commands::get_columns_by_board_id,
            commands::column_commands::get_column_by_id,
            commands::column_commands::delete_column,
            // <== Tasks ==>
            commands::task_commands::create_task,
            commands::task_commands::update_task,
            commands::task_commands::reorder_task,
            commands::task_commands::get_all_tasks,
            commands::task_commands::get_task_by_id,
            commands::task_commands::get_tasks_by_column_id,
            commands::task_commands::delete_task,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
