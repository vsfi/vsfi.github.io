<?php

## CONFIG ##

# LIST EMAIL ADDRESS - enter the lists email address here 
$recipient = "pcshiverov@gmail.com";

# SUBJECT (Subscribe/Remove)
$subject = "Subscribe";

# RESULT PAGE - enter the URL of the result page here
$location = "/index.html";

## FORM VALUES ##

# SENDER - WE ALSO USE THE RECIPIENT AS SENDER
# DON'T INCLUDE UNFILTERED USER INPUT IN THE MAIL HEADER!
# SEE ALSO: How to protect a php Email Form using php mail or mb_send_mail against Mail Header Injection
$sender = $recipient;

# MAIL BODY
$body .= "Name: ".$_REQUEST['Name']." \n";
$body .= "Email: ".$_REQUEST['Email']." \n";
# add more fields here if required

## SEND MESSGAE ##

mail( $recipient, $subject, $body, "From: $sender" ) or die ("Mail could not be sent.");

## SHOW RESULT PAGE ##

header( "Location: $location" );
?>