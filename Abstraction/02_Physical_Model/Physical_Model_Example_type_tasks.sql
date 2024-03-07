SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=1;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=1;


use crud_mysql_dev;
insert into user (username,email,password,role) values ('P_100','correo_01@test.com','123','user');
insert into user (username,email,password,role) values ('P_200','correo_02@test.com','123','admin');
insert into user (username,email,password,role) values ('P_300','correo_03@test.com','123','user');


use crud_mysql_dev;
insert into type_task (name,description) values ('Work','Task from Work');
insert into type_task (name,description) values ('House','Task from House');
insert into type_task (name,description) values ('University','Task from University');
insert into type_task (name,description) values ('Family','Task from Family');


use crud_mysql_dev;
insert into task (user_id,type_task_id ,title,description,done) values (1,3,'Test 01','Description 01',0);
insert into task (user_id,type_task_id ,title,description,done) values (2,2,'Test 02','Description 02',1);
insert into task (user_id,type_task_id ,title,description,done) values (3,1,'Test 03','Description 03',0);

insert into task (user_id,type_task_id ,title,description,done) values (4,1,'Test 03','Description 03',0);
insert into task (user_id,type_task_id ,title,description,done) values (1,5,'Test 03','Description 03',0);
insert into task (user_id,type_task_id ,title,description,done) values (4,5,'Test 03','Description 03',0);



use crud_mysql_dev;
select * from crud_mysql_dev.user;

use crud_mysql_dev;
select * from crud_mysql_dev.type_task;

use crud_mysql_dev;
select * from crud_mysql_dev.task;



use crud_mysql_dev;

use crud_mysql_dev;
update user set role='user'
where id=3;





