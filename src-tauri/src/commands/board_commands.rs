use crate::db::models::Board;
use crate::repositories::boards;
use crate::AppState;

// <================== Create ==================>
#[tauri::command]
pub async fn create_board(
    state: tauri::State<'_, AppState>,
    name: String,
    description: Option<String>,
) -> Result<Board, String> {
    boards::create_board(&state.pool, &name, description.as_deref())
        .await
        .map_err(|e| e.to_string())
}

// <================== Update ==================>
#[tauri::command]
pub async fn update_board(
    state: tauri::State<'_, AppState>,
    id: String,
    name: String,
    description: Option<String>,
) -> Result<Board, String> {
    boards::update_board(&state.pool, &id, &name, description.as_deref())
        .await
        .map_err(|e| e.to_string())
}

// <================== Get ==================>
#[tauri::command]
pub async fn get_all_boards(state: tauri::State<'_, AppState>) -> Result<Vec<Board>, String> {
    boards::get_all_boards(&state.pool)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_board_by_id(
    state: tauri::State<'_, AppState>,
    id: String,
) -> Result<Board, String> {
    boards::get_board_by_id(&state.pool, &id)
        .await
        .map_err(|e| e.to_string())
}

// <================== Delete ==================>
#[tauri::command]
pub async fn delete_board(state: tauri::State<'_, AppState>, id: &str) -> Result<Board, String> {
    boards::delete_board(&state.pool, id)
        .await
        .map_err(|e| e.to_string())
}
