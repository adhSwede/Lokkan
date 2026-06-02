-- update.sql
UPDATE boards
SET
    name = ?,
    description = ?,
    updated_at = ?
WHERE
    id = ? RETURNING
    id,
    name,
    description,
    created_at,
    updated_at
