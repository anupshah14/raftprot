<?php
$matrix=file_get_contents('exp_compare');
$expCompare=unserialize($matrix);
#connect to database

	$con=mysql_connect("localhost","ashah5","H9ll@09") or die ('could not connect');
	mysql_select_db("lipidraft",$con);

#quering database
$data=array();
$file=array();
$headers="UniprotID,Gene_names,Exp001_van_Haller_T-cell,Exp002_Nebl_Neutrophils,Exp003_Bini_T-cell_OKT3,Exp004_Li_THP-I,Exp005_Foster_HeLa_MbCD,Exp006_Foster_HeLa_MbCD,Exp007_Foster_HeLa_Filipin,Exp008_Foster_HeLa_Nystatin,Exp009_van_Haller_T-cell_OKT3,Exp010_Blonder_Vero,Exp011_Li_THP-I,Exp012_Bae_Liver,Exp013_Sprenger_HUVEC,Exp014_Sprenger_HUVEC,Exp015_Murphy_Erythrocyte,Exp016_Blonder_Vero_Iota-b_toxin,Exp017_Yu_S16_SMase,Exp018_Yu_S16_SMase,Exp019_Yu_S16_SMase,Exp020_Sleight_Sperm,Exp021_Zheng_IMR5,Exp022_MacLellan_Smooth_muscle_PDGF,Exp023_MacLellan_Smooth_muscle_PDGF,Exp024_Paradela_Syncytiotrophoblast,Exp025_Man_RNK-16,Exp026_Man_RNK-16,Exp027_Man_RNK-16,Exp028_Kim_Liver,Exp029_Kim_Lung,Exp030_Kim_Kidney,Exp031_Kim_Brain,Exp032_Martosella_Brain,Exp033_Mannova_Huh7,Exp034_Mannova_Huh7,Exp035_Jia_Synaptosome_MbCD,Exp036_Banfi_Heart,Exp037_Sprenger_HUVEC,Exp038_Elortza_HeLa_PLD,Exp039_McMahon_Fibroblast,Exp040_Feuk-Lagerstedt_Neutrophil,Exp041_Ishmael_Brain,Exp042_Kobayashi_T-cell_CD28,Exp043_Yu_Neonatal_brain,Exp044_Yanagida_HL-60_DMSO,Exp045_Dowling_MDA-MB-435S-F,Exp046_Welker_Liver,Exp047_Behan_Brain,Exp048_Adam_LNCap,Exp049_Adam_LNCap,Exp050_Zeaiter_AGS,Exp051_Zeaiter_AGS,Exp052_Zeaiter_AGS,Exp053_Zeaiter_AGS,Exp054_Baruthio_Melanoma_cell_lines,Exp055_Lafourcade_BHK,Exp056_Elliot_Retina,Exp057_Mellgren_HEK293,Exp058_Dhungana_RAW264.7_LPS,Exp059_Dhungana_RAW264.7_LPS,Exp060_Dhungana_RAW264.7_LPS,Exp061_Dhungana_RAW264.7_LPS,Exp062_Asano_Sperm,Exp063_Ogawa_Optic_nerve,Exp064_Boyd_B-cells,Exp065_Kim_3T3-L1,Exp066_Nixon_Sperm,Exp067_Staubach_MCF-7,Exp068_Staubach_MCF-7,Exp069_Staubach_MCF-7,Exp070_Zhai_Spinal_cord,Exp071_Thompson_SH-SY5Y_SB415286,Exp072_Behan_Brain,Exp073_Behan_Brain,Exp074_Behan_Brain,Exp075_Chintagari_Pneumocyte,Exp076_Kim_C2C12,Exp077_Larive_Platelets_MbCD,Exp078_Lin_T-cell_CCL20,Exp079_Lin_T-cell_CCL20,Exp080_Ponce_Embryonic_cortical_neuron_Simvastatin,Exp081_Williamson_Embryonic_cortical_neuron,Exp082_Williamson_Embryonic_cortical_neuron,Exp083_Solstad_T-cell_Cisplatin,Exp084_Yang_DU145,Exp085_Davalos_Lung,Exp086_Inder_PC3,Exp087_Suzuki_Post_synaptic_membrane,Exp088_Zheng_MEF,Exp089_Zheng_MEF,Exp090_Zheng_MEF,Exp091_Zheng_MEF,Exp092_Zheng_MEF_MbCD,Exp093_Zheng_MEF,Exp094_Caruso_MCF10A,Exp095_Poston_NG108-15,Exp096_Goyette_J774,Exp097_Raimondo_Kidney,Exp098_Raimondo_Renal_carcinoma,Exp099_Nixon_Sperm,Exp100_Hur_Brain,Exp101_Hur_Brain,Exp102_Jiang_HeLaS3,Exp103_Arielly_SW480+SW620,Exp104_Gu_Endothelium_Atorvastatin,Exp105_Gu_HUVEC_Atorvastatin,Exp106_Xie_HepG2,Exp107_Xie_HepG2,Exp108_Kim_Stem_cell_TGF-beta1,Exp109_Seyfried_Brain,Exp110_Seyfried_Brain,Exp111_Thome_NB4_ODPC,Exp112_Boscher_MEF,Exp113_Boscher_MEF,Exp114_Chilla_Endothelial_progenitor_cell_VEGF,Exp115_Uyy_Lung,Exp116_Moltu_T-cell,Exp117_Yi_MCF-7";
$file[]=$headers."\n";
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
	$query="select protein_new.accession,count(protein_new.accession) as protein_no, protein_new.protein_name, protein_new.gene_name,high_confidence.lable from protein_new
								inner join experiment_new on experiment_new.idExperiment=protein_new.Experiment_idExperiment 
								inner join high_confidence on protein_new.accession=high_confidence.accession
								where experiment_new.idExperiment in (select experiment_new.idExperiment from experiment_new 
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
	$query.= " {$condition} experiment_new.medium {$operator[$i]} '{$data[$i]['value']}'";
	$query_exp_id.= " {$condition} medium {$operator[$i]} '{$data[$i]['value']}'";
	}		
	//else {continue;}	
	}
	$query.=" ) group by protein_new.accession";	//important last step
	//echo $query."\n";
	$query=mysql_query($query) or die (mysql_error());
	$query_exp_id=mysql_query($query_exp_id) or die (mysql_error());
	
	while ($expID=mysql_fetch_assoc($query_exp_id))
	{
	$output['exp_ids'][]=$expID;
	}
	while ($row=mysql_fetch_assoc($query))
	{
	$protein_accession=$row['accession'];
		if ($protein_accession!="NA"){
		if (array_key_exists($protein_accession,$expCompare)){
                $file[]= $protein_accession.",".$row['gene_name'].",".$expCompare[$protein_accession]['exp_string']."\n";
		$output['table'][]=array("img"=>'<img src=./css/images/details_open.png>',"exp_count"=>count($output['exp_ids']))+$row;
	}
	}	
	}
$filename="../download/matrix/compare";
$filepath=$filename."_".time()."."."csv";
file_put_contents($filepath,$file);

$output['file'][]=$filepath;	
echo json_encode($output);
//print_r($output);

#closing connection

mysql_close($con);

?>

