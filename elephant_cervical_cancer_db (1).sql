-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 03, 2026 at 03:56 PM
-- Server version: 10.6.24-MariaDB-cll-lve
-- PHP Version: 8.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elephant_cervical_cancer_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `medical_history`
--

CREATE TABLE `medical_history` (
  `history_id` int(11) NOT NULL,
  `patient_id` varchar(20) NOT NULL,
  `age_first_intercourse` int(11) DEFAULT NULL,
  `number_sexual_partners` int(11) DEFAULT NULL,
  `parity` int(11) DEFAULT NULL,
  `contraceptive_use` enum('Yes','No') DEFAULT NULL,
  `contraceptive_years` int(11) DEFAULT NULL,
  `smoking_status` enum('Yes','No','Former') DEFAULT NULL,
  `hiv_status` enum('Positive','Negative','Unknown') DEFAULT NULL,
  `previous_std` enum('Yes','No','Unknown') DEFAULT NULL,
  `family_history_cancer` enum('Yes','No','Unknown') DEFAULT NULL,
  `bmi` decimal(5,2) DEFAULT NULL,
  `hemoglobin_level` decimal(5,2) DEFAULT NULL,
  `cd4_count` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patient_id` varchar(20) NOT NULL,
  `national_id` varchar(16) DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `age` int(11) DEFAULT NULL,
  `region` varchar(50) DEFAULT NULL,
  `district` varchar(50) DEFAULT NULL,
  `sector` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `marital_status` enum('Single','Married','Divorced','Widowed') DEFAULT NULL,
  `education_level` enum('None','Primary','Secondary','University') DEFAULT NULL,
  `occupation` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `predictions`
--

CREATE TABLE `predictions` (
  `prediction_id` int(11) NOT NULL,
  `patient_id` varchar(20) NOT NULL,
  `screening_id` int(11) DEFAULT NULL,
  `prediction_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `diagnosis` enum('Normal','CIN1','CIN2','CIN3','Invasive') NOT NULL,
  `risk_level` enum('Low','Medium','High') NOT NULL,
  `confidence_score` decimal(5,4) DEFAULT NULL,
  `model_version` varchar(20) DEFAULT NULL,
  `features_used` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`features_used`)),
  `recommendations` text DEFAULT NULL,
  `predicted_by` int(11) NOT NULL,
  `reviewed` enum('Yes','No') DEFAULT 'No',
  `reviewed_by` int(11) DEFAULT NULL,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `follow_up_date` date DEFAULT NULL,
  `status` enum('Pending','Confirmed','Rejected','Under Treatment') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `report_id` int(11) NOT NULL,
  `report_type` enum('Doctor Performance','Predictions Summary','Patient Statistics','Screening Coverage','Custom') DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `generated_by` int(11) NOT NULL,
  `generated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `parameters` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`parameters`)),
  `file_path` varchar(255) DEFAULT NULL,
  `status` enum('Generating','Completed','Failed') DEFAULT 'Completed'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `screening_records`
--

CREATE TABLE `screening_records` (
  `screening_id` int(11) NOT NULL,
  `patient_id` varchar(20) NOT NULL,
  `screening_date` date NOT NULL,
  `screening_method` enum('VIA','Pap','HPV','Combined') DEFAULT NULL,
  `via_result` enum('Positive','Negative','Suspicious','Not Done') DEFAULT NULL,
  `pap_smear_result` enum('Normal','ASCUS','LSIL','HSIL','Cancer','Not Done') DEFAULT NULL,
  `hpv_test_result` enum('Positive','Negative','Not Done') DEFAULT NULL,
  `cervix_appearance` enum('Normal','Abnormal','Suspicious') DEFAULT NULL,
  `discharge_present` enum('Yes','No') DEFAULT NULL,
  `bleeding_history` enum('Yes','No') DEFAULT NULL,
  `menstrual_irregularity` enum('Yes','No') DEFAULT NULL,
  `previous_screening` enum('Yes','No') DEFAULT NULL,
  `performed_by` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `setting_id` int(11) NOT NULL,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `setting_type` enum('system','user','model') DEFAULT NULL,
  `description` text DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`setting_id`, `setting_key`, `setting_value`, `setting_type`, `description`, `updated_by`, `updated_at`) VALUES
(1, 'model_version', '1.0.0', 'model', 'Current ML model version', NULL, '2026-01-28 19:45:45'),
(2, 'prediction_threshold_high', '0.75', 'model', 'Confidence threshold for high risk', NULL, '2026-01-28 19:45:45'),
(3, 'prediction_threshold_medium', '0.50', 'model', 'Confidence threshold for medium risk', NULL, '2026-01-28 19:45:45'),
(4, 'system_name', 'RBC Cervical Cancer Screening System', 'system', 'System name', NULL, '2026-01-28 19:45:45'),
(5, 'max_login_attempts', '5', 'system', 'Maximum login attempts before lockout', NULL, '2026-01-28 19:45:45');

-- --------------------------------------------------------

--
-- Table structure for table `system_logs`
--

CREATE TABLE `system_logs` (
  `log_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `table_affected` varchar(50) DEFAULT NULL,
  `record_id` varchar(50) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `treatment_records`
