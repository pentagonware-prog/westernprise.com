<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

$payload = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request.']);
    exit;
}

if (trim((string) ($payload['website'] ?? '')) !== '') {
    http_response_code(201);
    echo json_encode(['ok' => true]);
    exit;
}

function clean_field(array $payload, string $key, int $limit = 240): string
{
    $value = trim((string) ($payload[$key] ?? ''));
    return mb_substr(str_replace(["\r", "\n"], ' ', $value), 0, $limit);
}

$fields = [
    'First name' => clean_field($payload, 'firstName', 80),
    'Last name' => clean_field($payload, 'lastName', 80),
    'Work email' => strtolower(clean_field($payload, 'workEmail', 160)),
    'Phone' => clean_field($payload, 'phone', 60),
    'Company' => clean_field($payload, 'company', 140),
    'Role' => clean_field($payload, 'role', 100),
    'Company size' => clean_field($payload, 'companySize', 60),
    'Referral source' => clean_field($payload, 'referralSource', 100),
    'Notes' => clean_field($payload, 'notes', 1200),
];

foreach (array_slice($fields, 0, 7, true) as $value) {
    if ($value === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Please complete all required fields.']);
        exit;
    }
}

if (!filter_var($fields['Work email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Enter a valid work email address.']);
    exit;
}

$body = "A new Westernprise demo request was submitted.\n\n";
foreach ($fields as $label => $value) {
    $body .= $label . ': ' . $value . "\n";
}

require_once dirname(__DIR__) . '/mail.php';
require_once dirname(__DIR__) . '/database.php';
try {
    $config = westernprise_mail_config();
    $pdo = westernprise_database($config);
    $insert = $pdo->prepare('INSERT INTO demo_requests (first_name, last_name, work_email, phone, company, role, company_size, referral_source, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $insert->execute(array_values($fields));
    $requestId = (int) $pdo->lastInsertId();
    $sent = westernprise_send_mail('New Westernprise demo request', $body, $fields['Work email']);
    $update = $pdo->prepare('UPDATE demo_requests SET notification_status = ? WHERE id = ?');
    $update->execute([$sent ? 'sent' : 'failed', $requestId]);
} catch (Throwable $error) {
    error_log('Westernprise demo request failed [' . bin2hex(random_bytes(4)) . ']: ' . $error->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'We could not save your request. Please try again.']);
    exit;
}

http_response_code(201);
echo json_encode(['ok' => true, 'notificationSent' => $sent]);
