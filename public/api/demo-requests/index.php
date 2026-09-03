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
    'Preferred date' => clean_field($payload, 'preferredDate', 20),
    'Preferred time' => clean_field($payload, 'preferredTime', 30),
    'Notes' => clean_field($payload, 'notes', 1200),
];

foreach (array_slice($fields, 0, 9, true) as $value) {
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

$headers = [
    'From: Westernprise Website <no-reply@westernprise.com>',
    'Reply-To: ' . $fields['Work email'],
    'Content-Type: text/plain; charset=UTF-8',
];

if (!mail('info@westernprise.com', 'New Westernprise demo request', $body, implode("\r\n", $headers))) {
    http_response_code(500);
    echo json_encode(['error' => 'We could not send your request. Please try again.']);
    exit;
}

http_response_code(201);
echo json_encode(['ok' => true]);
