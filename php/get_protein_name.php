<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$accession=$_POST["uniprot"];
$id=$_POST["idStudy"];
//echo $accession;
//echo $id;
	//$ids=preg_replace('/\s+/','',$ids);
	$query=mysql_query("select * from experiment_new where idExperiment in (select Experiment_idExperiment from protein_new inner join experiment_new on protein_new.Experiment_idExperiment=experiment_new.idExperiment inner join study on experiment_new.Study_idStudy=study.idStudy where study.idStudy='$id' and protein_new.accession='$accession') group by idExperiment") or die (mysql_error());

	while ($row=mysql_fetch_assoc($query))
	{
	$data[]=$row;
	}


echo json_encode($data);


#closing connection

mysql_close($con);

?>
