<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
	
	$query=mysql_query("select protein_new.accession, protein_new.gene_name, protein_new.protein_name, count(distinct experiment_new.biochemMethod,experiment_new.detergent) as biochemCount,count(distinct protein_new.Experiment_idExperiment) as protein_count,subcell_new.subcell_loc,uniprot_species.species from (protein_new left join experiment_new on protein_new.Experiment_idExperiment=experiment_new.idExperiment inner join subcell_new on protein_new.accession=subcell_new.accession inner join uniprot_species on uniprot_species.accession=protein_new.accession) where protein_new.accession<>'NA' group by protein_new.accession") or die (mysql_error());

	while ($row=mysql_fetch_assoc($query))
	{
		if ($row['biochemCount']>1){
	$data[]= $row;
}
	}

$safe_string_to_store = base64_encode(serialize($data));

//var_dump($safe_string_to_store);
file_put_contents('high_confidence',serialize($safe_string_to_store));
#echo $json_data;

#closing connection

mysql_close($con);

?>
