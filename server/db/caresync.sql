CREATE DATABASE caresync;
USE caresync;

CREATE TABLE `doctor` (
    `doctor_id` INT PRIMARY KEY AUTO_INCREMENT,
    `fname` VARCHAR(60) NOT NULL,
    `lname` VARCHAR(60) NOT NULL,
    `profession` VARCHAR(255) NOT NULL,
    `contact_number` CHAR(11) NOT NULL,
    `email_address` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

CREATE TABLE `record`(
    `record_id` INT PRIMARY KEY AUTO_INCREMENT,
    `patient_name` VARCHAR(255) NOT NULL,
    `patient_age` INT NOT NULL,
    `patient_dob` DATE NOT NULL,
    `patient_gender` VARCHAR(50) NOT NULL,
    `visit_date` DATE NOT NULL,
    `purpose` VARCHAR(255) NOT NULL,
    `diagnosis` LONGTEXT NOT NULL,
    `prescription` LONGTEXT NOT NULL,
    `record_status` enum('Pending','Ongoing','Complete','Cancelled') NOT NULL DEFAULT 'Pending',
    `doctor_id` INT NOT NULL,
    CONSTRAINT `fk_record_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctor`(`doctor_id`)
);

INSERT INTO `doctor` (`doctor_id`, `fname`, `lname`, `profession`, `contact_number`, `email_address`, `password`) VALUES
(1, 'Bocchi', 'Gotoh', 'Surgeon', '09133467809', 'bocchi@email.com', '$2b$10$JjCr4x47MxQeWlfX05X2pORBPk7Xlm4kEQ0N.HVGgvr6/PHN76ZCO'),
(2, 'Bryan', 'Sanchez', 'Primary Care Physician', '09991234567', 'bryan@email.com', '$2b$10$oA4qHMKH4awPNGTuo/jko.aLYRyVNZBrzLd3tLaX1YUI.z2ZGbHfa'),
(3, 'Gura', 'Gura', 'Vtuber', '09999999999', 'gura@email.com', '$2b$10$.JBBGKaL0b69/WTmnyBKseMk4kjDOvSX4966r38hiAoo8b65tnnEq'),
(4, 'Dawg', 'Man', 'Man', '09127896543', 'dawg@email.com', '$2b$10$IZ2PBthWsAkr7oXqr5LkaOmKgIa/BF3c/yeBXk1euML39YkUyjkzi');

INSERT INTO `record` (`record_id`, `patient_name`, `patient_age`, `patient_dob`, `patient_gender`, `visit_date`, `purpose`, `diagnosis`, `prescription`, `record_status`, `doctor_id`) VALUES
(1, 'John Doe Updated', 46, '1974-06-15', 'Male', '2024-04-24', 'he kinda need help', 'sick', 'med', 'Ongoing', 1),
(2, 'Jane Smith', 25, '1999-07-23', 'Female', '2024-04-11', 'Dermatology Consult', 'Mild dermatitis', 'Topical steroid for 7 days.', 'Ongoing', 1),
(3, 'Alice Johnson', 40, '1984-02-15', 'Female', '2024-04-12', 'Routine Bloodwork', 'High cholesterol levels.', 'Statins and diet modification.', 'Pending', 1),
(4, 'Brandito Jabandal', 40, '1976-05-21', 'Male', '2024-04-01', 'Annual Physical Test', 'TBD', 'None', 'Pending', 1),
(5, 'Julio perez', 21, '2003-09-12', 'Male', '2024-04-15', 'purpose', 'sick', 'med', 'Pending', 1),
(7, 'Dave Woke', 23, '2000-07-21', 'Male', '2024-04-16', 'purposes', 'sicks', 'meds', 'Pending', 1),
(9, 'Paolo Boriel', 21, '2002-03-04', 'Male', '2024-04-16', 'Anorexia', 'Anoorexia', 'meds for anorexia', 'Ongoing', 1),
(10, 'NAme here', 23, '2003-01-01', 'Male', '2024-04-17', 'prpose', 'djbkhbdvhvb', 'fwafwwfawf', 'Ongoing', 1);
