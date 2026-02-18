-- update.sql
UPDATE columns
SET
    name = ?,
    position = ?,
    updated_at = ?
WHERE
    id = ? RETURNING
    id as "id!",
    board_id as "board_id!",
    name as "name!",
    position as "position!",
    created_at as "created_at!",
    updated_at as "updated_at!"
