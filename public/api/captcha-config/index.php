<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
require_once dirname(__DIR__) . '/mail.php';
try {
    $config = westernprise_mail_config();
    $siteKey = trim((string) ($config['RECAPTCHA_SITE_KEY'] ?? ''));
    $secret = trim((string) ($config['RECAPTCHA_SECRET_KEY'] ?? ''));
    if ($siteKey === '' || $secret === '') throw new RuntimeException('Not configured');
    echo json_encode(['siteKey' => $siteKey]);
} catch (Throwable $error) {
    http_response_code(503);
    echo json_encode(['error' => 'Verification is unavailable.']);
}
