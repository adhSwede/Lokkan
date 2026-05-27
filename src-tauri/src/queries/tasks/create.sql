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
    id,
    column_id,
    title,
    description,
    position,
    created_at,
    updated_at
