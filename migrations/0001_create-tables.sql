-- Migration number: 0001 	 2024-08-06T07:51:17.649Z
--table movie
--  -title
-- -release date
--  -rating (1-5)

DROP TABLE IF EXISTS movies;
CREATE TABLE movies(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    release_date  TEXT NOT NULL,
    rating INTEGER NOT NULL
);