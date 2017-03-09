var oTable;
var input={};
var choose={};

$(function() {
	$("#table_protein").hide();
    $("#table_cell").hide();
    $("#table_organism").hide();
	$("#table_year").hide();
	$("#table_method").hide();
	$("#table_condition").hide();
	$("#choose_condition").hide();
	$("#choose_cell").hide();
	$("#choose_organism").hide();
	$("#choose_method").hide();
	$("#choose_advanced").hide();
$( "#choose_condition" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,        
      buttons: {
        "Search": function() {
		$(this).dialog('close');
		var data= document.getElementsByName('choose_condition');
        for (var i = 0, length = data.length; i < length; i++) {
		if (data[i].checked) {    
        
        choose.options=data[i].value;
		}
	}

if (choose.options==null){
					alert ("No input selected");
					}
else if(choose.options!==""){
 $("#condition" ).dialog( "open" );	
		$("#treatment_options").show();		
		$('#selection_treatment').text("");
		var treatment = $.ajax({
          url: "./php/treatment.php",
          dataType:"json",
          async: false
          }).responseText;
treatment=$.parseJSON(treatment);
		select = document.getElementById('selection_treatment');
		for (var i = 0; i<treatment.length; i++){
			var opt = document.createElement('option');
			opt.value = treatment[i]['medium'];
			opt.innerHTML = treatment[i]['medium'];
			select.appendChild(opt);
						}
					}
				}
			}
});
 $( "#condition" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,        
      buttons: {
        "Search": function() {
		$("#back_search").show();
		$("#table_condition").show();
		$(".container .grid.cs-style-3").hide();
		$("#all_proteins_list").show();		
		var selected_treatment=$("#selection_treatment").children("option").filter(":selected").text();		
		if (selected_treatment!=""){
		input.medium=selected_treatment;
		}
		else if (selected_treatment=="") {
			
			input.medium=selected_stimulation;
		}

if (choose.options==="Experiment"){
		$("#heading").text( ''+choose.options+ 's with treatment: ' +input.medium+ '');
          var jsonData = $.ajax({
          url: "./php/condition_experiments.php",
          type: "POST",
          data: input,
          dataType:"json",
          async: false
          }).responseText;	
	newData=$.parseJSON(jsonData);
oTable=$('#table_condition').dataTable({
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
					"oLanguage": {
					"sSearch": "Filter records:"
					},
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
//$("div.toolbar").html(''+choose.options+ 's with treatment: ' +input.medium+ '');
$( this ).dialog( "close" );
			  } 
 else if (choose.options==="Protein"){
				  $("#table_condition").hide();
			$("#table_gene_name").show();
			$("#all_proteins_list").hide();
			$("#heading").text( ''+choose.options+ 's with treatment: ' +input.medium+ '');
			var jsonData = $.ajax({
          url: "./php/condition_proteins.php",
          type: "POST",
          data: input,
          dataType:"json",
          async: false
          }).responseText;	
	  newData=$.parseJSON(jsonData);
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
$( this ).dialog( "close" );

}
		else if (choose.options==="HC"){
			$("#table_condition").hide();
			$("#table_gene_name").show();
			$("#all_proteins_list").hide();
			$("#heading").text( ' High confidence proteins with treatment: ' +input.medium+ '');
			var jsonData = $.ajax({
         		 url: "./php/condition_hc_proteins.php",
          		type: "POST",
         		 data: input,
          		dataType:"json",
          		async: false
          		}).responseText;	
			newData=$.parseJSON(jsonData);	
		//	console.log(newData.file);	
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
					{ "mData": "lable", "sClass": "center" }
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
$( this ).dialog( "close" );
			}
		},
		         
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      
      open : function(event, ui) { 
      originalContent = $("#condition").html();
      },
   close : function(event, ui) {
      $("#condition").html(originalContent);
     }
    });

$("#all_proteins_list").on('click',function(){
		if ($("#table_condition").is(':visible')){
		$("#table_condition").hide();
		$("#table_experiment").show();
		$("#table_condition_wrapper").hide();		
		$("#all_proteins_list").hide();		
		var all_data=$.ajax({
          url: "./php/proteins_all_experiments.php",
          type: "POST",
          data: {data:newData.exp_ids},
          dataType:"json",
          async: false
          }).responseText;          
          all_protein_data=$.parseJSON(all_data);
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

/* $('#table_condition').on( 'click', 'tbody td img',function () {
        var nTr = $(this).parents('tr')[0];
        if ( oTable.fnIsOpen(nTr) )
        {
	this.src = "./css/images/details_open.png";
            oTable.fnClose( nTr );
        }
        else
        {
	 this.src = "./css/images/details_close.png";
            oTable.fnOpen( nTr, fnStudyDetails(nTr), 'details' );
        }
    } );*/
 
    $( "#condition-search" )
      .button()
      .click(function() {
		clickedId= $(this).attr("id");
		$("#table_protein_wrapper").hide();
		$("#table_cell_wrapper").hide();
		$("#table_organism_wrapper").hide();
		$("#table_year_wrapper").hide();
		$("#table_method_wrapper").hide();
		$("#choose_condition").dialog('open');				
      });
  });




