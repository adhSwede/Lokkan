mod commands;
mod config;
mod db;
mod repositories;
mod sync;

use anyhow::Context;
use config::Config;
use db::connection::create_pool;
use db::schema::initialize_schema;
use sqlx::SqlitePool;
use tauri::Manager;

// <================== State ==================>
/// A common state, to be passed around the app.
pub struct AppState {
    pub pool: SqlitePool,
}

// <================== Init ==================>
// To be initialized before start.
async fn init() -> anyhow::Result<SqlitePool> {
    let config = Config::from_env().context("Failed to load config")?;
    let pool = create_pool(&config.db_path)
        .await
        .context("Failed to create DB pool")?;
    initialize_schema(&pool)
        .await
        .context("Failed to initialize schema")?;
    Ok(pool)
}

// <================== Run ==================>
/// Entry point, called from main.rs
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            let pool = tauri::async_runtime::block_on(init())?;
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
            commands::column_commands::get_all_columns,
            commands::column_commands::get_columns_by_board_id,
            commands::column_commands::get_column_by_id,
            commands::column_commands::delete_column,
            // <== Tasks ==>
            commands::task_commands::create_task,
            commands::task_commands::update_task,
            commands::task_commands::get_all_tasks,
            commands::task_commands::get_task_by_id,
            commands::task_commands::delete_task,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
