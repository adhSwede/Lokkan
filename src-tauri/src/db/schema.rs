use sqlx::SqlitePool;

pub async fn execute_query(pool: &SqlitePool, query: &str) -> Result<(), sqlx::Error> {
    sqlx::query(query).execute(pool).await?;
    Ok(())
}

async fn init_boards_table(pool: &SqlitePool) -> Result<(), sqlx::Error> {
    execute_query(
        pool,
        r#"
        CREATE TABLE IF NOT EXISTS boards (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
        "#,
    )
    .await?;

    println!("✓ Boards table Initialized...");
    Ok(())
}

async fn init_columns_table(pool: &SqlitePool) -> Result<(), sqlx::Error> {
    execute_query(
        pool,
        r#"
        CREATE TABLE IF NOT EXISTS columns (
            id TEXT PRIMARY KEY,
            board_id TEXT NOT NULL,
            name TEXT NOT NULL,
            position INTEGER NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE
        )
        "#,
    )
    .await?;

    println!("✓ Columns table Initialized...");
    Ok(())
}

async fn init_tasks_table(pool: &SqlitePool) -> Result<(), sqlx::Error> {
    execute_query(
        pool,
        r#"
        CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            column_id TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            position INTEGER NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            FOREIGN KEY (column_id) REFERENCES columns(id) ON DELETE CASCADE
        )   
        "#,
    )
    .await?;

    println!("✓ Tasks table Initialized...");
    Ok(())
}

pub async fn initialize_schema(pool: &SqlitePool) -> Result<(), sqlx::Error> {
    init_boards_table(pool).await?;
    init_columns_table(pool).await?;
    init_tasks_table(pool).await?;
    println!("✓✓ Table initialization complete!");
    Ok(())
}
