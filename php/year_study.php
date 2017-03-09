<?php

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$id=$_POST["year"];
	//$ids=preg_replace('/\s+/','',$ids);
	$query=mysql_query("select idStudy, firstAuthor,year,pubMedLink, Title from study where year='$id' group by idStudy") or die (mysql_error());

	while ($row=mysql_fetch_assoc($query))
	{
	$data[]=array("img"=>'<img src=./css/images/details_open.png>') + $row;
	}

echo json_encode($data);
#echo $json_data;

#closing connection

mysql_close($con);

?>
