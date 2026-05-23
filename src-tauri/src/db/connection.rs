use sqlx::sqlite::{SqliteConnectOptions, SqlitePool};
use std::path::PathBuf;

pub async fn create_pool(db_path: PathBuf) -> Result<SqlitePool, sqlx::Error> {
    let options = SqliteConnectOptions::new()
        .filename(db_path)
        .create_if_missing(true);

    SqlitePool::connect_with(options).await
}
