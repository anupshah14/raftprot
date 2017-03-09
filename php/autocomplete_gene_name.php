<?php
#connect to database
	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
	$query=mysql_query("select distinct gene_name from protein_new group by gene_name") or die (mysql_error());
	while ($row=mysql_fetch_assoc($query))
	{
	$gene_name=explode(";",$row['gene_name']);
	foreach($gene_name as $gene){
	$gene=trim($gene);
	$data[]= array('gene_name'=>strtoupper($gene));
	}
	}
$data=array_map("unserialize", array_unique(array_map("serialize", $data)));
#closing connection
mysql_close($con);

$gene_search=$_GET["term"];
$json=array();

foreach ($data as $item)
{
	if (stripos($item['gene_name'],$gene_search)!==false){
	 $json[] = array('label' => $item['gene_name'], 'value' => $item['gene_name']);
	}
}	
echo json_encode($json);
?>
