<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$query=mysql_query("select * from experiment_new inner join study on study.idStudy=experiment_new.Study_idStudy inner join exp_cellname on experiment_new.idExperiment=exp_cellname.exp_id") or die (mysql_error());
	while ($row=mysql_fetch_assoc($query))
	{
				$data[]=$row;	
	}



echo json_encode($data);


#closing connection

mysql_close($con);

?>

