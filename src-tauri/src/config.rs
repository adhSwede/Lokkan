use dotenvy::dotenv;
use std::env;

pub struct Config {
    pub db_path: String,
    // pub github_token: String,
    // pub github_repo: String,
    // pub github_owner: String,
}

impl Config {
    pub fn from_env() -> anyhow::Result<Self> {
        dotenv().ok();

        Ok(Config {
            db_path: env::var("DATABASE_URL").unwrap_or_else(|_| "sqlite:kanban.db".to_string()),
        })
    }
}
