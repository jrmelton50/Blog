INSERT INTO Blogs (title, authorid, content)
VALUES ("Test", 1, "This is a test blog");

select * from Blogs;


INSERT INTO Authors (name, email)
VALUES ("Jessie", "jessie.melton@gmail.com");

select * from Authors;


INSERT INTO Tags (name)
VALUES ("Josh");

select * from Tags;


INSERT INTO BlogTags (blogid, tagid)
VALUES (1, 1);

select * from BlogTags;