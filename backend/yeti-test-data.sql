\echo 'Seed test db with test data?'
\prompt 'Return for yes or control-C to cancel > ' foo

\c yeti_test

INSERT INTO Users
(email, username, password, rating)
VALUES
('test1@test.com', 'test1', 'testpassword', 100),
('test2@test.com', 'test2', 'testpassword', 200),
('test3@test.com', 'test3', 'testpassword', 300),
('test4@test.com', 'test4', 'testpassword', 400),
('test5@test.com', 'test5', 'testpassword', 500),
('test6@test.com', 'test6', 'testpassword', 600),
('test7@test.com', 'test7', 'testpassword', 700),
('test8@test.com', 'test8', 'testpassword', 800),
('test9@test.com', 'test9', 'testpassword', 900),
('test10@test.com', 'test10', 'testpassword', 1000);

-- 10 users

INSERT INTO Posts
(body, rating, latitude, longitude, user_id)
VALUES
('Test post 1', 19, 46.7368046,-116.7693401, 5), -- user #5
('Test post 2', 1, 46.9675537,-119.0395658, 2), -- user #2
('Test post 3', 42, 47.6571934, -117.4235106, 3), -- user #3
('Test post 4', 0, 46.776512, -117.369357, 4), -- user #4
('Test post 5', 63, 46.7587719, -117.1674353, 5), -- user #5
('Test post 6', 999, 46.7464684, -117.1817128, 6); -- user #6

\echo 'Seed prod db with test data?'
\prompt 'Return for yes or control-C to cancel > ' foo

\c yeti

INSERT INTO Users
(email, username, password, rating)
VALUES
('test1@test.com', 'test1', 'testpassword', 100),
('test2@test.com', 'test2', 'testpassword', 200),
('test3@test.com', 'test3', 'testpassword', 300),
('test4@test.com', 'test4', 'testpassword', 400),
('test5@test.com', 'test5', 'testpassword', 500),
('test6@test.com', 'test6', 'testpassword', 600),
('test7@test.com', 'test7', 'testpassword', 700),
('test8@test.com', 'test8', 'testpassword', 800),
('test9@test.com', 'test9', 'testpassword', 900),
('test10@test.com', 'test10', 'testpassword', 1000);

-- 10 users

INSERT INTO Posts
(body, rating, latitude, longitude, user_id)
VALUES
('Test post 1', 19, 46.7368046,-116.7693401, 5), -- user #5
('Test post 2', 1, 46.9675537,-119.0395658, 2), -- user #2
('Test post 3', 42, 47.6571934, -117.4235106, 3), -- user #3
('Test post 4', 0, 46.776512, -117.369357, 4), -- user #4
('Test post 5', 63, 46.7587719, -117.1674353, 5), -- user #5
('Test post 6', 999, 46.7464684, -117.1817128, 6); -- user #6