-- create.sql
INSERT INTO
    boards (id, name, description, created_at, updated_at)
VALUES
    (?, ?, ?, ?, ?) RETURNING
    id as "id!",
    name as "name!",
    description,
    created_at as "created_at!",
    updated_at as "updated_at!"
