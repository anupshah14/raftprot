<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$medium=$_POST["medium"];

	
		$query=mysql_query("select protein_new.accession,count(protein_new.accession) as protein_no, protein_new.protein_name, protein_new.gene_name from protein_new
							inner join experiment_new on experiment_new.idExperiment=protein_new.Experiment_idExperiment 
							where experiment_new.idExperiment in (select experiment_new.idExperiment from experiment_new where experiment_new.medium='$medium') group by protein_new.accession") or die (mysql_error());
		$query_exp_id=mysql_query("select idExperiment from experiment_new where medium='$medium' group by idExperiment") or die (mysql_error());
		
	
	while ($row=mysql_fetch_assoc($query))
	{
		$protein_accession=$row['accession'];
	if ($protein_accession!="NA"){
	$data['table'][]=array("img"=>'<img src=./css/images/details_open.png>') + $row;
	}
	}
while ($expID=mysql_fetch_assoc($query_exp_id))
	{
	$data['exp_ids'][]=$expID;
	}

echo json_encode($data);


#closing connection

mysql_close($con);

?>
