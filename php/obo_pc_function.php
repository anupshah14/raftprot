<?php

function readParentChild(){
require_once('ontology_new.php');
$result = readOntology();
$terms=array();
//$resultParents=array();
for ($i=0; $i<count($result); $i++)
	{
	$termID=$result[$i]['id'];
//	if (!array_key_exists($termID, $terms)){
	$terms[$termID]=array('p'=>array(),'c'=>array());
	if (isset($result[$i]['is_a'])){
		$is_Array=$result[$i]['is_a'];
	$terms[$termID]['p']=$is_Array;
		if (isset($result[$i]['relationship'])){
	 	$relationship=$result[$i]['relationship'];
			for ($j=0;$j<count($relationship);$j++){
			array_push($terms[$termID]['p'],$relationship[$j]);
			}	
		}
	   }
		
	elseif((!isset($result[$i]['is_a'])) && (isset($result[$i]['relationship']))){
	$only_relations=$result[$i]['relationship'];
	$terms[$termID]['p']=$only_relations;
	}
	else{$terms[$termID]['p']=array();
	     $terms[$termID]['c']=array();
		}
	}

	foreach(array_keys($terms) as $termID){
	 for ($i=0;$i<count($terms[$termID]['p']);$i++){
		$singleParent=$terms[$termID]['p'][$i];
		if (array_key_exists($singleParent,$terms)){
		array_push($terms[$singleParent]['c'],$termID);
		}
	}
	}
	 return $terms;
}
	
//	for($a=0;$a<count($terms);$a++){
//	$termID=$term[$a];
//	foreach($terms[$termID]['p'] as $singleParent){
//	for ($k=0;$k<count($terms[$termID]['p']);$k++){
//		$singleParent=$terms[$termID]['p'][$k];
//	if (array_key_exists($singleParent,$terms)){
//		array_push($terms[$singleParent]['c'],$termID);
//		}
//	}
	
//	$termParents=array();
//	$termParents=$terms[$termID]['p'];
//	print_r($termParents);
//  $terms[$termID]['p']=$is_Array;
/*      for ($k=0;$k<count($terms[$termID]['p']);$k++){
              $singleParent=$terms[$termID]['p'][$k];
            if (!array_key_exists($singleParent, $terms)){
//          $terms[$singleParent]['c']=array();
	$terms[$singleParent]=array('p'=>array(),'c'=>array());
             array_push($terms[$singleParent]['c'],$termID);
              }
	}*/
//	foreach  ($terms[$termID]['p'] as $singleParent){
/*      	for ($k=0;$k<count($terms[$termID]['p']);$k++){
              $singleParent=$terms[$termID]['p'][$k];
//		echo $singleParent. "\n" ;
	if (!array_key_exists($singleParent,$terms)){
//		$terms[$singleParent]=array('p'=>array(),'c'=>array());
//		$terms[$singleParent]['p']=$termParents;
	$children=array();

	array_push($children,$termID);
//	$terms[$singleParent]['c']=$children;
	//$terms[$singleParent]['c'][$k]=$termID;
		}
	print_r($children);
//	else {$terms[$singleParent]['c']=array();}
	}*/
//}
	//print_r($terms);
?>
