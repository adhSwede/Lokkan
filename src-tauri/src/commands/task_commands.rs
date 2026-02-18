use crate::db::models::Task;
use crate::repositories::tasks;
use crate::AppState;

// <================== Create ==================>
#[tauri::command]
pub async fn create_task(
    state: tauri::State<'_, AppState>,
    column_id: String,
    title: String,
    description: Option<String>,
    position: i64,
) -> Result<Task, String> {
    tasks::create_task(
        &state.pool,
        &column_id,
        &title,
        description.as_deref(),
        position,
    )
    .await
    .map_err(|e| e.to_string())
}

// <================== Update ==================>
#[tauri::command]
pub async fn update_task(
    state: tauri::State<'_, AppState>,
    id: String,
    column_id: String,
    title: String,
    description: Option<String>,
    position: i64,
) -> Result<Task, String> {
    tasks::update_task(
        &state.pool,
        &id,
        &column_id,
        &title,
        description.as_deref(),
        position,
    )
    .await
    .map_err(|e| e.to_string())
}

// <================== Get ==================>
#[tauri::command]
pub async fn get_all_tasks(state: tauri::State<'_, AppState>) -> Result<Vec<Task>, String> {
    tasks::get_all_tasks(&state.pool)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_task_by_id(state: tauri::State<'_, AppState>, id: String) -> Result<Task, String> {
    tasks::get_task_by_id(&state.pool, &id)
        .await
        .map_err(|e| e.to_string())
}

// <================== Delete ==================>
#[tauri::command]
pub async fn delete_task(state: tauri::State<'_, AppState>, id: String) -> Result<Task, String> {
    tasks::delete_task(&state.pool, &id)
        .await
        .map_err(|e| e.to_string())
}
