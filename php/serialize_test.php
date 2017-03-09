<?php
$matrix=file_get_contents('exp_compare');
$expCompare=unserialize($matrix);

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$file=array();
$medium=$_POST["medium"];
	
		$query=mysql_query("select protein_new.accession,count(protein_new.accession) as protein_no, protein_new.protein_name, protein_new.gene_name, high_confidence.lable from (protein_new
							inner join experiment_new on experiment_new.idExperiment=protein_new.Experiment_idExperiment) inner join high_confidence on protein_new.accession=high_confidence.accession 
							where experiment_new.idExperiment in (select experiment_new.idExperiment from experiment_new where experiment_new.medium='$medium') group by protein_new.accession") or die (mysql_error());
		$query_exp_id=mysql_query("select idExperiment from experiment_new where medium='$medium' group by idExperiment") or die (mysql_error());
		//$query_hc=mysql_query("select * from high_confidence") or die (mysql_error());
while ($expID=mysql_fetch_assoc($query_exp_id))
	{
	$data['exp_ids'][]=$expID;
	}		
	
	while ($row=mysql_fetch_assoc($query))
	{
	$protein_accession=$row['accession'];		
	if ($protein_accession!="NA"){		
	if (array_key_exists($protein_accession,$expCompare)){
		$file[]= $protein_accession.",".$row['gene_name'].",".$expCompare[$protein_accession]['exp_string']."\n";
	$data['table'][]=array("img"=>'<img src=../php/css/examples_support/details_open.png>','exp_count'=>count($data['exp_ids'])) + $row;	
//	$data['matrix'][$protein_accession]=array('gene_name'=>$row['gene_name'],"exp_matrix"=>$expCompare[$protein_accession]['exp_string']);
	}
	

	}

}
	


//echo json_encode($data);
$filename="../download/matrix/test";
$filepath=$filename."_".time()."."."csv";
file_put_contents($filepath,$file);
//echo $filepath."\n";

$data['file'][]=$filepath;
echo json_encode($data);
#closing connection

mysql_close($con);

?>
