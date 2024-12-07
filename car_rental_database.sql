-- Create the database
CREATE DATABASE IF NOT EXISTS car_rental_project;
USE car_rental_project;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(200) NOT NULL,
    city VARCHAR(50) NOT NULL,
    zip_code VARCHAR(10) NOT NULL
);

select * from users;

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
    car_id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year YEAR NOT NULL,
    color VARCHAR(20) NOT NULL,
    daily_rate DECIMAL(10, 2) NOT NULL,
    status ENUM('Available', 'Rented', 'Maintenance') NOT NULL DEFAULT 'Available',
    provider_id INT NOT NULL,
    image_url VARCHAR(150),
    FOREIGN KEY (provider_id) REFERENCES users(customer_id)
);


select * from cars;
-- Rentals table
CREATE TABLE IF NOT EXISTS rentals (
    rental_id INT AUTO_INCREMENT PRIMARY KEY,
    car_id INT NOT NULL,
    customer_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (car_id) REFERENCES cars(car_id),
    FOREIGN KEY (customer_id) REFERENCES users(customer_id)
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    rental_id INT NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (rental_id) REFERENCES rentals(rental_id)
);

show tables;
select * from rentals;
select * from payments;
DELETE from rentals
where rental_id=1;
DELETE from payments
where payment_id=1;
DELETE from cars
where provider_id=3;

SET SQL_SAFE_UPDATES=0;

-- data insertion
select * from users;
INSERT INTO Users (customer_id, name, email, phone, address, city, zip_code) VALUES
(1, 'Neha Sharma', 'neha.sharma@gmail.com', 9876543210, '123, ABC Street', 'Guwahati', 781001),
(2, 'Rohan Das', 'rohan.das@gmail.com', 8765432109, '456, XYZ Road', 'Guwahati', 781002),
(3, 'Aarav Barua', 'aarav.barua@gmail.com', 7654321098, '789, LMN Avenue', 'Guwahati', 781003),
(4, 'Riya Devi', 'riya.devi@gmail.com', 6543210987, '321, PQR Lane', 'Guwahati', 781004),
(5, 'Vikram Bora', 'vikram.bora@gmail.com', 5432109876, '654, DEF Colony', 'Guwahati', 781005);

