<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$id=$_POST["accession"];
	
	$query=mysql_query("select distinct idStudy, firstAuthor,year,(pubMedLink),Title from study inner join experiment_new on study.idStudy=experiment_new.Study_idStudy inner join protein_new on experiment_new.idExperiment=protein_new.Experiment_idExperiment where protein_new.accession='$id'") or die (mysql_error());	
	while ($row=mysql_fetch_assoc($query))
	{
	$data[]= array("img"=>'<img src=./css/images/details_open.png>', "accession"=>$id) + $row;
	}

echo json_encode($data);


#closing connection

mysql_close($con);

?>
