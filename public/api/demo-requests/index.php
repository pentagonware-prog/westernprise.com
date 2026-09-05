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

require_once dirname(__DIR__) . '/mail.php';
try {
    $config = westernprise_mail_config();
    $captchaToken = trim((string) ($payload['recaptchaToken'] ?? ''));
    $captchaSecret = trim((string) ($config['RECAPTCHA_SECRET_KEY'] ?? ''));
    $captchaHost = trim((string) ($config['RECAPTCHA_HOSTNAME'] ?? ''));
    if ($captchaToken === '' || $captchaSecret === '' || !function_exists('curl_init')) {
        throw new RuntimeException('Missing verification configuration or response.');
    }
    $captchaRequest = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt_array($captchaRequest, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query(['secret' => $captchaSecret, 'response' => $captchaToken, 'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '']),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 12,
    ]);
    $captchaResponse = curl_exec($captchaRequest);
    $captchaStatus = (int) curl_getinfo($captchaRequest, CURLINFO_RESPONSE_CODE);
    curl_close($captchaRequest);
    $captchaResult = is_string($captchaResponse) ? json_decode($captchaResponse, true) : null;
    if ($captchaStatus !== 200 || !is_array($captchaResult) || ($captchaResult['success'] ?? false) !== true
        || ($captchaHost !== '' && !hash_equals($captchaHost, (string) ($captchaResult['hostname'] ?? '')))) {
        throw new RuntimeException('Verification rejected.');
    }
} catch (Throwable $error) {
    error_log('Westernprise reCAPTCHA verification failed.');
    http_response_code(422);
    echo json_encode(['error' => 'Verification failed. Please try again.']);
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

$escape = static fn (string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$rows = '';
foreach ($fields as $label => $value) {
    $displayValue = $value !== '' ? nl2br($escape($value)) : '<span style="color:#87958f">Not provided</span>';
    $rows .= '<tr><td class="label" style="width:32%;padding:12px 14px;border-bottom:1px solid #dce5e1;color:#65746e;font-size:12px;font-weight:700;vertical-align:top">'
        . $escape($label)
        . '</td><td class="value" style="padding:12px 14px;border-bottom:1px solid #dce5e1;color:#172e27;font-size:14px;line-height:1.55;vertical-align:top">'
        . $displayValue . '</td></tr>';
}
$htmlBody = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark">'
    . '<style>:root{color-scheme:light dark;supported-color-schemes:light dark}@media(prefers-color-scheme:dark){.page{background:#0d1d18!important}.card{background:#172e27!important;border-color:#35564b!important}.intro,.value{color:#edf5f1!important}.label,.muted{color:#a9bcb5!important}.details{border-color:#35564b!important}.label,.value{border-color:#35564b!important}}</style></head>'
    . '<body class="page" style="margin:0;padding:0;background:#eef2ef;font-family:Arial,Helvetica,sans-serif;color:#172e27">'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:36px 16px">'
    . '<table role="presentation" class="card" width="100%" cellpadding="0" cellspacing="0" style="max-width:660px;background:#ffffff;border:1px solid #d7e1dc;border-radius:18px;overflow:hidden">'
    . '<tr><td style="padding:28px 32px;background:#172e27"><table role="presentation" width="100%"><tr><td><img src="https://westernprise.com/westernprise-official-logo-white.png" width="190" alt="Westernprise" style="display:block;max-width:190px;height:auto"></td><td align="right" style="color:#d2a446;font-size:11px;font-weight:800;letter-spacing:1.5px">DEMO REQUEST</td></tr></table></td></tr>'
    . '<tr><td style="padding:34px 32px 16px"><div class="intro" style="color:#172e27;font-size:25px;font-weight:800;line-height:1.25">A new business wants to see Westernprise.</div><p class="muted" style="margin:10px 0 0;color:#65746e;font-size:14px;line-height:1.6">Reply directly to this email to contact ' . $escape($fields['First name']) . '.</p></td></tr>'
    . '<tr><td style="padding:10px 32px 30px"><table role="presentation" class="details" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #dce5e1;border-radius:12px;overflow:hidden;border-collapse:separate;border-spacing:0">' . $rows . '</table></td></tr>'
    . '<tr><td style="padding:20px 32px;background:#172e27;color:#a9bcb5;font-size:11px;line-height:1.6"><strong style="color:#d2a446">Westernprise</strong><br>Connected business operations · <a href="https://westernprise.com" style="color:#ffffff;text-decoration:none">westernprise.com</a></td></tr>'
    . '</table></td></tr></table></body></html>';

require_once dirname(__DIR__) . '/database.php';
try {
    $pdo = westernprise_database($config);
    $insert = $pdo->prepare('INSERT INTO demo_requests (first_name, last_name, work_email, phone, company, role, company_size, referral_source, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $insert->execute(array_values($fields));
    $requestId = (int) $pdo->lastInsertId();
    $sent = westernprise_send_mail('New Westernprise demo request — ' . $fields['Company'], $body, $htmlBody, $fields['Work email']);
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
