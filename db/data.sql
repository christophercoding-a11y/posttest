INSERT INTO user(first_name, last_name, email, password)
VALUES ('Christopher', 'Jackson', 'christopherjack11@gmail.com', 'test123!');

INSERT INTO user(first_name, last_name, email, password, imgUrl)
VALUES ('Christian', 'Jackson', 'christianjack11@gmail.com', 'test147!', 'christian.jpeg');

UPDATE user SET imgUrl = 'me.jpeg' where user_id = 1;