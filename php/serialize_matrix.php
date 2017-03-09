<?php
ini_set("memory_limit","-1");
#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$query=mysql_query("select accession, group_concat(Experiment_idExperiment) as exp from protein_new where accession<>'NA' group by accession") or die (mysql_error());
	while ($row=mysql_fetch_assoc($query))
	{
		$accession=$row['accession'];
		$pattern='/exp/';
	        $replacement='';		
		$data[$accession]=preg_replace($pattern,$replacement,explode(",",$row['exp']));
	}
	
	$matrix=array();

	while (current($data)){
	$key=key($data);

	for ($i=0;$i<count($data[$key]);$i++){
	$id=intval($data[$key][$i]);
	for ($j=1;$j<=117;$j++){
	if ($id===$j){
	$matrix[$key][$j]=1;
	}

	}
	for ($k=1;$k<=117;$k++){
	if (!array_key_exists($k,$matrix[$key])){  //===important to avoid duplicate
	 $matrix[$key][$k]=0;
	}
	}
	}
	ksort($matrix[$key]); //sorting assoc array by key
	next($data);
	}
	$all_matrix=array();
 while (current($matrix)){
    $uniprot=key($matrix);
	$string=implode(",",$matrix[$uniprot]);
	$all_matrix[$uniprot]['exp_string']=$string;
//	echo $uniprot."\t". $string."\n";
	next($matrix);
	}

$s=serialize($all_matrix);
file_put_contents('exp_compare', $s);

#closing connection

mysql_close($con);

?>
