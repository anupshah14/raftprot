<?php
//print_r($_POST);
//echo $_POST[0];
//echo file_get_contents("php://input");
#connect to database

$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$input=file_get_contents("php://input");
//echo $input;
	
$query=mysql_query("select * from protein_new where Experiment_idExperiment like '%$input%'") or die (mysql_error());	
$query_exp_details=mysql_query("select * from experiment_new where idExperiment='$input' ") or die (mysql_error());

while ($row=mysql_fetch_assoc($query))
{
$data['proteins'][]=$row;
}

while ($details=mysql_fetch_assoc($query_exp_details))
	{
	$data['details'][]=$details;
	}
echo json_encode($data);


#closing connection

mysql_close($con);

?>
