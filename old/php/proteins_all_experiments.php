<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$ids=array();
		
 $ids=$_POST["data"];
 foreach($ids as $id){
	 $exp_id=$id['idExperiment'];
	$query=mysql_query("select * from protein_new where Experiment_idExperiment='$exp_id'") or die (mysql_error());	
	
	while ($row=mysql_fetch_assoc($query))
	{
	$data[]= $row;
	}
}

echo json_encode($data);

#closing connection

mysql_close($con);

?>
