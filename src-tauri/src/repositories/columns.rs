use crate::db::models::Column;
use sqlx::{Error, SqlitePool};
use uuid::Uuid;

// <================== Create ==================>
pub async fn create_column(
    pool: &SqlitePool,
    name: &str,
    board_id: &str,
    position: i64,
) -> Result<Column, Error> {
    let id = Uuid::new_v4().to_string();
    let now = chrono::Utc::now().to_rfc3339();

    let column = sqlx::query_as::<_, Column>(include_str!("../queries/columns/create.sql"))
        .bind(&id)
        .bind(board_id)
        .bind(name)
        .bind(position)
        .bind(&now)
        .bind(&now)
        .fetch_one(pool)
        .await?;

    println!("✓ Column created.");
    Ok(column)
}

// <================== Update ==================>
pub async fn update_column(
    pool: &SqlitePool,
    id: &str,
    name: &str,
    position: i64,
) -> Result<Column, Error> {
    let now = chrono::Utc::now().to_rfc3339();

    let column = sqlx::query_as::<_, Column>(include_str!("../queries/columns/update.sql"))
        .bind(name)
        .bind(position)
        .bind(&now)
        .bind(id)
        .fetch_one(pool)
        .await?;

    println!("✓ Column updated.");
    Ok(column)
}

pub async fn reorder_column(pool: &SqlitePool, id: &str, position: i64) -> Result<Column, Error> {
    let now = chrono::Utc::now().to_rfc3339();

    let column = sqlx::query_as::<_, Column>(include_str!("../queries/columns/reorder.sql"))
        .bind(position)
        .bind(&now)
        .bind(id)
        .fetch_one(pool)
        .await?;

    println!("✓ Column updated.");
    Ok(column)
}

// <================== Get ==================>
pub async fn get_all_columns(pool: &SqlitePool) -> Result<Vec<Column>, Error> {
    let columns = sqlx::query_as::<_, Column>(include_str!("../queries/columns/get_all.sql"))
        .fetch_all(pool)
        .await?;

    Ok(columns)
}

pub async fn get_column_by_id(pool: &SqlitePool, id: &str) -> Result<Column, Error> {
    let column = sqlx::query_as::<_, Column>(include_str!("../queries/columns/get_by_id.sql"))
        .bind(id)
        .fetch_one(pool)
        .await?;

    Ok(column)
}

pub async fn get_columns_by_board_id(
    pool: &SqlitePool,
    board_id: &str,
) -> Result<Vec<Column>, Error> {
    let columns =
        sqlx::query_as::<_, Column>(include_str!("../queries/columns/get_by_board_id.sql"))
            .bind(board_id)
            .fetch_all(pool)
            .await?;

    Ok(columns)
}

// <================== Delete ==================>
pub async fn delete_column(pool: &SqlitePool, id: &str) -> Result<Column, Error> {
    // Fetch first.
    let column = sqlx::query_as::<_, Column>(include_str!("../queries/columns/get_by_id.sql"))
        .bind(id)
        .fetch_one(pool)
        .await?;

    // Then delete.
    sqlx::query(include_str!("../queries/columns/delete.sql"))
        .bind(id)
        .execute(pool)
        .await?;

    println!("✓ Column Deleted.");
    Ok(column)
}
