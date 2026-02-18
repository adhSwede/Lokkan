use chrono::{DateTime, Utc};
use std::fs;
use std::path::Path;

pub fn db_exists(db_path: &str) -> bool {
    Path::new(db_path).exists()
}

pub fn get_local_db_timestamp(db_path: &str) -> Option<DateTime<Utc>> {
    let modified = fs::metadata(db_path).ok()?.modified().ok()?;
    Some(DateTime::<Utc>::from(modified))
}
