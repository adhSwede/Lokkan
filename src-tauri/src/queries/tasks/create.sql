-- create.sql
INSERT INTO
    tasks (
        id,
        column_id,
        title,
        description,
        position,
        created_at,
        updated_at
    )
VALUES
    (?, ?, ?, ?, ?, ?, ?) RETURNING
    id as "id!",
    column_id as "column_id!",
    title as "title!",
    description,
    position as "position!",
    created_at as "created_at!",
    updated_at as "updated_at!"
