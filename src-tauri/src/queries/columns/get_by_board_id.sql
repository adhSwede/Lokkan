-- get_by_board_id.sql
SELECT
    id,
    board_id,
    name,
    position,
    created_at,
    updated_at
FROM
    columns
WHERE
    board_id = ?
ORDER BY position ASC