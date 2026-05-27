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
    (?, ?, ?, ?, ?, ?) RETURNING id,
    board_id,
    name,
    position,
    created_at,
    updated_at