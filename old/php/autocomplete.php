<?php
require_once("ontology_new.php");
$result=readOntology();
//$names=$result['name'];
//print_r($result);
$try=$_GET["term"];
$json=array();

foreach ($result as $item)
{
	if (stripos($item['name'],$try)!==false){
	 $json[] = array('label' => $item['name'], 'value' => $item['name']);
	}
}	
echo json_encode($json);
?>
