<?php
/**
 * Simplified Standalone SMTP Mail Handler for Hirnot Group Royal
 * Handles Phone Number Only.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$phone = isset($input['phone']) ? filter_var($input['phone'], FILTER_SANITIZE_STRING) : '';

if (empty($phone)) {
    echo json_encode(['status' => 'error', 'message' => 'Phone number is required']);
    exit;
}

// SMTP settings from your provided CodeIgniter logic
$to_email = "tyagirinkesh@gmail.com";
$to_bcc   = "akshaytyagi3102003@gmail.com";
$subject  = "New Lead (Phone Only) - Hirnot Group Royal";

$html_message = "
<html>
<head><title>New Lead Notification</title></head>
<body>
    <p>A new lead has registered with the following details:</p>
    <p><strong>Phone Number:</strong> $phone</p>
</body>
</html>
";

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: HirnotGroup <info.us@99bigha.com>" . "\r\n";
$headers .= "Bcc: $to_bcc" . "\r\n";

// Note: Ensure your server is configured to send mail via SMTP 
// or use PHPMailer for direct SMTP authentication.
// (Credentials: Host: smtp.hostinger.com | User: info.us@99bigha.com)

if (mail($to_email, $subject, $html_message, $headers)) {
    echo json_encode(['status' => 'success', 'message' => 'Email sent successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to send email']);
}
?>
