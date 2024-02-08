<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'libs\PHPMailer\src\Exception.php';
require 'libs\PHPMailer\src\PHPMailer.php';
require 'libs\PHPMailer\src\SMTP.php';

// if (!defined('WP_CONTENT_DIR')) {
//     define('WP_CONTENT_DIR', $_SERVER['DOCUMENT_ROOT'] . '/wp-content');
// }

// require WP_CONTENT_DIR . '/libs/PHPMailer/src/Exception.php';
// require WP_CONTENT_DIR . '/libs/PHPMailer/src/PHPMailer.php';
// require WP_CONTENT_DIR . '/libs/PHPMailer/src/SMTP.php';


// Load environment variables from .env
function loadEnvironmentVariables($filePath) {
    if (!file_exists($filePath)) {
        return false;
    }

    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue; 
        }

        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);

        if (!array_key_exists($name, $_SERVER)) {
            $_SERVER[$name] = $value;
        }
    }
}

loadEnvironmentVariables(__DIR__ . '/.env');


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require 'path/to/PHPMailerAutoload.php';

    $pdfData = base64_decode(str_replace('data:application/pdf;base64,', '', $_POST['pdfData']));
    $filename = $_POST['filename'];

    // Save the PDF on the server
    $dir = 'requested-applications';
    if (!file_exists($dir)) {
        mkdir($dir, 0777, true);
    }
    file_put_contents($dir . '/' . $filename, $pdfData);
    echo "PDF saved successfully on the server";

    // Email the PDF
    $mail = new PHPMailer;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'elena311979@gmail.com'; // SMTP username
    $mail->Password = getenv('SMTP_PASSWORD');
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('elena311979@gmail.com', 'Stomadent Dental Laboratory');
    $mail->addAddress('contact@elenasoftdev.ca'); // Add a recipient
    $mail->addAddress($_POST['dentist_email']); // Variable applicant-recipient email

    $mail->addStringAttachment($pdfData, $filename);

    $mail->isHTML(true);
    $mail->Subject = 'Here is your PDF copy of the form filled out on stomadent.ca';
    $mail->Body    = 'Please find attached the PDF you filled out on stomadent.ca';

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }
} else {
    echo "No data received";
}
