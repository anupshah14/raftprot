<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$data[]=array('biochemMethod'=>'Select from following..');
	
	$query=mysql_query("select distinct biochemMethod from experiment_new group by biochemMethod") or die (mysql_error());

	while ($row=mysql_fetch_assoc($query))
	{
	if ($row['biochemMethod']=="DRM"){
		$row['biochemMethod']="Detergent Resistant Membrane (DRM) Fraction";
		$data[]=$row;
		}
	else	{
		$data[]=$row;
		}
	}
echo json_encode($data);

mysql_close($con);

?>
