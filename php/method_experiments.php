<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$method=$_POST["method"];
$detergent=$_POST["detergent"];
if ($method=="Detergent Resistant Membrane (DRM) Fraction" && $detergent!=null){
	$method="DRM";
	$query=mysql_query(" select exp_title,expDescription,idExperiment,species,exp_cellname.cellname,biochemMethod,quantitation,detergent,study.firstAuthor,study.year,study.pubMedLink from experiment_new
						inner join exp_cellname on exp_cellname.exp_id=experiment_new.idExperiment
						inner join protein_new on experiment_new.idExperiment=protein_new.Experiment_idExperiment 
						inner join study on experiment_new.Study_idStudy=study.idStudy
						where experiment_new.biochemMethod='$method' and detergent='$detergent' group by idExperiment") or die (mysql_error());	
	$query_exp_id=mysql_query("select idExperiment from experiment_new where biochemMethod='$method' and detergent='$detergent' group by idExperiment") or die (mysql_error());
	}
else if ($method=="Nuclear-free DRM" || $method=="DRM; Affinity isolation using MUC1 antibodies"  && $detergent!=null){
	$query=mysql_query(" select exp_title,expDescription,idExperiment,species,exp_cellname.cellname,biochemMethod,quantitation,detergent,study.firstAuthor,study.year,study.pubMedLink from experiment_new
						inner join exp_cellname on exp_cellname.exp_id=experiment_new.idExperiment
						inner join protein_new on experiment_new.idExperiment=protein_new.Experiment_idExperiment 
						inner join study on experiment_new.Study_idStudy=study.idStudy
						where experiment_new.biochemMethod='$method' and detergent='$detergent' group by idExperiment") or die (mysql_error());	
	$query_exp_id=mysql_query("select idExperiment from experiment_new where biochemMethod='$method' and detergent='$detergent' group by idExperiment ") or die (mysql_error());
	}
	else {
	$query=mysql_query(" select exp_title,expDescription,idExperiment,species,exp_cellname.cellname,biochemMethod,quantitation,detergent,study.firstAuthor,study.year,study.pubMedLink from experiment_new
						inner join exp_cellname on exp_cellname.exp_id=experiment_new.idExperiment
						inner join protein_new on experiment_new.idExperiment=protein_new.Experiment_idExperiment 
						inner join study on experiment_new.Study_idStudy=study.idStudy
						where experiment_new.biochemMethod='$method' group by idExperiment") or die (mysql_error());	
	$query_exp_id=mysql_query("select idExperiment from experiment_new where biochemMethod='$method' group by idExperiment") or die (mysql_error());
	}

	while ($row=mysql_fetch_assoc($query))
	{
	$data['table'][]=array("img"=>'<img src=./css/images/details_open.png>') + $row;
	}
	while ($expID=mysql_fetch_assoc($query_exp_id))
	{
	$data['exp_ids'][]=$expID;
	}
echo json_encode($data);

mysql_close($con);

?>
