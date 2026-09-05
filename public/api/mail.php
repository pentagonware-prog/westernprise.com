<?php
declare(strict_types=1);

function westernprise_mail_config(): array
{
    $root = dirname(__DIR__);
    // A source checkout keeps secrets outside public/. cPanel uses its document root.
    if (is_file(dirname($root) . '/package.json')) {
        $root = dirname($root);
    }
    $path = $root . '/.env';
    if (!is_file($path)) {
        throw new RuntimeException('Mail environment file is missing.');
    }
    $config = parse_ini_file($path, false, INI_SCANNER_RAW);
    if ($config === false) {
        throw new RuntimeException('Mail environment file is invalid.');
    }
    return $config;
}

function westernprise_send_mail(string $subject, string $body, string $replyTo): bool
{
    $config = westernprise_mail_config();
    $from = $config['MAIL_FROM_ADDRESS'] ?? '';
    $to = $config['MAIL_TO_ADDRESS'] ?? '';
    $name = $config['MAIL_FROM_NAME'] ?? 'Westernprise';
    foreach ([$from, $to, $replyTo] as $address) {
        if (preg_match('/[\r\n]/', $address) || !filter_var($address, FILTER_VALIDATE_EMAIL)) {
            throw new RuntimeException('Invalid mail address configuration.');
        }
    }
    if (preg_match('/[\r\n]/', $name . $subject)) {
        throw new RuntimeException('Invalid mail header.');
    }
    if (($config['MAIL_MAILER'] ?? 'brevo') !== 'brevo'
        || ($config['MAIL_FALLBACK_MAILER'] ?? 'php_mail') !== 'php_mail') {
        throw new RuntimeException('Unsupported mail configuration.');
    }

    $key = $config['BREVO_API_KEY'] ?? '';
    if ($key !== '' && function_exists('curl_init')) {
        $request = curl_init('https://api.brevo.com/v3/smtp/email');
        curl_setopt_array($request, [
            CURLOPT_POST => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_TIMEOUT => 15,
            CURLOPT_HTTPHEADER => ['accept: application/json', 'content-type: application/json', 'api-key: ' . $key],
            CURLOPT_POSTFIELDS => json_encode([
                'sender' => ['name' => $name, 'email' => $from],
                'to' => [['email' => $to]],
                'replyTo' => ['email' => $replyTo],
                'subject' => $subject,
                'textContent' => $body,
            ], JSON_THROW_ON_ERROR),
        ]);
        $response = curl_exec($request);
        $status = (int) curl_getinfo($request, CURLINFO_RESPONSE_CODE);
        curl_close($request);
        if ($response !== false && $status >= 200 && $status < 300) {
            return true;
        }
        // Do not log payloads, credentials, or recipient details.
        error_log('Westernprise: Brevo unavailable; attempting PHP mail fallback.');
    }

    return mail($to, $subject, $body, implode("\r\n", [
        'From: ' . $name . ' <' . $from . '>',
        'Reply-To: ' . $replyTo,
        'Content-Type: text/plain; charset=UTF-8',
    ]));
}