--

CREATE TABLE `treatment_records` (
  `treatment_id` int(11) NOT NULL,
  `patient_id` varchar(20) NOT NULL,
  `prediction_id` int(11) DEFAULT NULL,
  `treatment_date` date NOT NULL,
  `treatment_type` varchar(100) DEFAULT NULL,
  `treatment_description` text DEFAULT NULL,
  `outcome` enum('Cured','Improved','Stable','Worsened','Ongoing') DEFAULT NULL,
  `next_visit_date` date DEFAULT NULL,
  `doctor_id` int(11) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `role` enum('admin','doctor') NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `specialization` varchar(100) DEFAULT NULL,
  `license_number` varchar(50) DEFAULT NULL,
  `status` enum('active','inactive','suspended') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password_hash`, `full_name`, `role`, `phone`, `specialization`, `license_number`, `status`, `created_at`, `updated_at`, `last_login`) VALUES
(1, 'admin', 'admin@rbc.gov.rw', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Administrator', 'admin', NULL, NULL, NULL, 'active', '2026-01-28 19:45:45', '2026-01-28 19:45:45', NULL),
(2, 'dr.uwase', 'uwase@rbc.gov.rw', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Dr. Marie Uwase', 'doctor', NULL, NULL, NULL, 'active', '2026-01-28 19:45:45', '2026-01-28 19:45:45', NULL),
(3, 'dr.mugabo', 'mugabo@rbc.gov.rw', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Dr. Jean Mugabo', 'doctor', NULL, NULL, NULL, 'active', '2026-01-28 19:45:45', '2026-01-28 19:45:45', NULL),
(5, 'NKUNDA', 'nkundaprince6@gmail.com', 'NKUNDA123', 'NKUNDA Prince', 'admin', '0788988180', NULL, NULL, 'active', '2026-01-28 19:47:04', '2026-01-28 19:47:04', NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_doctor_performance`
-- (See below for the actual view)
--
CREATE TABLE `v_doctor_performance` (
`user_id` int(11)
,`full_name` varchar(100)
,`total_predictions` bigint(21)
,`high_risk_predictions` bigint(21)
,`treatments_provided` bigint(21)
,`avg_confidence` decimal(9,8)
,`last_prediction` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_patient_summary`
-- (See below for the actual view)
--
CREATE TABLE `v_patient_summary` (
`patient_id` varchar(20)
,`patient_name` varchar(101)
,`age` int(11)
,`region` varchar(50)
,`marital_status` enum('Single','Married','Divorced','Widowed')
,`hiv_status` enum('Positive','Negative','Unknown')
,`total_screenings` bigint(21)
,`total_predictions` bigint(21)
,`highest_risk` enum('Low','Medium','High')
,`last_prediction_date` timestamp
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_prediction_statistics`
-- (See below for the actual view)
--
CREATE TABLE `v_prediction_statistics` (
`prediction_date` date
,`total_predictions` bigint(21)
,`low_risk` decimal(22,0)
,`medium_risk` decimal(22,0)
,`high_risk` decimal(22,0)
,`avg_confidence` decimal(9,8)
);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `medical_history`
--
ALTER TABLE `medical_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patient_id`),
  ADD UNIQUE KEY `national_id` (`national_id`),
  ADD KEY `idx_national_id` (`national_id`),
  ADD KEY `idx_name` (`first_name`,`last_name`),
  ADD KEY `idx_region` (`region`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `predictions`
--
ALTER TABLE `predictions`
  ADD PRIMARY KEY (`prediction_id`),
  ADD KEY `screening_id` (`screening_id`),
  ADD KEY `predicted_by` (`predicted_by`),
  ADD KEY `reviewed_by` (`reviewed_by`),
  ADD KEY `idx_prediction_date` (`prediction_date`),
  ADD KEY `idx_risk_level` (`risk_level`),
  ADD KEY `idx_patient` (`patient_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `generated_by` (`generated_by`),
  ADD KEY `idx_report_type` (`report_type`),
  ADD KEY `idx_generated_at` (`generated_at`);

--
-- Indexes for table `screening_records`
--
ALTER TABLE `screening_records`
  ADD PRIMARY KEY (`screening_id`),
  ADD KEY `performed_by` (`performed_by`),
  ADD KEY `idx_screening_date` (`screening_date`),
  ADD KEY `idx_patient` (`patient_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`setting_id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Indexes for table `system_logs`
--
ALTER TABLE `system_logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `idx_timestamp` (`timestamp`),
  ADD KEY `idx_user` (`user_id`);

--
-- Indexes for table `treatment_records`
--
ALTER TABLE `treatment_records`
  ADD PRIMARY KEY (`treatment_id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `prediction_id` (`prediction_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `idx_treatment_date` (`treatment_date`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_username` (`username`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_role` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `medical_history`
--
ALTER TABLE `medical_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `predictions`
--
ALTER TABLE `predictions`
  MODIFY `prediction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `screening_records`
--
ALTER TABLE `screening_records`
  MODIFY `screening_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `setting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `system_logs`
--
ALTER TABLE `system_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `treatment_records`
--
ALTER TABLE `treatment_records`
  MODIFY `treatment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

-- --------------------------------------------------------

--
-- Structure for view `v_doctor_performance`
--
DROP TABLE IF EXISTS `v_doctor_performance`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_doctor_performance`  AS SELECT `u`.`user_id` AS `user_id`, `u`.`full_name` AS `full_name`, count(distinct `p`.`prediction_id`) AS `total_predictions`, count(distinct case when `p`.`risk_level` = 'High' then `p`.`prediction_id` end) AS `high_risk_predictions`, count(distinct `t`.`treatment_id`) AS `treatments_provided`, avg(`p`.`confidence_score`) AS `avg_confidence`, max(`p`.`prediction_date`) AS `last_prediction` FROM ((`users` `u` left join `predictions` `p` on(`u`.`user_id` = `p`.`predicted_by`)) left join `treatment_records` `t` on(`u`.`user_id` = `t`.`doctor_id`)) WHERE `u`.`role` = 'doctor' GROUP BY `u`.`user_id` ;

-- --------------------------------------------------------

--
-- Structure for view `v_patient_summary`
--
DROP TABLE IF EXISTS `v_patient_summary`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_patient_summary`  AS SELECT `p`.`patient_id` AS `patient_id`, concat(`p`.`first_name`,' ',`p`.`last_name`) AS `patient_name`, `p`.`age` AS `age`, `p`.`region` AS `region`, `p`.`marital_status` AS `marital_status`, `mh`.`hiv_status` AS `hiv_status`, count(distinct `sr`.`screening_id`) AS `total_screenings`, count(distinct `pr`.`prediction_id`) AS `total_predictions`, max(`pr`.`risk_level`) AS `highest_risk`, max(`pr`.`prediction_date`) AS `last_prediction_date` FROM (((`patients` `p` left join `medical_history` `mh` on(`p`.`patient_id` = `mh`.`patient_id`)) left join `screening_records` `sr` on(`p`.`patient_id` = `sr`.`patient_id`)) left join `predictions` `pr` on(`p`.`patient_id` = `pr`.`patient_id`)) GROUP BY `p`.`patient_id` ;

-- --------------------------------------------------------

--
-- Structure for view `v_prediction_statistics`
--
DROP TABLE IF EXISTS `v_prediction_statistics`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_prediction_statistics`  AS SELECT cast(`predictions`.`prediction_date` as date) AS `prediction_date`, count(0) AS `total_predictions`, sum(case when `predictions`.`risk_level` = 'Low' then 1 else 0 end) AS `low_risk`, sum(case when `predictions`.`risk_level` = 'Medium' then 1 else 0 end) AS `medium_risk`, sum(case when `predictions`.`risk_level` = 'High' then 1 else 0 end) AS `high_risk`, avg(`predictions`.`confidence_score`) AS `avg_confidence` FROM `predictions` GROUP BY cast(`predictions`.`prediction_date` as date) ORDER BY cast(`predictions`.`prediction_date` as date) DESC ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `medical_history`
--
ALTER TABLE `medical_history`
  ADD CONSTRAINT `medical_history_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE;

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `predictions`
--
ALTER TABLE `predictions`
  ADD CONSTRAINT `predictions_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `predictions_ibfk_2` FOREIGN KEY (`screening_id`) REFERENCES `screening_records` (`screening_id`),
  ADD CONSTRAINT `predictions_ibfk_3` FOREIGN KEY (`predicted_by`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `predictions_ibfk_4` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`generated_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `screening_records`
--
ALTER TABLE `screening_records`
  ADD CONSTRAINT `screening_records_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `screening_records_ibfk_2` FOREIGN KEY (`performed_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `settings`
--
ALTER TABLE `settings`
  ADD CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `system_logs`
--
ALTER TABLE `system_logs`
  ADD CONSTRAINT `system_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `treatment_records`
--
ALTER TABLE `treatment_records`
  ADD CONSTRAINT `treatment_records_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `treatment_records_ibfk_2` FOREIGN KEY (`prediction_id`) REFERENCES `predictions` (`prediction_id`),
  ADD CONSTRAINT `treatment_records_ibfk_3` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
