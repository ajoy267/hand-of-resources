-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS bikes;

CREATE TABLE bikes (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    components TEXT NOT NULL
);

INSERT INTO 
    bikes (brand, model, components)
VALUES 
    ('Specialized', 'S-Works Tarmac SL7', 'Shimano Di2'),
    ('Giant', 'Trinity', 'Sram Etap');