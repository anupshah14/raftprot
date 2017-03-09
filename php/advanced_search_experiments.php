<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$output=array();
$condition=$_POST["condition"];
$data=$_POST["rules"];
$operator=array();
for ($j=0;$j<count($data);$j++){
	if ($data[$j]['operator']==="equal"){
		$operator[$j]="=";
	}
	else if ($data[$j]['operator']==="not_equal"){
		$operator[$j]="<>";
	}
	else if ($data[$j]['operator']==="contains"){
		$operator[$j] ="LIKE";
	}	
	}
	$query="select exp_title,expDescription,idExperiment,species,exp_cellname.cellname,biochemMethod,quantitation,detergent,study.firstAuthor,study.year,study.pubMedLink from experiment_new
						inner join exp_cellname on exp_cellname.exp_id=experiment_new.idExperiment
						inner join protein_new on experiment_new.idExperiment=protein_new.Experiment_idExperiment 
						inner join study on experiment_new.Study_idStudy=study.idStudy	
		where ";
	$query_exp_id="select idExperiment from experiment_new where ";
	if ($data[0]['id']=="species" || $data[0]['id']=="biochemMethod" || $data[0]['id']=="idCellname" || $data[0]['id']=="detergent"){
			$query.="experiment_new.{$data[0]['id']} {$operator[0]} '{$data[0]['value']}'";
			$query_exp_id.="{$data[0]['id']} {$operator[0]} '{$data[0]['value']}'";
	}
	else if ($data[0]['id']=="treatment"){
			$query.="experiment_new.medium {$operator[0]} '{$data[0]['value']}'";
			$query_exp_id.="medium {$operator[0]} '{$data[0]['value']}'";
	}
	else if ($data[0]['id']=="stimulation"){
			$query.="experiment_new.Expcondition='Stimulation' and experiment_new.medium {$operator[0]} '{$data[0]['value']}'";
			$query_exp_id.="Expcondition='Stimulation' and medium {$operator[0]} '{$data[0]['value']}'";
	}
	for ($i=1;$i<count($data);$i++){	
	if ($data[0]['id']==$data[$i]['id'] && $condition==="AND"){
		if ($i==1){			
			$words = explode( " ", $query );
			array_splice( $words, -2 );
			$query=implode( " ", $words );
			$query_exp_id=implode( " ", $words );
			$query.=" IN ('{$data[0]['value']}','{$data[1]['value']}')";
			$query_exp_id.=" IN ('{$data[0]['value']}','{$data[1]['value']}')";
		//	echo $query. "\n";
		}
		else if ($data[1]['id']==$data[$i]['id']){
			$query=preg_replace("/\)$/i", "", $query);
			$query_exp_id=preg_replace("/\)$/i", "", $query);
			//$query=substr($query,0,-1);
			$query.=",'{$data[$i]['value']}')";
			$query_exp_id.=",'{$data[$i]['value']}')";
		//	echo $query. "\n";
		}
		
		}

	else if ($data[$i]['id']=="species" || $data[$i]['id']=="biochemMethod" || $data[$i]['id']=="idCellname" || $data[$i]['id']=="detergent"){
		if ($i==1){			
			$query.=" {$condition} experiment_new.{$data[1]['id']} {$operator[1]} '{$data[1]['value']}'";
			$query_exp_id.=" {$condition} {$data[1]['id']} {$operator[1]} '{$data[1]['value']}'";
			continue;
			}	
	$query.= " {$condition} experiment_new.{$data[$i]['id']} {$operator[$i]} '{$data[$i]['value']}'";
	$query_exp_id.= " {$condition} {$data[$i]['id']} {$operator[$i]} '{$data[$i]['value']}'";
	}	
	else if ($data[$i]['id']=="treatment"){
	$query.= " {$condition} experiment_new.medium {$operator[$i]} '{$data[$i]['value']}'";
	$query_exp_id.= " {$condition} medium {$operator[$i]} '{$data[$i]['value']}'";
	}
	else if ($data[$i]['id']=="stimulation"){		
	$query.= " {$condition} experiment_new.Expcondition='Stimulation' and experiment_new.medium {$operator[$i]} '{$data[$i]['value']}'";
	$query_exp_id.= " {$condition} Expcondition='Stimulation' and medium {$operator[$i]} '{$data[$i]['value']}'";
	}		
	//else {continue;}	
	}	
	//echo $query."\n";
	$query.="  group by idExperiment";
	$query=mysql_query($query) or die (mysql_error());
	$query_exp_id=mysql_query($query_exp_id) or die (mysql_error());
	while ($row=mysql_fetch_assoc($query))
	{
	$output['table'][]=array("img"=>'<img src=./css/images/details_open.png>') + $row;
	}	
	while ($expID=mysql_fetch_assoc($query_exp_id))
	{
	$output['exp_ids'][]=$expID;
	}

echo json_encode($output);
//print_r($output);

#closing connection

mysql_close($con);

?>
