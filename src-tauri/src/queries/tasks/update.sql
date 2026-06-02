-- update.sql
UPDATE tasks
SET
    column_id = ?,
    title = ?,
    description = ?,
    position = ?,
    updated_at = ?
WHERE
    id = ? RETURNING
    id,
    column_id,
    title,
    description,
    position,
    created_at,
    updated_at
