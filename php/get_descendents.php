<?php
function getDescendents($id){
require_once("obo_pc_function.php");
$result=readParentChild();
$recursiveArray=array($id);
if (array_key_exists($id,$result)){
	$children=$result[$id]['c'];
	if (count($children)>0){
		$recursiveArray=$children;
		foreach($children as $child){
		$child_array=getDescendents($child);
		$recursiveArray=array_merge($recursiveArray,$child_array);
		}
	    }
	}
	return array_unique($recursiveArray);
}
# Database connection	
	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

# Get user input
	$try=$_POST["input"];
	trim($try);	
# read ontology file
require_once("ontology_new.php");
$ontology=readOntology();
for ($i=0;$i<count($ontology);$i++){
//	if (stripos($ontology[$i]['name'],$try)!==false){ //case insensitive search
	if (strcasecmp($try, $ontology[$i]['name']) == 0){
	$input=$ontology[$i]['id'];
	//echo $input;
	break;
	}
	
}	
//	$try="ID:0000076";
if (isset ($input)){
	trim($input);
	$try1=getDescendents($input);
	array_unshift($try1,$input);

	
	foreach($try1 as $checkbox){
		$query=mysql_query("select idCellName from experiment_new where idCellName like '%$checkbox%'") or die (mysql_error());	
		while ($row=mysql_fetch_assoc($query))
		{
			$ids= explode(";", $row['idCellName']);
			for ($i=0;$i<count($ontology);$i++){
				foreach($ids as $id){
				trim($id);
				if ($ontology[$i]['id']==$id){
					$try2[]=array("id"=>$ontology[$i]['id'],"name"=>$ontology[$i]['name']);
				}
			}
		}
	}
}
}
	# Unique associative array
	$try3=array_unique($try2,SORT_REGULAR);
	echo json_encode($try3);	
	
?>
					
