-- get_by_id.sql
SELECT
    id,
    column_id,
    title,
    description,
    position,
    created_at,
    updated_at
FROM
    tasks
WHERE
    id = ?
