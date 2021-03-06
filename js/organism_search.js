var oTable;
var newData;
/* Formating function for row details */
function fnStudyDetails ( nTr )
{
   var aData = oTable.fnGetData( nTr );
   var study={};
  study.idStudy= aData['idStudy'];
  study.idCellname= aData['idCellname'];
 //console.log(study.idCellname);
  study.medium=input.medium;
  study.method=input.method;
  study.detergent=input.detergent;
//console.log(study);
  var expData = $.ajax({
          url: "./php/get_experiment_details_for_study.php",
          type: "POST",
          data: study,
          dataType:"json",
          async: false
          }).responseText;
   	eData=$.parseJSON(expData);
	var idcellName={};
	for (k=0; k<eData.length; k++){
		idcellName.TermID=eData[k]['idCellname'];
	}
	
	var cellName=$.ajax({
		url:"../php/Ontology_cellName.php",
		type: "POST",
		data: idcellName,
		dataType: "json",
		async: false
		}).responseText;
	cellName=cellName.replace("[", "").replace("{","").replace(/\"/g,'').replace(/\,/g,',   ').replace(/[0-9]:/g,"").replace("}","").replace("]", "");
	//console.log(eData);
	var sOut = '<table id = "study_details" cellpadding="5" cellspacing="0" border="0" style="padding-left:75px;">';
	for (var j=0; j < eData.length; j++){
	sOut += '<tr><td>Cell/tissue type:</td> <td>'+cellName+'</td></tr>';
    	sOut += '<tr><td>Organism: </td><td>'+eData[j]['species']+'</td></tr>';
    	sOut += '<tr><td>Experiment Description: </td><td>'+eData[j]['expDescription']+'</td></tr>';
    	sOut += '<tr><td>Biochemical method of extraction: </td><td>'+eData[j]['biochemMethod']+'</td></tr>';
    	sOut += '<tr><td>Detergent: </td><td>'+eData[j]['detergent']+'</td></tr>';
    	sOut += '<tr><td>Protein estimation: </td><td>'+eData[j]['quantitation']+'</td></tr>';
	sOut += '<tr style="color:red;"><td>Complete list of proteins (click): </td><td id="experiment_id">'+eData[j]['idExperiment']+'</td></tr>';
	sOut += '<tr><td></td><td></td></tr>';
	}
	sOut += '</table>';
	return sOut;	
}
 

