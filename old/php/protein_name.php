<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$id=$_POST["name"];
	//$ids=preg_replace('/\s+/','',$ids);
//	$query=mysql_query("select distinct idStudy, firstAuthor,year,(pubMedLink),Title from study inner join experiment_new on study.idStudy=experiment_new.Study_idStudy inner join protein_new on experiment_new.idExperiment=protein_new.Experiment_idExperiment where protein_new.entryname like'%$id%'") or die (mysql_error());
	$query=mysql_query("select distinct accession, protein_name, gene_name from protein_new where protein_name like'%$id%'") or die (mysql_error());

	while ($row=mysql_fetch_assoc($query))
	{
//	$data[]=;
	$protein_accession=$row['accession'];
	$count_occurance=mysql_query("select count(accession) as protein_count from protein_new where accession='$protein_accession'") or die (mysql_error());
	$species=mysql_query("select species,COUNT(*) as numbers from experiment_new inner join protein_new on experiment_new.idExperiment=protein_new.Experiment_idExperiment where  protein_new.accession='$protein_accession'") or die (mysql_error());
	while ($count_unique=mysql_fetch_assoc($count_occurance)){
	while ($organism=mysql_fetch_assoc($species)){
	$data[]= array("detail"=>'<img src=./css/images/details_open.png>')+$row+$count_unique+$organism;
//	$data[]= array("img"=>'<img src=./css/images/details_open.png>',"entryname"=>$id) + $row;
	}
	}
	}
//array_unshift($data,'<img src=../php/css/examples_support/details_open.png>');
echo json_encode($data);


#closing connection

mysql_close($con);

?>
