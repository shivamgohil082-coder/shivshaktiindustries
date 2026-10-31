-- ============================================================================
-- SHIV SHAKTI INDUSTRIES — PRODUCTION DATABASE SCHEMA (MySQL 8.0+ / MariaDB 10.4+)
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `shivshakti_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `shivshakti_db`;

-- ----------------------------------------------------------------------------
-- Table: admin_users
-- Stores authenticated administrators and password reset tokens
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(20) NOT NULL DEFAULT 'admin',
  `reset_token` VARCHAR(255) NULL,
  `reset_token_expiry` DATETIME NULL,
  `last_login` DATETIME NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_admin_email` (`email`),
  INDEX `idx_admin_token` (`reset_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: products
-- Stores precision CNC/VMC products, tolerances, specs, and published states
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(220) NOT NULL UNIQUE,
  `category` VARCHAR(100) NOT NULL,
  `process` VARCHAR(120) NULL,
  `industry` VARCHAR(120) NULL,
  `material` VARCHAR(200) NULL,
  `tolerance` VARCHAR(80) NULL,
  `finish` VARCHAR(150) NULL,
  `dimensions` VARCHAR(150) NULL,
  `weight` VARCHAR(50) NULL,
  `moq` INT UNSIGNED NOT NULL DEFAULT 10,
  `description` TEXT NULL,
  `specs` TEXT NULL,
  `applications` TEXT NULL,
  `image` VARCHAR(255) NOT NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `featured` TINYINT(1) NOT NULL DEFAULT 0,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_prod_category` (`category`),
  INDEX `idx_prod_published` (`is_published`),
  INDEX `idx_prod_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: enquiries
-- Stores RFQ quote submissions, contact inquiries, statuses, and admin notes
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `reference_no` VARCHAR(50) NOT NULL UNIQUE,
  `type` ENUM('RFQ', 'General', 'Career', 'Vendor') NOT NULL DEFAULT 'General',
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `company` VARCHAR(150) NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `attachment_path` VARCHAR(255) NULL,
  `attachment_name` VARCHAR(255) NULL,
  `status` ENUM('New', 'Pending', 'Contacted', 'Completed') NOT NULL DEFAULT 'New',
  `admin_notes` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_enquiry_status` (`status`),
  INDEX `idx_enquiry_type` (`type`),
  INDEX `idx_enquiry_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: content_blocks
-- Stores editable website text, headers, and section content
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `content_blocks` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `section_key` VARCHAR(100) NOT NULL UNIQUE,
  `title` VARCHAR(255) NULL,
  `subtitle` VARCHAR(255) NULL,
  `content` TEXT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_section_key` (`section_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: seo_meta
-- Stores page-specific SEO meta titles, descriptions, and keywords
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `seo_meta` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `page_path` VARCHAR(100) NOT NULL UNIQUE,
  `meta_title` VARCHAR(255) NOT NULL,
  `meta_description` TEXT NOT NULL,
  `keywords` TEXT NULL,
  `canonical_url` VARCHAR(255) NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_seo_path` (`page_path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: customers
-- Stores registered business clients, GST numbers, and addresses
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `customers` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `company_name` VARCHAR(200) NOT NULL,
  `contact_name` VARCHAR(160) NOT NULL,
  `email` VARCHAR(254) NOT NULL UNIQUE,
  `phone` VARCHAR(40) NOT NULL DEFAULT '',
  `billing_address` TEXT NOT NULL,
  `shipping_address` TEXT NOT NULL,
  `gst_number` CHAR(15) NOT NULL DEFAULT '',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_customers_company` (`company_name`),
  INDEX `idx_customers_contact` (`contact_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: sales
-- Stores sales transactions, GST invoices, and payment statuses
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `sales` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `reference_no` VARCHAR(64) NOT NULL UNIQUE,
  `customer_name` VARCHAR(200) NOT NULL,
  `amount` DECIMAL(12, 2) NOT NULL,
  `status` ENUM('Paid', 'Pending', 'Overdue', 'Cancelled') NOT NULL DEFAULT 'Pending',
  `sold_at` DATE NOT NULL,
  `notes` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_sales_status` (`status`, `sold_at`),
  INDEX `idx_sales_customer` (`customer_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Table: activity_logs
-- Audit log of changes made by administrators (creates, edits, deletes)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `admin_username` VARCHAR(50) NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `details` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
