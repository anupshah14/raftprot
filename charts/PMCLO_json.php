<?php
#reading all the terms from ontology file
$obo=fopen("PMCLO_Anup_merge.obo","r");
$Ontology=array();
while (!feof($obo))
{
	$line=fgets($obo);
	if (preg_match("/^\[Term\]/",$line))
	{
	$Term=array();
	while (!feof($obo))
	{
	$line=fgets($obo);
	if (!preg_match("/^$/",$line))
	{
	array_push($Term,$line);
	}
	else
	{
	break;
	}
	}
 	$Ontology[]=array($Term);
      }

}

#print_r($Ontology);
echo json_encode($Ontology);

?>
