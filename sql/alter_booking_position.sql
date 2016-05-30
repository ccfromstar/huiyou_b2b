/*预订单元, 对应product_position*/
DROP TABLE IF EXISTS booking_passenger;
DROP TABLE IF EXISTS booking_position;
CREATE TABLE booking_position (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	booking_id bigint(20) NOT NULL, /*预订表id*/
	product_position_id bigint(20) NOT NULL,
	amount_adult int, /*成人数量*/	
	amount_child int, /*儿童数量*/
	deal_price decimal(10,2),/*1、2人结算价, 默认=product_position.retail_price*/
	deal_price_2 decimal(10,2),/*3、4人结算价, 默认=product_position.retail_price_2*/
	deal_price_child decimal(10,2),/*儿童价, 默认=product_position.price_child*/
	booking_pos_total_price decimal(10,2), /*总价*/
	created_at TIMESTAMP NOT NULL DEFAULT '0000-00-00 00:00:00',/*创建时间，创建时使用 now()*/
	last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,/*最后的修改时间, mysql自动更新*/
	PRIMARY KEY (id),
	CONSTRAINT FK_BOOKING_POS_BOOKING FOREIGN KEY (booking_id) REFERENCES booking (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT FK_BOOKING_POS_PRODUCT_POS FOREIGN KEY (product_position_id) REFERENCES product_position (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*旅客信息*/
CREATE TABLE booking_passenger (
	id bigint(20) NOT NULL AUTO_INCREMENT,
	booking_pos_id bigint(20) NOT NULL,
	name varchar(20),/*姓名*/
	name_pinyin varchar(50), /*姓名拼音*/
	birthday date,/*出生日期*/
	pass_number varchar(20),/*护照号码*/
	pass_issue_place varchar(50),/*护照签发地*/
	pass_issue_at date,/*护照签发日期*/
	pass_valid_until date,/*护照有效日期*/
	PRIMARY KEY (id),
	CONSTRAINT FK_BOOKING_PASSENGER FOREIGN KEY (booking_pos_id) REFERENCES booking_position (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;