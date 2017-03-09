<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$id=$_POST["idStudy"];
$medium=$_POST["medium"];
$method=$_POST["method"];
$detergent=$_POST["detergent"];
$idCellname=$_POST["idCellname"];

if (isset($medium)){
	$query=mysql_query("select * from experiment_new where Study_idStudy='$id' AND medium='$medium'") or die (mysql_error());
	//break;
	}
else if (isset($method) && isset($detergent)){	
	if ($method=="Detergent Resistant Membrane (DRM) Fraction"){
		$method="DRM";
		$query=mysql_query(" select * from experiment_new where Study_idStudy='$id' and biochemMethod='$method' and detergent='$detergent'") or die (mysql_error());
	}
	else if ($method=="Nuclear-free DRM" || $method=="DRM; Affinity isolation using MUC1 antibodies"){
	
		$query=mysql_query("select * from experiment_new where Study_idStudy='$id' and biochemMethod='$method' and experiment_new.detergent='$detergent'") or die (mysql_error());
	}
	else if (empty($detergent)) {		
	$query=mysql_query("select * from experiment_new where Study_idStudy='$id' and biochemMethod='$method'") or die (mysql_error());
	}
}
else if (isset ($idCellname)){
	$query=mysql_query("select * from experiment_new where Study_idStudy='$id' and idCellname like '%$idCellname%'");
}

else	{ 
	$query=mysql_query("select * from experiment_new where Study_idStudy like '$id'") or die (mysql_error());
	}
	while ($row=mysql_fetch_assoc($query))
	{
		if ($row['quantitation']=="NA"){
		$row['quantitation']="Qualitative";
		$data[]=$row;
		}
	else{
		$data[]=$row;
		}
	}


echo json_encode($data);


#closing connection

mysql_close($con);

?>
