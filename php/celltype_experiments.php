<?php
#connect to database

$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$input=array();
      $input= array_keys($_POST);

foreach($input as $checkbox){
$query=mysql_query(" select exp_title,expDescription,idExperiment,species,exp_cellname.cellname,biochemMethod,quantitation,detergent,study.firstAuthor,study.year,study.pubMedLink from experiment_new
						inner join exp_cellname on exp_cellname.exp_id=experiment_new.idExperiment
						inner join protein_new on experiment_new.idExperiment=protein_new.Experiment_idExperiment 
						inner join study on experiment_new.Study_idStudy=study.idStudy
						where experiment_new.idCellName like '%$checkbox%' group by idExperiment") or die (mysql_error());	
$query_exp_id=mysql_query("select idExperiment from experiment_new where idCellName like '%$checkbox%' group by idExperiment") or die (mysql_error());

while ($row=mysql_fetch_assoc($query))
{
$data['table'][]=array("img"=>'<img src=./css/images/details_open.png>',"idCellname"=>$checkbox) + $row;
}
while ($exp_id=mysql_fetch_assoc($query_exp_id)){
	$data['exp_ids'][]=$exp_id;
}
}

echo json_encode($data);


#closing connection

mysql_close($con);

?>
