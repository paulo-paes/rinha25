CREATE UNLOGGED TABLE balance (
    name TEXT NOT NULL,
    value NUMERIC(12, 2) NOT NULL,
    total NUMERIC(10, 0) NOT NULL,
    status boolean NOT NULL
);



INSERT INTO balance (name, value, total, status)
VALUES ('fall', 0, 0, true);

INSERT INTO balance (name, value, total, status)
VALUES ('def', 0, 0, true);
