<?php
declare(strict_types=1);

function westernprise_database(array $config): PDO
{
    foreach (['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USERNAME', 'DB_PASSWORD'] as $key) {
        if (!isset($config[$key]) || $config[$key] === '') {
            throw new RuntimeException('Database configuration is incomplete.');
        }
    }
    $dsn = sprintf('mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4', $config['DB_HOST'], $config['DB_PORT'], $config['DB_NAME']);
    $pdo = new PDO($dsn, $config['DB_USERNAME'], $config['DB_PASSWORD'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    $pdo->exec("CREATE TABLE IF NOT EXISTS demo_requests (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(80) NOT NULL,
        last_name VARCHAR(80) NOT NULL,
        work_email VARCHAR(160) NOT NULL,
        phone VARCHAR(60) NOT NULL,
        company VARCHAR(140) NOT NULL,
        role VARCHAR(100) NOT NULL,
        company_size VARCHAR(60) NOT NULL,
        referral_source VARCHAR(100) NULL,
        notes TEXT NULL,
        notification_status VARCHAR(20) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX demo_requests_created_at_index (created_at),
        INDEX demo_requests_email_index (work_email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    $column = $pdo->query("SHOW COLUMNS FROM demo_requests LIKE 'acknowledgement_status'")->fetch();
    if (!$column) {
        $pdo->exec("ALTER TABLE demo_requests ADD acknowledgement_status VARCHAR(20) NOT NULL DEFAULT 'pending' AFTER notification_status");
    }
    return $pdo;
}
