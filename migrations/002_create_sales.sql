CREATE TABLE sales (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  reference_no VARCHAR(64) NOT NULL,
  customer_name VARCHAR(200) NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  status ENUM('Paid', 'Pending', 'Overdue', 'Cancelled') NOT NULL DEFAULT 'Pending',
  sold_at DATE NOT NULL,
  notes TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_sales_reference_no (reference_no),
  KEY idx_sales_status_sold_at (status, sold_at),
  KEY idx_sales_customer_name (customer_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
