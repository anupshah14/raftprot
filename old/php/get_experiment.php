<?php
//print_r($_POST);
//echo $_POST['name'];
#connect to database

$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$input=array();

//echo $_POST['name'];

      $input= array_keys($_POST);
      //$input=$_POST['name'];
	//print_r($input);
  // echo json_encode($input);

foreach($input as $checkbox){
$query=mysql_query("select * from protein_new where Experiment_idExperiment IN (select idExperiment from experiment_new where idCellName like '%$checkbox%')") or die (mysql_error());	

//$ids=preg_replace('/\s+/','',$ids);

while ($row=mysql_fetch_assoc($query))
{
$data[]=$row;
}
}

echo json_encode($data);


#closing connection

mysql_close($con);

?>
