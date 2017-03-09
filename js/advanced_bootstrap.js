$(function() {
$( "#choose_advanced" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,        
      buttons: {
        "Search": function() {
		$(this).dialog('close');
		var data= document.getElementsByName('choose_advanced');
        for (var i = 0, length = data.length; i < length; i++) {
		if (data[i].checked) {         
        choose.options=data[i].value;
		}
	}
if (choose.options==null){
					alert ("No input selected");
					}
else if(choose.options!==""){
	 $( "#query_builder" ).dialog( "open" );
        $('#adv_search').queryBuilder({
		allow_groups: false,
		sortable: false,
	filters: [  
  {
    id: 'idCellname',
    label: 'Cell/Tissue/Organ',
    type: 'string',
    input: 'select',
    values: {
		"ID:0000021":"3T3-L1",
		"ID:0000070":"Adipose tissue derived mesenchymal stem cells",
		"ID:0000017":"AGS",
		"ID:0000047":"B Cells",
		"ID:0000108":"BHK",
		"FMA:50801":"Brain",
		"ID:0000024":"C2C12",
		"ID:0000026":"DU145",
		"ID:0000054":"Embryonic cortical neurons",
		"ID:0000069":"Endothelial progenitor cells",
		"ID:0000096":"Endothelium",
		"ID:0000104":"Erythrocyte",
		"ID:0000071":"Fibroblast",
		"FMA:7088":"Heart",
		"ID:0000115":"HEK293",
		"ID:0000008":"HeLa",
		"ID:0000036":"HeLa S3",
		"ID:0000037":"HepG2",
		"ID:0000056":"HEPG2.15",
		"ID:0000103":"HL-60",
		"ID:0000011":"Huh7",
		"ID:0000015":"HUVEC",
		"ID:0000009":"IMR5",
		"ID:0000066":"J774",
		"ID:0000048":"Jurkat T-cell",
		"FMA:7203":"Kidney",
		"FMA:7197":"Liver",
		"ID:0000016":"LNCap",
		"FMA:7195":"Lung",
		"ID:0000064":"MAF10CA1a",
		"ID:0000063":"MAF10TG3B",
		"ID:0000061":"MCF10A",
		"ID:0000062":"MCF10AT",
		"ID:0000022":"MCF-7",
		"ID:0000052":"MCL",
		"ID:0000107":"MDA-MB-435S -F\/Taxol-10p4p",
		"ID:0000106":"MDA-MB-435S-F",
		"ID:0000032":"MEF",
		"ID:0000105":"NB4",
		"ID:0000030":"Neonatal brain cells",
		"ID:0000050":"Neutrophil Azurophil Granules",
		"ID:0000033":"Neutrophils",
		"ID:0000067":"NG108-15",
		"ID:0000051":"Optic Nerve",
		"ID:0000027":"PC3",
		"ID:0000025":"Platelets",
		"ID:0000068":"Post synaptic membrane",
		"ID:0000012":"Raji",
		"ID:0000018":"RAW264.7",
		"ID:0000065":"Renal cell carcinoma cells",
		"ID:0000114":"Retina",
		"ID:0000113":"RNK-16",
		"ID:0000040":"S16 Schwann Cells",
		"ID:0000099":"SBCl2",
		"ID:0000102":"SH-SY5Y",
		"ID:0000055":"SK-MEL-28",
		"ID:0000039":"Smooth Muscle Cells",
		"ID:0000038":"Sperm cells",
		"ID:0000053":"Spinal Cord",
		"ID:0000057":"SW480",
		"ID:0000059":"SW620",
		"ID:0000097":"Synaptosome",
		"ID:0000041":"Syncytiotrophoblast cells",
		"ID:0000006":"T Cells",
		"ID:0000045":"THP-I",
		"ID:0000023":"Type 2 Pneumocyte",
		"ID:0000005":"Vero",
		"ID:0000101":"WM239A",
		"ID:0000100":"WM793"	
    },
    operators: ['equal']
  },
	{
    id: 'species',
    label: 'Organism',
    type: 'string',
    input: 'radio',
    values: {
      "Human": 'Human',
      "Rat": 'Rat',
      "Mouse":'Mouse',
      "Bovine":'Bovine',
      "Monkey":'African Green Monkey',
      "Hamster":'Hamster',      
    },
    operators: ['equal', 'not_equal']    
  },
  {
    id: 'biochemMethod',
    label: 'Method',
    type: 'string',
    input: 'select',
    values: {	
		"Affinity isolation using cholera toxin B": "Affinity isolation using cholera toxin B",
        "Affinity isolation using MUC1 antibodies": "Affinity isolation using MUC1 antibodies",
        "Cationic silica purification": "Cationic silica purification",  
        "Detergent Free Method": "Detergent Free Method",  
		"DRM": "Detergent Resistant Membrane (DRM) Fraction", 
		"Nuclear-free DRM": "Nuclear-free DRM",  
        "pH/carbonate resistance": "pH/carbonate resistance",    
        
			},
	operators: ['equal', 'not_equal']
	},
	{
    id: 'detergent',
    label: 'Detergent',
    type: 'string',
    input: 'select',
    values: {
	  "Brij-35": "Brij-35",
      "Brij-58": "Brij-58",
      "CHAPSO": "CHAPSO",
      "Sodium Carbonate": "Sodium Carbonate",
      "sucrose-LSB": "Sucrose-LSB",
      "Triton X-100": "Triton X-100",
      "Triton X-114": "Triton X-114",
		},
	operators: ['equal', 'not_equal']
  },
 {
    id: 'treatment',
    label: 'Condition',
    type: 'string',
    input: 'select',
    values: {
		"Atorvastatin": "Atorvastatin",
		"Bacterial sphingomyelinase": "Bacterial sphingomyelinase",
		"CCL20":"CCL20",
		"CD28":"CD28",
		"Cisplatin": "Cisplatin",
		"DMSO":"DMSO",
		"Filipin": "Filipin",
		"Iota-b toxin": "Iota-b toxin",
		"Lipopolysaccharide":"Lipopolysaccharide",
		"Methyl-beta-cyclodextrin": "Methyl-beta-cyclodextrin",
		"Nystatin": "Nystatin",
		"ODPC": "ODPC",
		"OKT3": "OKT3",
		"Phospholipase D": "Phospholipase D",
		"Platelet derived growth factor":"Platelet derived growth factor",
		"SB415286": "SB415286",
		"Simvastatin": "Simvastatin",
		"TGF-beta1":"TGF-beta1",		
		"VEGF": "VEGF ",	
    },
    operators: ['equal', 'not_equal']    
  },
],
  		
});
	
	}
}
}
});

 $( "#query_builder" ).dialog({
      autoOpen: false,
      height: 350,
      width: 650,
      modal: true,
      buttons: {
		"Submit": function() {
	if (choose.options==="Experiment"){	
		  $( this ).dialog( "close" );	
		  $(".grid.cs-style-3").hide();
		  $("#back_search").show();
		  $("#all_proteins_list").show();
		$("#heading").text(''+choose.options+ 's Advanced search ' );
		  var input =	$('#adv_search').queryBuilder('getRules');			
		  var outData = $.ajax({
          url: "./php/advanced_search_experiments.php",
          type: "POST",
          data: input,
          dataType:"json",
          async: false
          }).responseText;	
		newData=$.parseJSON(outData);
		//console.log(newData);		
		//console.log(outData);	
		if(newData.length==0){
                alert("No results found for the search");
        }
        else {

		$("#table_organism").show();
		oTable=$('#table_organism').dataTable({
				  "sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "bProcessing": true,
				  "bJQueryUI": true,
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":newData.table,
				  "aoColumns": [
					{ "mData": "species"},
					{ "mData": "cellname"},				
					{ "mData": "firstAuthor", 
						"mRender": function (data, type,full) {
						return '<a id="paper_link" href="' + full['pubMedLink'] + '" target="_blank">' + full['firstAuthor'] + '</a>';
					}},
					{ "mData": "year" , "sClass": "center"},
					{ "mData": "expDescription","sWidth":"30%"},
					{ "mData": "biochemMethod"},
					{ "mData": "detergent"},
					{ "mData": "quantitation"},
					{ "mData": "img", 
						"mRender": function (data, type,full) {
						return '<a id="paper_link" href="Experiment_details.html?id='+ full['idExperiment'] + '" target="_blank">' + full['img']+'</a>';
					},
						"sClass": "center", "sWidth": "05%","bSortable": false}
					],
					"aaSorting": [[3, 'asc']], 
					"oTableTools": {
						"aButtons": [
							"print",  
							{
							"sExtends":    "collection",
							"sButtonText": "Save Result",
							"aButtons":    [ "xls", "pdf" ]
							}		
							]
					},
	
			  });	
	}
	$('#adv_search').queryBuilder('reset');
			  }
	else if (choose.options==="Protein"){		
		  $( this ).dialog( "close" );		  	
		  $(".container .grid.cs-style-3").hide();
		  $("#back_search").show();
		$("#heading").text(''+choose.options+ 's Advanced search ' );
		 var input =	$('#adv_search').queryBuilder('getRules');	
	var outData = $.ajax({
          url: "./php/advanced_search_proteins.php",
          type: "POST",
          beforeSend: function() {
               $("#overlay").show(); 
            },
            complete: function() {
                $("#overlay").hide();
            },
          data: input,
          dataType:"json",
          async: false
          }).responseText;	
	newData=$.parseJSON(outData);
	if(newData.length==0){
		alert("No results found for the search");
	}
	else {
	$('#table_gene_name').show();
		oTable=$('#table_gene_name').dataTable({
				  "bProcessing": true,
				  "bJQueryUI": true,
				  "sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "iDisplayLength": 100,
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":newData.table,
				  "aoColumns": [
					{ "mData": "gene_name","sClass": "center",
					"mRender": function (data, type,full) {
						var first_geneName=full['gene_name'].split(";");
						return first_geneName[0].toUpperCase();
					}},
					{ "mData": "accession", 
					"mRender":function(data, type,full) {
						if (full['accession']=="NA"){
								full['accession']="--";
								return '<a id="protein_na">' + full['accession'] + '</a>';
							}
							else{
							return '<a id="uniprot_link" href="http://www.uniprot.org/uniprot/'+full['accession']+'" target="_blank">' + full['accession'] + '</a>';
							}
					},
					"sClass": "center", "sWidth": "05%","bSortable": false},
					{ "mData": "protein_name","sWidth":"60%"},
					{ "mData": "protein_no",
						 "sClass": "center" },
					{ "mData": "exp_count",
						 "sClass": "center" },
					{ "mData": "lable", "sClass": "center" ,
						"mRender":function(data, type,full) {
						if (full['lable']==null){
								full['lable']="--";
								return full['lable'];
							}
							else{
							return  full['lable'];
							}
					}
					}
					],
					"aaSorting": [[3, 'desc']],
					"oTableTools": {
						"aButtons": [
							"print",  
							{
							"sExtends":    "collection",
							"sButtonText": "Save Results",
							"aButtons":    [ "csv",	"pdf" ]
							},
							{								
							"sExtends":    "text",
							"sButtonText": "Analyse",
							"sToolTip": "Save experiment comparison in binary matrix form for proteins in this search in all 117 experiments of RaftProt",
							"fnClick": function ( nButton, oConfig, oFlash ) {
								window.location=newData.file;
							}
							}
						
							]
						}
				  });
		}	
		 $('#adv_search').queryBuilder('reset');
	}

	else if (choose.options==="HC"){		
		  $( this ).dialog( "close" );		  	
		  $(".container .grid.cs-style-3").hide();
		  $("#back_search").show();
		$("#heading").text('High confidence proteins advanced search ' );
		 var input =	$('#adv_search').queryBuilder('getRules');	
	var outData = $.ajax({
          url: "./php/advanced_search_hc_proteins.php",
          type: "POST",
          beforeSend: function() {
               $("#overlay").show(); 
            },
            complete: function() {
                $("#overlay").hide();
            },
          data: input,
          dataType:"json",
          async: false
          }).responseText;	
	newData=$.parseJSON(outData);
	if(newData.length==0){
                alert("No results found for the search");
        }
        else {
	$('#table_gene_name').show();
		oTable=$('#table_gene_name').dataTable({
				  "bProcessing": true,
				  "bJQueryUI": true,
				  "sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "iDisplayLength": 100,
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":newData.table,
				  "aoColumns": [
					{ "mData": "gene_name","sClass": "center",
					"mRender": function (data, type,full) {
						var first_geneName=full['gene_name'].split(";");
						return first_geneName[0].toUpperCase();
					}},
					{ "mData": "accession", 
					"mRender":function(data, type,full) {
						if (full['accession']=="NA"){
								full['accession']="--";
								return '<a id="protein_na">' + full['accession'] + '</a>';
							}
							else{
							return '<a id="uniprot_link" href="http://www.uniprot.org/uniprot/'+full['accession']+'" target="_blank">' + full['accession'] + '</a>';
							}
					},
					"sClass": "center", "sWidth": "05%","bSortable": false},
					{ "mData": "protein_name","sWidth":"60%"},
					{ "mData": "protein_no",
						 "sClass": "center" },
					{ "mData": "exp_count",
						 "sClass": "center" },
					{ "mData": "lable", "sClass": "center" ,
						"mRender":function(data, type,full) {
						if (full['lable']==null){
								full['lable']="--";
								return full['lable'];
							}
							else{
							return  full['lable'];
							}
					}
					}
					],
					"aaSorting": [[3, 'desc']],
					"oTableTools": {
						"aButtons": [
							"print",  
							{
							"sExtends":    "collection",
							"sButtonText": "Save Result",
							"aButtons":    [ "csv",	"pdf" ]
							},
							{								
							"sExtends":    "text",
							"sButtonText": "Analyse",
							"sToolTip": "Save experiment comparison in binary matrix form for proteins in this search in all 117 experiments of RaftProt",
							"fnClick": function ( nButton, oConfig, oFlash ) {
								window.location=newData.file;
							}
							}
						
							]
						}
				  });
		}
		 $('#adv_search').queryBuilder('reset');
	}
	},
      "Reset": function() {       
		$('#adv_search').queryBuilder('reset');		
	}	
	}
	
  });

$("#all_proteins_list").on('click',function(){
	if ($("#table_organism").is(':visible')){
		$("#table_method").hide();
	//	$("#table_experiment").show();
		$("#table_method_wrapper").hide();		
		$("#all_proteins_list").hide();		
		var all_data=$.ajax({
          url: "./php/proteins_all_experiments.php",
          type: "POST",
	 beforeSend: function() {
               $("#overlay").show(); 
            },
            complete: function() {
                $("#overlay").hide();
            },
          data: {data:newData.exp_ids},
          dataType:"json",
          async: false
          }).responseText;          
          all_protein_data=$.parseJSON(all_data);
	$("#table_experiment").show();
          var oTable=$('#table_experiment').dataTable({
				"sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "bProcessing": true,
				  "iDisplayLength": 100,				  
				  "bJQueryUI": true,
				  "bAutoWidth": false,
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":all_protein_data,
				  "aoColumns": [
					{ "mData": "exp_title"},
					{ "mData": "accession",
					"mRender":function(data, type,full) {
						if (full['accession']=="NA"){
								full['accession']="--";
								return '<a id="protein_na">' + full['accession'] + '</a>';
							}
							else{
							return '<a id="uniprot_link" href="http://www.uniprot.org/uniprot/'+full['accession']+'" target="_blank">' + full['accession'] + '</a>';
							}
					}},
					{ "mData": "originalID"},
					{ "mData": "protein_name","sWidth":"60%",
					"mRender":function(data, type,full) {
						if (full['protein_name']=="NA"){
							full['protein_name']=full['entryName'];
							return full['protein_name'];
						}
						else{
							return full['protein_name'];
						}
					}},
					{ "mData": "ratio",
					"mRender":function(data, type,full) {
						if (full['ratio']=="NA"){
								full['ratio']="--";
								return full['ratio'];
							}
							else{ return full['ratio'];}
					}}, 
					{"mData": "changed" , "sClass": "center",
					"mRender":function(data, type,full) {
						if (full['changed']=="NA"){
								full['changed']="--";
								return full['changed'];
							}
							else{ return full['changed'];}
							}},
					{ "mData": "lable", "sClass": "center" ,
                                                "mRender":function(data, type,full) {
                                                if (full['lable']==null){
                                                                full['lable']="--";
                                                                return full['lable'];
                                                        }
                                                        else{
                                                        return  full['lable'];
                                                        }
                                        }
                                        }

					],
					"aaSorting": [[0, 'asc']], 
					"oTableTools": {
						"aButtons": [
							"print",  
							{
							"sExtends":    "collection",
							"sButtonText": "Save Result",
							"aButtons":    [ "xls", "pdf" ]
							}		
							]
						}				   
					 });				
		}
	  }); 


 $( "#advance-search" )
      .button()
      .click(function() {
		$("#table_protein_wrapper").hide();
		$("#table_cell_wrapper").hide();
		$("#table_organism_wrapper").hide();
		$("#table_method_wrapper").hide();
		$("#choose_advanced").dialog("open");
		});
	});
