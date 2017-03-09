<?php
#connect to database
	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
	$query=mysql_query("select distinct protein_name from protein_new group by protein_name") or die (mysql_error());
	while ($row=mysql_fetch_assoc($query))
	{
	$data[]= $row;
	}

#closing connection
mysql_close($con);

$try=$_GET["term"];
$json=array();

foreach ($data as $item)
{
	if (stripos($item['protein_name'],$try)!==false){
	 $json[] = array('label' => $item['protein_name'], 'value' => $item['protein_name']);
	}
}	
echo json_encode($json);
?>
