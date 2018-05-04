ALTER TABLE BlogTags 
ADD CONSTRAINT fk_tags
FOREIGN KEY (tagid)
REFERENCES Tags(id);

ALTER TABLE BlogTags 
ADD CONSTRAINT fk_blogs
FOREIGN KEY (blogid)
REFERENCES Blogs(id);

ALTER TABLE Blogs 
ADD CONSTRAINT fk_authors
FOREIGN KEY (authorid)
REFERENCES Authors(id);