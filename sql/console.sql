CREATE TABLE USERS(
    id INTEGER auto_increment,
    userName varchar(32) unique not null,
    passWord varchar(64) not null,
    nickName varchar(16) unique not null,
    registrationDate timestamp,
    learningUnitId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY UNITS(learningUnitId) REFERENCES UNITS(id, alreadyWords)
);

CREATE TABLE UNITS(
    id INTEGER auto_increment,
    alreadyWords varchar(32) not null
);

