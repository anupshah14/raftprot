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
	$query=mysql_query("select protein_new.accession,entryName,originalID,ratio,changed,protein_name,gene_name,high_confidence.lable,experiment_new.exp_title from protein_new 
						inner join experiment_new on experiment_new.idExperiment=protein_new.Experiment_idExperiment
						right join high_confidence on protein_new.accession=high_confidence.accession	
						 where experiment_new.idExperiment='$exp_id'") or die (mysql_error());	
	
	while ($row=mysql_fetch_assoc($query))
	{
	$data[]= $row;
	}
}

echo json_encode($data);

#closing connection

mysql_close($con);

?>
