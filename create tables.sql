-- use blog;

CREATE TABLE Blogs (
		id int not null auto_increment primary key,
        authorid int not null,
        title varchar(50) not null,
        content varchar(50) not null,
        _created datetime default current_timestamp
);

CREATE TABLE Authors (
		id int not null auto_increment primary key,
        name varchar(50) not null,
        email varchar(50) not null,
        _created datetime default current_timestamp
);

CREATE TABLE Tags (
		id int not null auto_increment primary key,
        name varchar(50) not null,
        _created datetime default current_timestamp
);

CREATE TABLE BlogTags (
		blogid int not null auto_increment primary key,
        tagid int not null,
        _created datetime default current_timestamp
);