-- get_by_column_id.sql
SELECT
    id as "id!",
    column_id as "column_id!",
    title as "title!",
    description,
    position as "position!",
    created_at as "created_at!",
    updated_at as "updated_at!"
FROM
    tasks
WHERE
    column_id = ?