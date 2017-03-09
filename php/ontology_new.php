<?php
/**
 * reading all the terms from ontology file
 * Make sure there is a blank line at the end of the obo file. Otherwise the last line won't get read
 * Returns an array of associative array. Each associative array is a term in the obo file.
 */
function readOntology(){
	$obo=fopen("PMCLO.obo","r");
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
				
				if ($item[0]== "synonym"){
					if (!isset($term['synonym'])){
						$term['synonym']=array();
					}
					array_push($term['synonym'],trim($item[1]));
				} 				
                                elseif($item[0]== "is_a"){
					$isID= explode("!", $item[1], 2);
                                        if (!isset($term['is_a'])){
                                                $term['is_a']=array();
                                        }
                                        array_push($term['is_a'],trim($isID[0]));
                                } 

				
				elseif ($item[0] == "relationship"){
					$relationshipID= explode(" ",$item[1], 4);
					if (!isset($term['relationship'])){
						$term['relationship'] = array();
					} 
					array_push($term['relationship'], trim($relationshipID[2]));
				} else 	$term[$item[0]] = trim($item[1]); 						
				$line=fgets($obo);
			}
			array_push($oboArray, $term);
		}
	}

	return $oboArray;
//	json_encode($oboArray);
}
//$result=readOntology();
//echo json_encode($result);
?>
