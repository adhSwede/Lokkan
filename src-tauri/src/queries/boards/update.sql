-- update.sql
UPDATE boards
SET
    name = ?,
    description = ?,
    updated_at = ?
WHERE
    id = ? RETURNING
    id as "id!",
    name as "name!",
    description,
    created_at as "created_at!",
    updated_at as "updated_at!"
