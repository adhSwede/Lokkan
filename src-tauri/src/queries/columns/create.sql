-- create.sql
INSERT INTO
    columns (
        id,
        board_id,
        name,
        position,
        created_at,
        updated_at
    )
VALUES
    (?, ?, ?, ?, ?, ?) RETURNING id as "id!",
    board_id as "board_id!",
    name as "name!",
    position as "position!",
    created_at as "created_at!",
    updated_at as "updated_at!"