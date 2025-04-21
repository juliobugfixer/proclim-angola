
<?php
header('Content-Type: application/json');


require 'config/config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $telefone = $_POST['telefone'] ?? '';
    $servico = $_POST['servico'] ?? '';


    /*================================================= SALVANDO NO BANCO DE DADOS ======================================*/
    try {
        $stmt = $pdo->prepare("INSERT INTO orcamentos (nome, email, telefone, servico) VALUES (?, ?, ?,?)");
        $stmt->execute([$nome, $email, $telefone, $servico]);
        $dados_salvos = true;
    } catch (Exception $e) {
        $dados_salvos = false;
    }

    /*================================================= ENVIANDO PELO WHATSAPP ======================================*/
    $numero = "+244926737341"; 
    $texto = "Olá, me chamo $nome.\nGostaria de um orçamento para o serviço de: $servico.\nMeu telefone é $telefone.";
    $link = "https://wa.me/$numero?text=" . urlencode($texto);

    header("Location: $link");
    exit;
}
?>