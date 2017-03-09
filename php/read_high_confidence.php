<?php

$read=file_get_contents('high_confidence');
//$read = str_replace("\r","",$read);
$check=unserialize($read);
var_dump(unserialize(base64_decode($read)));
//$array_restored_from_db = unserialize(base64_decode($read));
//echo json_encode($array_restored_from_db);
echo json_encode($check);

?>
