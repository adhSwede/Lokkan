-- create.sql
INSERT INTO
    boards (id, name, description, created_at, updated_at)
VALUES
    (?, ?, ?, ?, ?) RETURNING
    id,
    name,
    description,
    created_at,
    updated_at
