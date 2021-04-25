\echo 'Delete and recreate yeti db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS yeti;
CREATE DATABASE yeti;

\c yeti
\i yeti-schema.sql;

\echo 'Delete and recreate yeti_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS yeti_test;
CREATE DATABASE yeti_test;

\c yeti_test
\i yeti-schema.sql;

INSERT INTO Users
(email, username, password)
VALUES
('first@first.com', 'firstuser', 'testpassword'),
('second@test.com', 'secondguy', 'testpassword');

INSERT INTO Posts
(title, body, latitude, longitude, user_id)
VALUES 
('First', 'First Post', 46.7352, -117.1729, 1),
('Second', 'Second Post', 44.7352, -115.1729, 1),
('Third', 'Third Post', 22.7352, -118.1729, 2),
('Fourth', 'Fourth Post', 20.7352, -118.1729, 2);