<html>
<body>


<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $from = 'From: Masterpeace Records';
    $to = 'masterpeace.tm@gmail.com';
    $subject = 'Beat Inquiry';

    $body = "From: $name\n E-Mail: $email\n Message:\n $message";

    if ($_POST['submit']) {
        if (mail ($to, $subject, $body, $from)) {
	          echo '<p>Your message has been sent!</p>';
      	} else {
      	    echo '<p>Something went wrong, go back and try again!</p>';
      	}

    }
?>

</body>
</html>