INSERT INTO cars (car_id, make, model, year, color, daily_rate,image_url,provider_id)
VALUES
(1, 'Toyota', 'Yaris', 2015, 'Silver', 1875,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429069/car_rental/mvplztivchkkclitbsri.jpg",1),
(2, 'Hyundai', 'Accent', 2014, 'White', 2250,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429070/car_rental/iejmit0g2i7ybzl5pphd.jpg",2),
(3, 'Nissan', 'Versa', 2013, 'Red', 2100,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429070/car_rental/wqixxvyyn3gzccwpxsbx.jpg",3),
(4, 'Kia', 'Rio', 2016, 'Blue', 2025,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429070/car_rental/jpvxppwbtcg50kcuscmu.jpg",1),
(5, 'Chevrolet', 'Spark', 2017, 'Yellow', 1950,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429070/car_rental/aangeqlby1zfko2g4ohj.png",2),
(6, 'Ford', 'Fiesta', 2015, 'Black', 2175,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429070/car_rental/qfko2pkgrxklsm3sxtqa.jpg",3),
(7, 'Honda', 'Fit', 2014, 'Gray', 2325,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429071/car_rental/idhzgoo5ess0bpqqjrmx.png",1),
(8, 'Suzuki', 'Baleno', 2016, 'Blue', 2100,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429071/car_rental/jsabdckvyrpcqvc8f5ny.jpg",2),
(9, 'Suzuki', 'Swift', 2015, 'White', 2025,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429071/car_rental/ktr2cegthfcwumz1dpse.jpg",3),
(10, 'Volkswagen', 'Polo', 2013, 'White', 2250,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429070/car_rental/pihgtzr6lrcufbbdwutn.jpg",1),
(11, 'Fiat', '500', 2014, 'Black', 2175,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429071/car_rental/ppmj3oj6sdoczkadgaco.jpg",2),
(12, 'Dacia', 'Sandero', 2016, 'White', 1950,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429071/car_rental/wyjhmb1oorxsfbug9su4.jpg",3),
(13, 'Skoda', 'Fabia', 2015, 'Black', 2100,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429071/car_rental/akeobsxdbp03xmxtp0pv.jpg",1),
(14, 'Renault', 'Kwid', 2017, 'Foster Green', 1875,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429071/car_rental/alu0j2zzlzlfvcdn9awt.jpg",2),
(15, 'Tata', 'Tiago', 2018, 'Orange', 2025,"https://res.cloudinary.com/dkiimfywe/image/upload/v1712429072/car_rental/oibg4muag6xiruyavc1k.png",3);


UPDATE cars
SET image_url="https://res.cloudinary.com/dkiimfywe/image/upload/v1712404438/car_rental/nr76dsi80mpxoh7qgyyi.jpg"
WHERE car_id=2 ;


select * from cars;
select * from rentals;
select * from users;
delete from cars
where car_id=47;

ALTER TABLE cars
MODIFY COLUMN status VARCHAR(255) DEFAULT 'Available';


select car_id,provider_id from cars 
where status='Rented';


select a.car_id,a.provider_id,b.customer_id,b.start_date,b.end_date,b.total_cost from (select car_id,provider_id from cars 
where status='Rented')as a,rentals as b
where a.car_id=b.car_id;


SELECT newC.car_id,newC.provider_id,newC.customer_id,newC.start_date,newC.end_date,newC.total_cost,users.name
FROM (
    SELECT a.car_id, a.provider_id, b.customer_id, b.start_date, b.end_date, b.total_cost
    FROM (
        SELECT car_id, provider_id
        FROM cars
        WHERE status = 'Rented'
    ) AS a
    INNER JOIN rentals AS b ON a.car_id = b.car_id
) AS newC
INNER JOIN users ON newC.customer_id = users.customer_id;

SELECT * from 
(SELECT newC.car_id,newC.provider_id,newC.customer_id,newC.start_date,newC.end_date,newC.total_cost,users.name
FROM (
    SELECT a.car_id, a.provider_id, b.customer_id, b.start_date, b.end_date, b.total_cost
    FROM (
        SELECT car_id, provider_id
        FROM cars
        WHERE status = 'Rented'
    ) AS a
    INNER JOIN rentals AS b ON a.car_id = b.car_id
) AS newC
INNER JOIN users ON newC.customer_id = users.customer_id) as newT
WHERE newT.provider_id=1;



DELIMITER $$
CREATE PROCEDURE update3_car_status()
BEGIN
    UPDATE cars
    SET status = 'Available'
    WHERE cars.car_id IN (
        SELECT rentals.car_id
        FROM rentals
        WHERE rentals.end_date < CURDATE()
    );
END$$
DELIMITER ;

CREATE EVENT update_car_status_event
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
  CALL update3_car_status();
  
  
  
  
  CREATE EVENT update_car_status_event1
ON SCHEDULE
  EVERY 1 DAY
  STARTS CURRENT_TIMESTAMP + INTERVAL 1 DAY - INTERVAL HOUR(CURRENT_TIMESTAMP) HOUR - INTERVAL MINUTE(CURRENT_TIMESTAMP) MINUTE
DO
  CALL update3_car_status();
  
  SHOW EVENTS;
  DROP EVENT IF EXISTS updates_cars_status;
SHOW PROCEDURE STATUS;
DROP PROCEDURE IF EXISTS update1_car_status;

DESC cars;

ALTER TABLE cars
CHANGE status status enum('Available','Rented','Maintainance');

ALTER TABLE cars
ADD CONSTRAINT UNIQUE (model);



UPDATE Cars
SET make = "Toyota Yaris", model = "AS 02 EF 9012"
WHERE car_id = 1;

UPDATE Cars
SET make = "Hyundai Accent", model = "AS 03 GH 2345"
WHERE car_id = 2;

UPDATE Cars
SET make = "Nissan Versa", model = "AS 04 IJ 5678"
WHERE car_id = 3;

UPDATE Cars
SET make = "Kia Rio", model = "AS 05 KL 9012"
WHERE car_id = 4;

UPDATE Cars
SET make = "Chevrolet Spark", model = "AS 06 MN 3456"
WHERE car_id = 5;

UPDATE Cars
SET make = "Ford Fiesta", model = "AS 07 OP 6789"
WHERE car_id = 6;

UPDATE Cars
SET make = "Honda Fit", model = "AS 08 QR 0123"
WHERE car_id = 7;

UPDATE Cars
SET make = "Suzuki Baleno", model = "AS 09 ST 4567"
WHERE car_id = 8;

UPDATE Cars
SET make = "Suzuki Swift", model = "AS 10 UV 8901"
WHERE car_id = 9;

UPDATE Cars
SET make = "Volkswagen Polo", model = "AS 11 WX 2345"
WHERE car_id = 10;

UPDATE Cars
SET make = "Fiat 500", model = "AS 12 YZ 6789"
WHERE car_id = 11;

UPDATE Cars
SET make = "Dacia Sandero", model = "AS 13 AB 0123"
WHERE car_id = 12;

UPDATE Cars
SET make = "Skoda Fabia", model = "AS 14 CD 4567"
WHERE car_id = 13;

UPDATE Cars
SET make = "Renault Kwid", model = "AS 15 EF 8901"
WHERE car_id = 14;

UPDATE Cars
SET make = "Tata Tiago", model = "AS 16 GH 2345"
WHERE car_id = 15;

select * from users;
DESC users;
DESC cars;