//Reading the form input
  $(function() {
    $("#table_protein").hide();
    $("#table_cell").hide();
    $("#table_organism").hide();
    $("#table_year").hide();
    $("#table_method").hide();
    $("#table_uniprot").hide();
    $("#table_condition").hide();
    $("#table_experiment").hide();
    $("#all_proteins_list").hide();
    $("#table_gene_name").hide();
    $("#back_search").hide();
    $("#overlay").hide();
    $("#choose_organism" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,        
      buttons: {
        "Search": function() {
		$(this).dialog('close');
		var data= document.getElementsByName('choose_organism');
        for (var i = 0, length = data.length; i < length; i++) {
		if (data[i].checked) {         
        choose.options=data[i].value;
		}
	}
	if (choose.options==null){
	alert ("No input selected");
	}
	else if(choose.options!==""){
	$("#organism").dialog("open");
	}
	}
	}
});

	
	//Open jquery dialogue model
    $( "#organism" ).dialog({
      autoOpen: false,
      height: 500,
      width: 250,
      modal: true,
      buttons: {
        "Search": function() {
	$(" .grid.cs-style-3").hide();
	if (choose.options==="Experiment"){
	 $("#table_organism").show();
                $("#all_proteins_list").show();
                $("#back_search").show();
        var data= document.getElementsByName('radio');
		$( this ).dialog( "close" );
        for (var i = 0, length = data.length; i < length; i++) {
		if (data[i].checked) {    
        var input={};
        input.organism=data[i].value;       
        $("#heading").text(''+choose.options+ ' for species: ' +input.organism+''); 
          var jsonData = $.ajax({
          url: "./php/organism_experiments.php",
          type: "POST",
          data: input,
          dataType:"json",
          async: false
          }).responseText;	
			newData=$.parseJSON(jsonData);	
			//console.log(newData);
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
						return '<a id="pubmed_link" href="' + full['pubMedLink'] + '" target="_blank">' + full['firstAuthor'] + '</a>';
					}},
					{ "mData": "year" , "sClass": "center"},
					{ "mData": "expDescription","sWidth":"30%"},
					{ "mData": "biochemMethod"},
					{ "mData": "detergent"},
					{ "mData": "quantitation"},
					{ "mData": "img", 
						"mRender": function (data, type,full) {
						return '<a href="Experiment_details.html?id='+ full['idExperiment'] + '" target="_blank">' + full['img']+'</a>';
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
						}
				  });			
			
		}
	}
	}
	else if (choose.options==="Protein"){
		var data= document.getElementsByName('radio');        
	$( this ).dialog( "close" );
        for (var i = 0, length = data.length; i < length; i++) {
		if (data[i].checked) {    
        var input={};
        input.organism=data[i].value; 
        $("#heading").text(''+choose.options+ 's for species: ' +input.organism+''); 
        var jsonData = $.ajax({
          url: "./php/organism_proteins.php",
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
			newData=$.parseJSON(jsonData);	
        $("#table_gene_name").show();	
                $("#back_search").show();
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
					{ "mData": "protein_no", "sClass": "center" },
					{ "mData": "exp_count", "sClass": "center" },
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
	}
	}
	
	else if (choose.options==="HC"){
		var data= document.getElementsByName('radio');        
	$( this ).dialog( "close" );
        for (var i = 0, length = data.length; i < length; i++) {
		if (data[i].checked) {    
        var input={};
        input.organism=data[i].value; 
        $("#heading").text('High confidence proteins for species: ' +input.organism+''); 
        var jsonData = $.ajax({
          url: "./php/organism_hc_proteins.php",
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
			newData=$.parseJSON(jsonData);	
        $("#table_gene_name").show();	
                $("#back_search").show();
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
	}
	}
	},
		         
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
      }
   
    });

$("#all_proteins_list").on('click',function(){
	if ($("#table_organism").is(':visible')){
		$("#table_organism").hide();
		$("#table_organism_wrapper").hide();
	//	$(" .grid.cs-style-3").hide();
		$("#all_proteins_list").hide();
	//	$("#back_search").show();
    var all_data=$.ajax({
          url: "./php/proteins_all_experiments.php",
          type: "POST",
          data: {data:newData.exp_ids},
	 beforeSend: function() {
               $("#overlay").show(); 
            },
            complete: function() {
                $("#overlay").hide();
            },
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




			//New tab publication
			$("a#pubmed_link").click(function(){
			window.open($(this).prop(href));
			});
			//Mouse hover
/*			$("#table_organism").on('mouseover','tbody tr td.details table#study_details tbody tr td#experiment_id', function(){
				$(this).css('color','blue');
				$(this).css('font-weight','bold');
				$(this).css('cursor','pointer');
				$(this).css('cursor','hand');
			});
			//Mouse out
			$("#table_organism").on('mouseout','tbody tr td.details table#study_details tbody tr td#experiment_id', function(){
				$(this).css('color','red');				
				$(this).css('font-weight','normal');
			});
			//Protein list
			$("#table_organism").on('click', 'tbody tr td.details table#study_details tbody tr td#experiment_id',function(){
			var name=$(this).text();
			var url="Experiment_details.html?id=" + encodeURIComponent(name);
			window.open(url);
			});
			
			
//Dropdown row
    $('#table_organism').on( 'click', 'tbody td img',function () {
        var nTr = $(this).parents('tr')[0];
        if ( oTable.fnIsOpen(nTr) )
        {
            this.src = "./css/images/details_open.png";
            oTable.fnClose( nTr );
        }
        else
        {
            this.src = "./css/images/details_close.png";
            oTable.fnOpen( nTr, fnStudyDetails (nTr), 'details' );
        }
    } );*/
    
   
 
//Open Organism dialog
    $( "#search-organism" )
      .button()
      .click(function() {
		$("#table_protein_wrapper").hide();
		$("#table_cell_wrapper").hide();
		$("#table_organism_wrapper").hide();
		$("#table_method_wrapper").hide();
		$("#table_year_wrapper").hide();
		$("#table_condition_wrapper").hide();
		$("#table_uniprot_wrapper").hide();
		$("#table_gene_name_wrapper").hide();
        $( "#choose_organism" ).dialog("open" );
      });
//Open Publication in new tab
/*	$("a#pubmed_link").onclick(function(){
	window.open($(this).prop(href));
	});*/
  });
