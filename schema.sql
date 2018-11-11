-- localhost/ AWS RDS
USE practice

-- jaws
-- USE hslvd22czygy6tk7

-- maria
-- USE oko5qho20klqemu5

-- ClearDB
-- USE heroku_c24d4e601094ee0

DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` CHAR(50),
  `price` INTEGER,
  `latitude` DECIMAL(5,2),
  `longitude` DECIMAL(5,2),
  PRIMARY KEY (`id`)
);

-- LOAD DATA LOCAL INFILE '/Users/adellehousker/portfolio/leagueside/mock.txt'
-- INTO TABLE hslvd22czygy6tk7.teams
-- FIELDS TERMINATED BY ',';

-- connection for heroku:
-- const connection = mysql.createConnection(process.env.JAWSDB_URL || require('../.config').jawsDB);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

-- jaws
 -- mysql --host=l3855uft9zao23e2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com --port=3306 --user=w2x9nirdtkk8ewt0 --password=u7yqf5ks6x3mo93t < schema.sql

 -- Maria
  -- mysql --host=mcldisu5ppkm29wf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com --port=3306 --user=yc7kz9s5oyky3en0 --password=lu89c1ar4o0g4umr < schema.sql

-- ClearDB
-- mysql://b555386fcecb0e:8e60292b@us-cdbr-iron-east-01.cleardb.net/heroku_c24d4e601094ee0?reconnect=true

  -- mysql --host=us-cdbr-iron-east-01.cleardb.net --port=3306 --user=b555386fcecb0e --password=8e60292b < schema.sql

-- gitsaga
 -- mysql --host=g8mh6ge01lu2z3n1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com --port=3306 --user=ctvn0gks6un0wu0m --password=ej6gittkiwcgzxnt

-- https://stackoverflow.com/questions/27043450/populate-multiple-tables-from-a-single-json-object-with-json-populate-recordset



-- WITH input AS (
--    SELECT '{
--       "tablename_a":[{"a_id":1,"b_id":2,"c_id":3},
--        {"a_id":2,"b_id":51,"c_id":3}],
--       "tablename_b":[{"b_id":2,"name":"John Doe", "z_id":123},
--        {"b_id":51,"name":"Mary Ann", "z_id":412}],
--       "tablename_c":[{"c_id":3, "OS type":"Windows 7"}],
--       "tablename_z":[{"z_id":123, "Whatever":"Something"},
--       {"z_id":123, "Whatever":"Something else"}]
--       }'::json AS j
--    )
-- ,  a AS (
--    INSERT INTO tablename_a
--    SELECT t.*
--    FROM   input i
--         , json_populate_recordset(NULL::tablename_a, i.j->'tablename_a') t
--    )
-- ,  b AS (
--    INSERT INTO tablename_b
--    SELECT t.*
--    FROM   input i
--         , json_populate_recordset(NULL::tablename_b, i.j->'tablename_b') t
--    )
--    -- ... more ...
-- INSERT INTO tablename_z
-- SELECT t.*
-- FROM   input i
--      , json_populate_recordset(NULL::tablename_z, i.j->'tablename_z') t
-- ;