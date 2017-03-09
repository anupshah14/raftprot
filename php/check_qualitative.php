<?php
#connect to database
$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$input=file_get_contents("php://input");
//echo $input;
	
$query=mysql_query("select quantitation from experiment_new where idExperiment like '%$input%'") or die (mysql_error());	


while ($row=mysql_fetch_assoc($query))
{
if ($row["quantitation"]=="NA"){
	$data[]="Qualitative";
}
else {
	$data[]="Quantitative";
	}
}

echo json_encode($data);


#closing connection

mysql_close($con);

?>
