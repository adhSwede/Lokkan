-- update.sql
UPDATE columns
SET
    name = ?,
    position = ?,
    updated_at = ?
WHERE
    id = ? RETURNING
    id,
    board_id,
    name,
    position,
    created_at,
    updated_at
