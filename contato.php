<?php
header('Content-Type: application/json');

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'config/config.php';
    /*================================================= SALVANDO NO BANCO DE DADOS ======================================*/
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome_completo = $_POST['nome_completo'] ?? '';
    $email = $_POST['email'] ?? '';
    $telefone = $_POST['telefone'] ?? '';
    $assunto = $_POST['assunto'] ?? '';

    try {
        $stmt = $pdo->prepare("INSERT INTO contatos (nome_completo, email, telefone, assunto) VALUES (?, ?, ?, ?)");
        $stmt->execute([$nome_completo, $email, $telefone, $assunto]);
        $dados_salvos = true;
    } catch (Exception $e) {
        $dados_salvos = false;
    }

    
    /*================================================= ENVIO DE E-MAIL ======================================*/
 
    $email_enviado = false;

    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'ngmanuel21@gmail.com';
        $mail->Password = 'ttwbbifczeyvcqwh'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom($email, $nome_completo);
        $mail->addAddress('ngmanuel21@gmail.com'); 

        $mail->CharSet = 'UTF-8';
        $mail->Subject = $nome_completo;
        $mail->isHTML(true);
        $mail->Body = "
        <div style='font-family: Arial, sans-serif; color: #333; font-size: 16px; line-height: 1.5;'>
            <p>Você recebeu uma nova mensagem de <strong>$nome_completo</strong>.</p>
            <p><strong>E-mail do remetente:</strong> $email</p>
            <hr>
                <p><strong>Mensagem:</strong></p>
                <p>" . nl2br(htmlspecialchars($assunto)) . "</p>
            <hr>
                <p><strong>Contacto:</strong> $telefone</p>
        </div>
        ";

        $mail->send();
        $email_enviado = true;
    } catch (Exception $e) {
        error_log("Erro ao enviar e-mail: {$mail->ErrorInfo}");
    }

        /*================================================= VALIDAÇÃO DE ENVIO ======================================*/
    if ($email_enviado && $dados_salvos) {
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Erro ao enviar."]);
    }
    exit;
}
?>
