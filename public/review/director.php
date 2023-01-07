<?php

$from = 'site@kloto.test'; // отправитель
$to = 'yehajam589@prolug.com'; // получатель (укажите тут вашу почту, куда должно приходить письмо)
$subject = 'Уведомление из формы "Предложение директору"'; // тема письма
$message = 'Сообщение: ' . (isset($_POST['text']) ? $_POST['text'] : '');
$headers = 'From: ' . $from . "\r\n" .
    'Reply-To: ' . $from . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

echo mb_send_mail($to, $subject, $message, $headers);