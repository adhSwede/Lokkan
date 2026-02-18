-- get_by_id.sql
SELECT
    id as "id!",
    name as "name!",
    description,
    created_at as "created_at!",
    updated_at as "updated_at!"
FROM
    boards
WHERE
    id = ?
