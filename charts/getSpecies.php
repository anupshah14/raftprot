<?php 

#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$table=array();
#DataTable headngs
$table['cols']=array(
		     array('lable'=>'Species', 'type'=>'string'),
		     array('lable'=>'Frequency','type'=>'number')
		    );
				
#SQL to count number of experiments in each year				
$query=mysql_query("SELECT species,COUNT(*) as count FROM experiment_new GROUP BY species ORDER BY count DESC") or die (mysql_error());
$rows=array();
	while ($row=mysql_fetch_assoc($query))
	{
		$temp=array();
		$temp[]=array('v'=>$row['species']);
		$temp[]=array('v'=>intval($row['count'])); #  intval converting string to integer
		$rows[]=array('c' => $temp); #creates each row of query result and put them into array
	}

#Googlechart DataTable rows	
$table['rows']=$rows;


#convert array into JSON
echo json_encode($table);

#closing connection

mysql_close($con);

?>
