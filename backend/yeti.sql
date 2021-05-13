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