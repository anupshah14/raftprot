<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$gene_name=$_POST["gene_name"];
	
	$query=mysql_query("select distinct accession, protein_name, gene_name from protein_new where gene_name like'%$gene_name%'") or die (mysql_error());

	while ($row=mysql_fetch_assoc($query))
	{
		$protein_accession=$row['accession'];
	//		$data[]=$protein_accession;
		$species=mysql_query("select species,COUNT(*) as numbers from experiment_new inner join protein_new on experiment_new.idExperiment=protein_new.Experiment_idExperiment where  protein_new.accession='$protein_accession'") or die (mysql_error());
		$count_occurance=mysql_query("select count(accession) as protein_count from protein_new where accession='$protein_accession'") or die (mysql_error());
	//	$species=mysql_query("select distinct species from experiment_new right join protein_new on protein_new.Experiment_idExperiment=experiment_new.idExperiment where protein_new.accession='$protein_accession'") or die (mysql_error());
		while ($count_unique=mysql_fetch_assoc($count_occurance)){
		while ($organism=mysql_fetch_assoc($species)){
	//		while ($organism=mysql_fetch_assoc($species)){
			$data[]=array("detail"=>'<img src=./css/images/details_open.png>')+$row+$count_unique+$organism;
	//		$data[]=$row+$organism;
		}	
	}
	}
	$data=array_unique($data,SORT_REGULAR);

echo json_encode($data);


#closing connection

mysql_close($con);

?>
