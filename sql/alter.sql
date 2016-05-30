ALTER TABLE user ADD COLUMN weixin_open_id varchar(28);
/*------------------ 2015-02-06 ---------------------------*/
ALTER TABLE booking ADD COLUMN c_status_id int AFTER status_id; /*直客下的订单状态*/
ALTER TABLE booking ADD COLUMN c_booker_name varchar(20) AFTER c_status_id; /*下订单直客姓名*/
ALTER TABLE booking ADD COLUMN c_booker_telephone varchar(50) AFTER c_booker_name; /*直客电话*/
ALTER TABLE booking ADD COLUMN c_booker_email varchar(50) AFTER c_booker_telephone; /*直客邮箱*/
ALTER TABLE booking ADD COLUMN c_shipping_address varchar(100) AFTER c_booker_email; /*直客快递地址*/
ALTER TABLE booking ADD COLUMN c_booker_comment varchar(255) AFTER c_shipping_address; /*直客备注*/
ALTER TABLE booking ADD CONSTRAINT FK_BOOKING_STATUS_C FOREIGN KEY (c_status_id) REFERENCES booking_status (id) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE booking_position ADD COLUMN price decimal(10,2) AFTER deal_price_child;       /*1、2人价, 默认=product_position.price*/
ALTER TABLE booking_position ADD COLUMN price_2 decimal(10,2) AFTER price;      /*3、4人价, 默认=product_position.price_2*/
ALTER TABLE booking_position ADD COLUMN price_child decimal(10,2) AFTER price_2;  /*儿童价, 默认=product_position.price_child*/
/*------------------ 2015-02-05 ---------------------------*/
ALTER TABLE user ADD COLUMN parent_id BIGINT;/*上级分销商或介绍人(推广者)的用户ID*/
ALTER TABLE user ADD COLUMN retail_level INT DEFAULT 0;/*非分销商->0， 一级分销商->1， 二级分销商->2*/
ALTER TABLE user ADD CONSTRAINT FK_USER_PARENT_ID FOREIGN KEY (parent_id) REFERENCES user(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE product ADD COLUMN retail_commission decimal(10,2) AFTER booking_note;/*上级分销商或介绍人(推广者)的返点金额*/
/*------------------ 2015-02-02 ---------------------------*/
DROP TABLE IF EXISTS product_category;
CREATE TABLE product_category(
  id bigint(20) NOT NULL AUTO_INCREMENT,
  product_id bigint(20) NOT NULL,
  special int DEFAULT 0, /*特色航线*/
  early_booking int DEFAULT 0,/*早订优惠*/
  cheap int DEFAULT 0,/*特惠*/
  PRIMARY KEY (id),
  CONSTRAINT FK_PRODUCT_SPECIAL_PID FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE
 )ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*------------------ 2015-01-16 ---------------------------*/
ALTER TABLE cruise_ship ADD COLUMN company_id int AFTER id;
UPDATE cruise_company src, cruise_ship target SET target.company_id = src.id WHERE target.txtCompanyNo = src.txtCompanyNo;
ALTER TABLE cruise_ship ADD CONSTRAINT FK_SHIP_COMPANYID FOREIGN KEY (company_id) REFERENCES cruise_company (id) ON DELETE CASCADE ON UPDATE CASCADE;

update ship_culinary set type=NULL where type = 'NULL';
  update ship_culinary set deck_level=NULL where deck_level = 'NULL';
  update ship_culinary set fees=NULL where fees = 'NULL';
  update ship_culinary set clothing=NULL where clothing = 'NULL';
  update ship_culinary set opening_time=NULL where opening_time = 'NULL';
  update ship_culinary set reservation=NULL where reservation = 'NULL';
/*------------------ 2015-01-03 ---------------------------*/
ALTER TABLE cabin_category CHANGE txtDeckLevel txtDecks varchar(50) DEFAULT NULL;
 UPDATE cabin_category SET txtDecks = NULL WHERE txtDecks = 'NULL'; 
 UPDATE cabin_category SET txtCabinSize = NULL WHERE txtCabinSize = 'NULL'; 
 UPDATE cabin_category SET txtCabinFacility = NULL WHERE txtCabinFacility = 'NULL';
 UPDATE cabin_category SET rtfCabinImg = NULL WHERE rtfCabinImg = 'NULL';
ALTER TABLE cabin_category ADD COLUMN ship_id int AFTER id;
ALTER TABLE cabin_category ADD CONSTRAINT FK_CABINCAT_SHIPID FOREIGN KEY (ship_id) REFERENCES cruise_ship (id) ON DELETE CASCADE ON UPDATE CASCADE; 
UPDATE cabin_category target, cruise_ship src SET target.ship_id = src.id WHERE target.txtShipNo = src.txtShipNo;
ALTER TABLE cabin_category MODIFY ship_id int NOT NULL;

/* 可以直接从服务器数据库导出ship_culinary表格，或者运行下面的sql修改已经存在的表格 */
ALTER TABLE ship_culinary ADD COLUMN ship_id int AFTER id;
ALTER TABLE ship_culinary ADD CONSTRAINT FK_CULINARY_SHIPID FOREIGN KEY (ship_id) REFERENCES cruise_ship (id) ON DELETE CASCADE ON UPDATE CASCADE; 
UPDATE ship_culinary target, cruise_ship src SET target.ship_id = src.id WHERE target.ship_code = src.txtShipNo;
ALTER TABLE ship_culinary MODIFY ship_id int NOT NULL;

/* 可以直接从服务器数据库导出ship_entertainment表格，或者运行下面的sql修改已经存在的表格 */
ALTER TABLE ship_entertainment ADD COLUMN ship_id int AFTER id;
ALTER TABLE ship_entertainment ADD CONSTRAINT FK_ENTERTAIN_SHIPID FOREIGN KEY (ship_id) REFERENCES cruise_ship (id) ON DELETE CASCADE ON UPDATE CASCADE; 
UPDATE ship_entertainment target, cruise_ship src SET target.ship_id = src.id WHERE target.ship_code = src.txtShipNo;
ALTER TABLE ship_entertainment MODIFY ship_id int NOT NULL;

/* 可以直接从服务器数据库导出ship_image表格，或者运行下面的sql创建ship_image表格*/
DROP TABLE IF EXISTS ship_image;
 CREATE TABLE ship_image (
  id int NOT NULL AUTO_INCREMENT,
  ship_id int NOT NULL,
  img_name varchar(20) NOT NULL,
  order_number int DEFAULT 999, /* 图片顺序, 1->保留给默认图片 */
  PRIMARY KEY (id),
  CONSTRAINT FK_SHIPIMG_SHIP FOREIGN KEY (ship_id) REFERENCES cruise_ship (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO ship_image (ship_id, img_name, order_number) SELECT id, rtfShipImg, '1' FROM cruise_ship WHERE rtfShipImg IS NOT NULL;

 DROP PROCEDURE IF EXISTS explode_table;
 CREATE PROCEDURE explode_table(bound VARCHAR(255))

  BEGIN

    DECLARE id INT DEFAULT 0;
    DECLARE value TEXT;
    DECLARE occurance INT DEFAULT 0;
    DECLARE i INT DEFAULT 0;
    DECLARE splitted_value VARCHAR(100);
    DECLARE done INT DEFAULT 0;
    DECLARE cur1 CURSOR FOR SELECT table1.id, table1.rtfOtherImg
                                         FROM cruise_ship AS table1
                                         WHERE table1.rtfOtherImg IS NOT NULL AND rtfOtherImg <> 'NULL' AND rtfOtherImg <> '';
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    DROP TEMPORARY TABLE IF EXISTS table2;
    CREATE TEMPORARY TABLE table2(
    `id` INT NOT NULL,
    `img_name` VARCHAR(20) NOT NULL
    ) ENGINE=Memory;

    OPEN cur1;
      read_loop: LOOP
        FETCH cur1 INTO id, value;
        IF done THEN
          LEAVE read_loop;
        END IF;

        SET occurance = (SELECT LENGTH(value)
                                 - LENGTH(REPLACE(value, bound, ''))
                                 +1);
        SET i=1;
        WHILE i <= occurance DO
          SET splitted_value =
          (SELECT REPLACE(SUBSTRING(SUBSTRING_INDEX(value, bound, i),
          LENGTH(SUBSTRING_INDEX(value, bound, i - 1)) + 1), '@', ''));

          INSERT INTO table2 VALUES (id, splitted_value);
          SET i = i + 1;

        END WHILE;
      END LOOP;

      SELECT * FROM table2;
      INSERT INTO ship_image (ship_id, img_name) SELECT * FROM table2;
    CLOSE cur1;
  END; 
  
  CALL explode_table('@');
  /*------------------- 创建ship_imgage表格结束 ---------------*/




 /*----------------- 2014-12-16 ---------------*/
 alter table system_message add column type varchar(10);
 update system_message set type="booking" where message like '%订单%';
/*----------------- 2014-12-09-2---------------*/
alter table product add column productfeature varchar(2000);
alter table product modify advertising varchar(2000);
alter table product modify visa_comment varchar(2000);
alter table product modify booking_note varchar(5000);
alter table product modify cancellation_policy varchar(2000);
alter table product modify payment_comment varchar(1000);

/*----------------- 2014-12-09 ---------------*/
alter table product modify created_at datetime NOT NULL;  
alter table product modify published_at datetime; 
alter table product add column updated_at datetime;
/*----------------- 2014-12-03 ---------------*/
ALTER TABLE cruise_port ADD COLUMN is_departure_port tinyint(1) DEFAULT 0;
update cruise_port set is_departure_port = 1 where txtPortCityName = '上海';
update cruise_port set is_departure_port = 1 where txtPortCityName = '天津';
update cruise_port set is_departure_port = 1 where txtPortCityName = '厦门';
update cruise_port set is_departure_port = 1 where txtPortCityName = '香港';
update cruise_port set is_departure_port = 1 where txtPortCityName = '南京';
update cruise_port set is_departure_port = 1 where txtPortCityName = '新加坡';
update cruise_port set is_departure_port = 1 where txtPortCityName = '迈阿密';
update cruise_port set is_departure_port = 1 where txtPortCityName = '威尼斯';

CREATE TABLE travel_location (
  id int NOT NULL AUTO_INCREMENT,  
  name varchar(100) NOT NULL,
  country varchar(100),
  range_number int DEFAULT 99999,/*用作排序的号码*/ 
  start_location tinyint(1) DEFAULT 0,/*1->出发地*/  
  PRIMARY KEY (id)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 INSERT INTO travel_location (name, country, start_location, range_number) values ('原居地', '中国', 1, 1);
 INSERT INTO travel_location (name, country, start_location, range_number) values ('上海', '中国', 1, 2);
 INSERT INTO travel_location (name, country, start_location, range_number) values ('天津', '中国', 1, 3);
 INSERT INTO travel_location (name, country, start_location, range_number) values ('深圳', '中国', 1, 4);
 INSERT INTO travel_location (name, country, start_location, range_number) values ('三亚', '中国', 1, 5);
 INSERT INTO travel_location (name, country, start_location, range_number) values ('广州', '中国', 1, 6);
 INSERT INTO travel_location (name, country, start_location, range_number) values ('武汉', '中国', 1, 7);
 INSERT INTO travel_location (name, country, start_location, range_number) values ('南京', '中国', 1, 8);
 INSERT INTO travel_location (name, country, start_location, range_number) values ('青岛', '中国', 1, 9);
 INSERT INTO travel_location (name, country, start_location, range_number) values ('厦门', '中国', 1, 10);
 INSERT INTO travel_location (name, country, start_location, range_number) values ('成都', '中国', 1, 11);
 INSERT INTO travel_location (name, country, start_location, range_number) values ('香港', '中国', 1, 12);

/*----------------- 2014-12-02 ---------------*/
ALTER TABLE cruise_area_port DROP FOREIGN KEY FK_AREA_PORT;
ALTER TABLE cruise_area_port DROP FOREIGN KEY FK_PORT_AREA;
ALTER TABLE cruise_port DROP FOREIGN KEY FK_CRUISEPORT_CRUISEAREA;
ALTER TABLE cruise_area ADD COLUMN range_number int;
UPDATE cruise_area set range_number = 1 where txtCruiseAreaNo = '0.5';
UPDATE cruise_area set range_number = 2 where txtCruiseAreaNo = '1';
UPDATE cruise_area set range_number = 3 where txtCruiseAreaNo = '1.4';
UPDATE cruise_area set range_number = 4 where txtCruiseAreaNo = '1.5';
UPDATE cruise_area set range_number = 5 where txtCruiseAreaNo = '2';
UPDATE cruise_area set range_number = 6 where txtCruiseAreaNo = '3';
UPDATE cruise_area set range_number = 7 where txtCruiseAreaNo = '4';
UPDATE cruise_area set range_number = 8 where txtCruiseAreaNo = '5';
UPDATE cruise_area set range_number = 9 where txtCruiseAreaNo = '6';
UPDATE cruise_area set range_number = 10 where txtCruiseAreaNo = '7';
UPDATE cruise_area set range_number = 11 where txtCruiseAreaNo = '8';
UPDATE cruise_area set range_number = 12 where txtCruiseAreaNo = '9';
ALTER TABLE cruise_port ADD COLUMN range_number int DEFAULT 9999;
update cruise_port set range_number = 1 where txtPortCityName = '上海';
update cruise_port set range_number = 2 where txtPortCityName = '天津';

/*----------------- 2014-09-28 ---------------*/
DROP TABLE IF EXISTS booking_status_date;
CREATE TABLE booking_status_date (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	booking_id bigint(20) NOT NULL, /*预订表id*/
	date_wait_confirm DATETIME,/*待确认*/
	date_confirmed DATETIME,/*已确认*/
	date_wait_payment DATETIME,/*待付款*/
	date_paid DATETIME,/*已收款*/
	date_wait_group DATETIME,/*待出团*/
	date_group_finished DATETIME,/*已出团*/
	PRIMARY KEY (id),
	CONSTRAINT FK_BOOKING_STATUS_DATE FOREIGN KEY (booking_id) REFERENCES booking (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*------------------- 2014-09-24 --------------*/
DROP TABLE IF EXISTS system_message_recipient;
DROP TABLE IF EXISTS sys_msg_recipient;
DROP TABLE IF EXISTS sys_msg_received;
DROP TABLE IF EXISTS system_message;
CREATE TABLE system_message (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	title varchar(100), /*标题*/
	message varchar(500),	/*内容*/
	sent_by bigint(20), /*发消息的系统或后台用户id*/
	sent_at DATETIME NOT NULL,/*发送时间*/
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*系统消息发送的目标用户及接收的时间*/
DROP TABLE IF EXISTS sys_msg_recipient;
CREATE TABLE sys_msg_recipient (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	sys_msg_id bigint(20) NOT NULL, /*系统消息*/
	recipient_id bigint(20) NOT NULL,/*消息接收人*/
	received_at DATETIME,/*接收时间*/
	PRIMARY KEY (id),
	CONSTRAINT FK_SYS_MSG_RECIPIENT FOREIGN KEY (sys_msg_id) REFERENCES system_message (id) ON DELETE CASCADE  ON UPDATE CASCADE,
	CONSTRAINT FK_SYS_MSG_RECIPIENT_REC FOREIGN KEY (recipient_id) REFERENCES user (id) ON DELETE CASCADE  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*发送给所有用户的系统消息接收的记录*/
DROP TABLE IF EXISTS sys_msg_received;
CREATE TABLE sys_msg_received (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	sys_msg_id bigint(20) NOT NULL, /*系统消息*/
	received_by bigint(20) NOT NULL,/*消息接收人*/
	received_at DATETIME,/*接收时间*/
	PRIMARY KEY (id),
	CONSTRAINT FK_SYS_MSG_RECEIVED FOREIGN KEY (sys_msg_id) REFERENCES system_message (id) ON DELETE CASCADE  ON UPDATE CASCADE,
	CONSTRAINT FK_SYS_MSG_RECEIVED_REC FOREIGN KEY (received_by) REFERENCES user (id) ON DELETE CASCADE  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*----------------------------------------------------------*/










/*------------------------ 2014-09-23 ----------------------*/
alter table booking add column deposit_until DATE; /*订金支付截止日期*/
alter table booking add column pay_balance_until DATE; /*余款支付截止日期*/
DROP TABLE IF EXISTS payment_history_type;
CREATE TABLE payment_history_type (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(10) NOT NULL,
	PRIMARY KEY (id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO payment_history_type (name) VALUES ('订金');
INSERT INTO payment_history_type (name) VALUES ('余款');
create table payment_history (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	booking_id bigint(20) NOT NULL, /*预订表id*/
	amount decimal(10,2), /*金额*/
	paid_at TIMESTAMP,/*支付时间，支付时使用 now()*/
	type_id int, /**/
	PRIMARY KEY (id),
	CONSTRAINT FK_BOOKING_HISTORY FOREIGN KEY (booking_id) REFERENCES booking (id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT FK_BOOKING_HISTORY_TYPE FOREIGN KEY (type_id) REFERENCES payment_history_type (id) ON DELETE CASCADE ON UPDATE CASCADE	
);

/*---------------------- */
alter table booking drop column comment;
alter table booking add column comment_supplier varchar(255); /*供应商备注*/
alter table booking add column comment_buyer varchar(255); /*分销商备注*/
alter table booking add column travel_group_file varchar(100); /*出团通知附件路径*/
alter table booking_passenger drop column name;
alter table booking_passenger drop column name_pinyin;
alter table booking_passenger add column firstname varchar(50);
alter table booking_passenger add column lastname varchar(50);
alter table booking_passenger add column firstname_en varchar(50);
alter table booking_passenger add column lastname_en varchar(50);
alter table booking_passenger add column pass_file_path varchar(100);
alter table product add column excursion_txt text;/*岸上游*/
alter table product add column nights int;
alter table product add column cabin_comment varchar(1000);/*舱房备注*/
alter table product_position add column retail_price_child decimal(10,2);/*3、4人儿童结算价*/

DROP TABLE IF EXISTS booking_status_date;
CREATE TABLE booking_status_date (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	booking_id bigint(20) NOT NULL, /*预订表id*/
	date_wait_confirm TIMESTAMP,/*待确认*/
	date_confirmed TIMESTAMP,/*已确认*/
	date_wait_payment TIMESTAMP,/*待付款*/
	date_paid TIMESTAMP,/*已收款*/
	date_wait_group TIMESTAMP,/*待出团*/
	date_group_finished TIMESTAMP,/*已出团*/
	PRIMARY KEY (id),
	CONSTRAINT FK_BOOKING_STATUS_DATE FOREIGN KEY (booking_id) REFERENCES booking (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*产品保险信息表*/
CREATE TABLE product_insurance (
  id bigint(20) NOT NULL AUTO_INCREMENT,
  product_id bigint(20) NOT NULL,
  type varchar(10) NOT NULL,/*险种*/
  description varchar(500) NOT NULL,/*说明*/
  price decimal(10,2), /*单价*/
  PRIMARY KEY (id),
  CONSTRAINT FK_PRODUCT_INSURANCE FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
