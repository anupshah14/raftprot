<?php
/**
 * reading all the terms from ontology file
 * Make sure there is a blank line at the end of the obo file. Otherwise the last line won't get read
 * Returns an array of associative array. Each associative array is a term in the obo file.
 */
function readCellNameOntology(){
	$obo=fopen("PMCLO_modified.obo","r");
	// $obo=fopen("test.obo","r");
	$oboArray = array();
	while (!feof($obo))
	{
		$line=fgets($obo);
		if (preg_match("/^\[Term\]/",$line)){
	//	if ($line == "[Term]"){
			$term = array();
			$line=trim(fgets($obo));
			while (!feof($obo) && strlen($line) > 2  ){
				$item = explode(":", $line, 2);
				$term[$item[0]] = trim($item[1]);
				if ($item[0]== "name"){
					break;
				} 						
				$line=fgets($obo);
			}
			array_push($oboArray, $term);
		}
	}

	return $oboArray;
//	json_encode($oboArray);
}
//$try=array();
$termid=$_POST["TermID"];
//print_r($_POST);
//foreach ($_POST["TermID"] as $term){
		//echo $term;
	//}
trim($termid);
$ids=array();
$ids= explode(";", $termid);
//print_r($ids);
$ontology=readCellNameOntology();
$cellName=array();
for ($i=0;$i<count($ontology);$i++){
	for ($j=0;$j<count($ids);$j++){
	if ($ids[$j]==$ontology[$i]['id']){ //case insensitive search
	$cellName[$j]=$ontology[$i]['name'];
	//echo $input;
	//break;
	}
	}
	}
echo json_encode($cellName);
//$result=readCellNameOntology();
//echo json_encode($result);
?>
