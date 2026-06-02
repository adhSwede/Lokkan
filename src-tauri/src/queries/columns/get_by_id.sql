-- get_by_id.sql
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
    id = ?
