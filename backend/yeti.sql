DROP DATABASE IF EXISTS yeti;
CREATE DATABASE yeti;

\c yeti
\i yeti-schema.sql;

DROP DATABASE IF EXISTS yeti_test;
CREATE DATABASE yeti_test;

\c yeti_test
\i yeti-schema.sql;