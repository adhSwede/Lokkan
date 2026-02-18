use crate::db::models::Board;
use sqlx::{Error, SqlitePool};
use uuid::Uuid;

// <================== Create ==================>
pub async fn create_board(
    pool: &SqlitePool,
    name: &str,
    description: Option<&str>,
) -> Result<Board, Error> {
    let id = Uuid::new_v4().to_string();
    let now = chrono::Utc::now().to_rfc3339();

    let board = sqlx::query_file_as!(
        Board,
        "src/queries/boards/create.sql",
        id,
        name,
        description,
        now,
        now
    )
    .fetch_one(pool)
    .await?;

    println!("✓ Board created.");
    Ok(board)
}

// <================== Update ==================>
pub async fn update_board(
    pool: &SqlitePool,
    id: &str,
    name: &str,
    description: Option<&str>,
) -> Result<Board, Error> {
    let now = chrono::Utc::now().to_rfc3339();

    let board = sqlx::query_file_as!(
        Board,
        "src/queries/boards/update.sql",
        name,
        description,
        now,
        id
    )
    .fetch_one(pool)
    .await?;

    println!("✓ Board updated.");
    Ok(board)
}

// <================== Get ==================>
pub async fn get_all_boards(pool: &SqlitePool) -> Result<Vec<Board>, Error> {
    let boards = sqlx::query_file_as!(Board, "src/queries/boards/get_all.sql")
        .fetch_all(pool)
        .await?;

    Ok(boards)
}

pub async fn get_board_by_id(pool: &SqlitePool, id: &str) -> Result<Board, Error> {
    let board = sqlx::query_file_as!(Board, "src/queries/boards/get_by_id.sql", id)
        .fetch_one(pool)
        .await?;

    Ok(board)
}

// <================== Delete ==================>
pub async fn delete_board(pool: &SqlitePool, id: &str) -> Result<Board, Error> {
    // Fetch first.
    let board = sqlx::query_file_as!(Board, "src/queries/boards/get_by_id.sql", id)
        .fetch_one(pool)
        .await?;

    // Then delete.
    sqlx::query_file!("src/queries/boards/delete.sql", id)
        .execute(pool)
        .await?;

    println!("✓ Board Deleted.");
    Ok(board)
}
