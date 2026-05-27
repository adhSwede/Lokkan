-- reorder.sql
UPDATE columns
SET
    position = ?,
    updated_at = ?
WHERE
    id = ? RETURNING id,
    board_id,
    name,
    position,
    created_at,
    updated_at