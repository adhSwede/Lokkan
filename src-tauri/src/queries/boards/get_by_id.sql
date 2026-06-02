-- get_by_id.sql
SELECT
    id,
    name,
    description,
    created_at,
    updated_at
FROM
    boards
WHERE
    id = ?
