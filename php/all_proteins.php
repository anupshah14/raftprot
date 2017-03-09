<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
	
	$query=mysql_query("select protein_new.accession, protein_new.gene_name, protein_new.protein_name, count(distinct protein_new.Experiment_idExperiment) as protein_count,subcell_new.subcell_loc,
						uniprot_species.species,high_confidence.description from protein_new
						left join experiment_new on protein_new.Experiment_idExperiment=experiment_new.idExperiment
						left join high_confidence on protein_new.accession=high_confidence.accession
						inner join subcell_new on protein_new.accession=subcell_new.accession
						inner join uniprot_species on uniprot_species.accession=protein_new.accession
						group by protein_new.accession") or die (mysql_error());

	while ($row=mysql_fetch_assoc($query))
	{
		$accession=$row['accession'];
		if ($accession!=='NA'){
	$data[]= $row;
}
	}

echo json_encode($data);
#echo $json_data;

#closing connection

mysql_close($con);

?>
