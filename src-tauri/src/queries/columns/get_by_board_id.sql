-- get_all.sql
SELECT
    id as "id!",
    board_id as "board_id!",
    name as "name!",
    position as "position!",
    created_at as "created_at!",
    updated_at as "updated_at!"
FROM
    columns 
WHERE
    board_id = ? 