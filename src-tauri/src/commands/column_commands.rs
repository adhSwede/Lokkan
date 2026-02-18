use crate::db::models::Column;
use crate::repositories::columns;
use crate::AppState;

// <================== Create ==================>
#[tauri::command]
pub async fn create_column(
    state: tauri::State<'_, AppState>,
    name: String,
    board_id: String,
    position: i64,
) -> Result<Column, String> {
    columns::create_column(&state.pool, &name, &board_id, position)
        .await
        .map_err(|e| e.to_string())
}

// <================== Update ==================>
#[tauri::command]
pub async fn update_column(
    state: tauri::State<'_, AppState>,
    id: String,
    name: String,
    position: i64,
) -> Result<Column, String> {
    columns::update_column(&state.pool, &id, &name, position)
        .await
        .map_err(|e| e.to_string())
}

// <================== Get ==================>
#[tauri::command]
pub async fn get_all_columns(state: tauri::State<'_, AppState>) -> Result<Vec<Column>, String> {
    columns::get_all_columns(&state.pool)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_column_by_id(
    state: tauri::State<'_, AppState>,
    id: String,
) -> Result<Column, String> {
    columns::get_column_by_id(&state.pool, &id)
        .await
        .map_err(|e| e.to_string())
}

// <================== Delete ==================>
#[tauri::command]
pub async fn delete_column(
    state: tauri::State<'_, AppState>,
    id: String,
) -> Result<Column, String> {
    columns::delete_column(&state.pool, &id)
        .await
        .map_err(|e| e.to_string())
}
