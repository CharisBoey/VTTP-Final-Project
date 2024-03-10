create database finalproj;

use finalproj;

create table login (
    
    username varchar(256) not null,
    password varchar(256) not null,
    adminposition boolean,
 
    primary key(username)
);

-- Hardcoded
INSERT INTO login(username, password, adminposition) VALUES
('John', SHA2('JohnPW', 256), true),
('Mary', SHA2('MaryPW', 256), true),
('James', SHA2('JamesPW', 256), true),
('Jennifer', SHA2('JenniferPW', 256), true),
('Robert', SHA2('RobertPW', 256), true),
('Jessica', SHA2('JessicaPW', 256), false),
('Michael', SHA2('MichaelPW', 256), false),
('Emily', SHA2('EmilyPW', 256), false),
('William', SHA2('WilliamPW', 256), false),
('Sarah', SHA2('SarahPW', 256), false),
('David', SHA2('DavidPW', 256), false),
('Ashley', SHA2('AshleyPW', 256), false),
('Joseph', SHA2('JosephPW', 256), false),
('Samantha', SHA2('SamanthaPW', 256), false),
('Christopher', SHA2('ChristopherPW', 256), false),
('Amanda', SHA2('AmandaPW', 256), false),
('Daniel', SHA2('DanielPW', 256), false),
('Elizabeth', SHA2('ElizabethPW', 256), false),
('Matthew', SHA2('MatthewPW', 256), false),
('Megan', SHA2('MeganPW', 256), false)


-- INSERT INTO login(username, password) VALUES ('fred', SHA2('fredpw', 256));

-- SELECT * FROM login WHERE username='fred' AND password=SHA2('fredpw',256);
