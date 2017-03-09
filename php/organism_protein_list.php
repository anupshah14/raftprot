<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$id=$_POST["organism"];
			$query=mysql_query(" select distinct accession, protein_name, gene_name from protein_new inner join experiment_new on experiment_new.idExperiment=protein_new.Experiment_idExperiment where experiment_new.species='$id' group by gene_name") or die (mysql_error());
				
	
	while ($row=mysql_fetch_assoc($query))
	{
	$protein_accession=$row['accession'];
	if ($protein_accession!="NA"){
	$count_occurance=mysql_query("select count(accession) as protein_count from protein_new where accession='$protein_accession'") or die (mysql_error());
	while ($count_unique=mysql_fetch_assoc($count_occurance)){
			$data[]=array("details"=>'<img src=./css/images/details_open.png>')+$row+$count_unique;	
	}
}
}

echo json_encode($data);


#closing connection

mysql_close($con);

?>
