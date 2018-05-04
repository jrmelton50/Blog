DELIMITER //
CREATE PROCEDURE spBlogTags (blogid int)
	BEGIN
		SELECT t.name as TagName
		FROM Tags t
		JOIN BlogTags bt on bt.tagid = t.id
		WHERE bt.blogid = blogid;	
	END //
DELIMITER ;

-- drop procedure spBlogTags;
call spBlogTags(1);


