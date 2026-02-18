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
    id as "id!",
    column_id as "column_id!",
    title as "title!",
    description,
    position as "position!",
    created_at as "created_at!",
    updated_at as "updated_at!"
