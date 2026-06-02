use crate::db::models::Task;
use sqlx::{Error, SqlitePool};
use uuid::Uuid;

// <================== Create ==================>
pub async fn create_task(
    pool: &SqlitePool,
    column_id: &str,
    title: &str,
    description: Option<&str>,
    position: i64,
) -> Result<Task, Error> {
    let id = Uuid::new_v4().to_string();
    let now = chrono::Utc::now().to_rfc3339();

    let task = sqlx::query_as::<_, Task>(include_str!("../queries/tasks/create.sql"))
        .bind(&id)
        .bind(column_id)
        .bind(title)
        .bind(description)
        .bind(position)
        .bind(&now)
        .bind(&now)
        .fetch_one(pool)
        .await?;

    println!("✓ Task created.");
    Ok(task)
}

// <================== Update ==================>
pub async fn update_task(
    pool: &SqlitePool,
    id: &str,
    column_id: &str,
    title: &str,
    description: Option<&str>,
    position: i64,
) -> Result<Task, Error> {
    let now = chrono::Utc::now().to_rfc3339();

    let task = sqlx::query_as::<_, Task>(include_str!("../queries/tasks/update.sql"))
        .bind(column_id)
        .bind(title)
        .bind(description)
        .bind(position)
        .bind(&now)
        .bind(id)
        .fetch_one(pool)
        .await?;

    println!("✓ Task updated.");
    Ok(task)
}

pub async fn reorder_task(
    pool: &SqlitePool,
    id: &str,
    column_id: &str,
    position: i64,
) -> Result<Task, Error> {
    let now = chrono::Utc::now().to_rfc3339();

    let task = sqlx::query_as::<_, Task>(include_str!("../queries/tasks/reorder.sql"))
        .bind(column_id)
        .bind(position)
        .bind(&now)
        .bind(id)
        .fetch_one(pool)
        .await?;

    println!("✓ Task updated.");
    Ok(task)
}

// <================== Get ==================>
pub async fn get_all_tasks(pool: &SqlitePool) -> Result<Vec<Task>, Error> {
    let tasks = sqlx::query_as::<_, Task>(include_str!("../queries/tasks/get_all.sql"))
        .fetch_all(pool)
        .await?;

    Ok(tasks)
}

pub async fn get_task_by_id(pool: &SqlitePool, id: &str) -> Result<Task, Error> {
    let task = sqlx::query_as::<_, Task>(include_str!("../queries/tasks/get_by_id.sql"))
        .bind(id)
        .fetch_one(pool)
        .await?;

    Ok(task)
}

pub async fn get_tasks_by_column_id(
    pool: &SqlitePool,
    column_id: &str,
) -> Result<Vec<Task>, Error> {
    let tasks = sqlx::query_as::<_, Task>(include_str!("../queries/tasks/get_by_column_id.sql"))
        .bind(column_id)
        .fetch_all(pool)
        .await?;

    Ok(tasks)
}

// <================== Delete ==================>
pub async fn delete_task(pool: &SqlitePool, id: &str) -> Result<Task, Error> {
    // Fetch first.
    let task = sqlx::query_as::<_, Task>(include_str!("../queries/tasks/get_by_id.sql"))
        .bind(id)
        .fetch_one(pool)
        .await?;

    // Then delete.
    sqlx::query(include_str!("../queries/tasks/delete.sql"))
        .bind(id)
        .execute(pool)
        .await?;

    println!("✓ Task Deleted.");
    Ok(task)
}
