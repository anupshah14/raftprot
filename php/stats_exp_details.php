<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
	//$ids=preg_replace('/\s+/','',$ids);
	$query=mysql_query("select idExperiment, count(*) as proteins, study.pubMedLink,study.firstAuthor,exp_cellname.cellname,study.year,expDescription, species from experiment_new inner join study on experiment_new.Study_idStudy=study.idStudy inner join protein_new on protein_new.Experiment_idExperiment=experiment_new.idExperiment inner join exp_cellname on exp_cellname.exp_id=experiment_new.idExperiment group by idExperiment;") or die (mysql_error());

	while ($row=mysql_fetch_assoc($query))
	{
	$data[]=array("img"=>'<img src=../php/css/examples_support/Pubmed.png>') + $row;
	}

echo json_encode($data);
#echo $json_data;

#closing connection

mysql_close($con);

?>
