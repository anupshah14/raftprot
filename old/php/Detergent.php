<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();

	
	$query=mysql_query("select distinct detergent from experiment_new group by detergent") or die (mysql_error());

	while ($row=mysql_fetch_assoc($query))
	{
	if ($row['detergent']=="NA"){
		continue;
		}
	else	{
		$data[]=$row;
		}
	}
echo json_encode($data);

mysql_close($con);

?>
