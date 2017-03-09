var oTable;
var input={};
//Reading the form input
  $(function() {
    $("#table_protein").hide();
    $("#table_cell").hide();
    $("#table_organism").hide();
    $("#table_year").hide();
    $("#table_method").hide();
    $("#table_uniprot").hide();
    $("#table_condition").hide();
	
 //Open jquery dialogue model
 
  $( "#choose_method" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,        
      buttons: {
        "Search": function() {
		$(this).dialog('close');
		var data= document.getElementsByName('choose_method');
        for (var i = 0, length = data.length; i < length; i++) {
		if (data[i].checked) {         
        choose.options=data[i].value;
		}
	}
	if (choose.options==null){
	alert ("No input selected");
	}	
	else if(choose.options!==""){
	$("#method").find('select').val('');
		$("#method" ).dialog( "open" );
		$("#detergent").hide();
        var biochemMethods = $.ajax({
          url: "./php/biochemMethod.php",
          dataType:"json",
          async: false
          }).responseText;         
		biochemMethods=$.parseJSON(biochemMethods);		
		select = document.getElementById('selection_method');
		for (var i = 0; i<biochemMethods.length; i++){
			var opt = document.createElement('option');
			opt.value = biochemMethods[i]['biochemMethod'];
			opt.innerHTML = biochemMethods[i]['biochemMethod'];
			select.appendChild(opt);
			}
			$("#selection_method").on('click',function(){
			selected_value=$("#selection_method").children("option").filter(":selected").text();
			console.log(selected_value);
		if (selected_value=="Detergent Resistant Membrane (DRM) Fraction" || selected_value=="DRM; Affinity isolation using MUC1 antibodies" || selected_value=="Nuclear-free DRM"){
		$("#detergent").show();
		$('#selection_detergent').text("");
		var detergent = $.ajax({
          url: "./php/Detergent.php",
          dataType:"json",
          async: false
          }).responseText;         
		detergent=$.parseJSON(detergent);		
		select = document.getElementById('selection_detergent');		
		for (var i = 0; i<detergent.length; i++){			
			var detergent_option = document.createElement('option');
			detergent_option.value = detergent[i]['detergent'];
			detergent_option.innerHTML = detergent[i]['detergent'];
			select.appendChild(detergent_option);
			}
		}
		else{
			$("#detergent").hide();
		}
			});
	}
}
}
});	
 
    $( "#method" ).dialog({
      autoOpen: false,
      height: 300,
      width: 370,
      modal: true,
      buttons: {
        "Search": function() {
	if (choose.options==="Experiment"){
        var data = document.getElementById("selection_method");
		var index = data.options[data.selectedIndex].value;
	var selected_detergent=$("#selection_detergent").children("option").filter(":selected").text();
	//	console.log(index);
	//	var input={};
		input.method=index;
		input.detergent=selected_detergent;
		if (input.detergent!==""){
		$("#heading").text(''+choose.options+ 's in: ' +input.method+ ' and ' +input.detergent+ ''); 
		}
		else if (input.detergent==""){
		$("#heading").text(''+choose.options+ 's in: ' +input.method+ '');	
		}
          var jsonData = $.ajax({
          url: "./php/method_experiments.php",
          type: "POST",
          data: input,
          dataType:"json",
          async: false
          }).responseText;	
			newData=$.parseJSON(jsonData);	
			//console.log(newData);
		if (newData.length==0){
				alert("No results found for the search");
		}
		else {	
		$("#table_method").show();
		$("#back_search").show();
		$("#all_proteins_list").show();
		$(".grid.cs-style-3").hide();
			oTable=$('#table_method').dataTable({
				  "sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "bProcessing": true,
				  //"sScrollY": 200,
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
						"sClass": "center", "sWidth": "10%","bSortable": false}
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
		$( this ).dialog( "close" );
	}
	
	else if (choose.options==="Protein"){					
		$(".container .grid.cs-style-3").hide();			
        var data = document.getElementById("selection_method");
		var index = data.options[data.selectedIndex].value;
		var selected_detergent=$("#selection_detergent").children("option").filter(":selected").text();
		input.method=index;
		input.detergent=selected_detergent;	
		$( this ).dialog( "close" );
		$("#back_search").show();
		if (input.detergent!==""){
		$("#heading").text(''+choose.options+ 's in: ' +input.method+ ' and ' +input.detergent+ ''); 
		}
		else if (input.detergent==""){
		$("#heading").text(''+choose.options+ 's in: ' +input.method+ '');	
		}
          var jsonData = $.ajax({
          url: "./php/method_proteins.php",
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
	if (newData.length==0){
                                alert("No results found for the search");
                }
                else {
	$("#table_gene_name").show();
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
					{ "mData": "exp_count","sClass": "center"} ,
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

	else if (choose.options==="HC"){					
		$(".container .grid.cs-style-3").hide();			
        var data = document.getElementById("selection_method");
		var index = data.options[data.selectedIndex].value;
		var selected_detergent=$("#selection_detergent").children("option").filter(":selected").text();
		input.method=index;
		input.detergent=selected_detergent;	
		$( this ).dialog( "close" );
		$("#back_search").show();
		if (input.detergent!==""){
		$("#heading").text('High confidence proteins in: ' +input.method+ ' and ' +input.detergent+ ''); 
		}
		else if (input.detergent==""){
		$("#heading").text('High confidence proteins in: ' +input.method+ '');	
		}
          var jsonData = $.ajax({
          url: "./php/method_hc_proteins.php",
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
	if (newData.length==0){
                                alert("No results found for the search");
                }
                else {
	$("#table_gene_name").show();
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
					 { "mData": "exp_count", "sClass": "center"} ,
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
		},
		         
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      
      open : function(event, ui) { 
      originalContent = $("#method").html();
      },
   close : function(event, ui) {
      $("#method").html(originalContent);
     }
    });

$("#all_proteins_list").on('click',function(){
	if ($("#table_method").is(':visible')){
		$("#table_method").hide();
//		$("#table_experiment").show();
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


/*    $('#table_method').on( 'click', 'tbody td img',function () {
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
    } );

		$("#table_method").on('mouseover','tbody tr td.details table#study_details tbody tr td#experiment_id', function(){
			$(this).css('color','blue');
			$(this).css('font-weight','bold');
			$(this).css('cursor','pointer');
			$(this).css('cursor','hand');
		});
		$("#table_method").on('mouseout','tbody tr td.details table#study_details tbody tr td#experiment_id', function(){
			$(this).css('color','red');				
			$(this).css('font-weight','normal');
		});

	
	$("#table_method").on('click', 'tbody tr td.details table#study_details tbody tr td#experiment_id',function(){
			var name=$(this).text();
			var url="Experiment_details.html?id=" + encodeURIComponent(name);
			window.open(url);
			});*/
 
    $( "#method-search" )
      .button()
      .click(function() {
		$("#table_protein_wrapper").hide();
		$("#table_cell_wrapper").hide();
		$("#table_organism_wrapper").hide();
		$("#table_year_wrapper").hide();
		$("#table_uniprot_wrapper").hide();
		$("#table_condition_wrapper").hide();
		$("#table_method_wrapper").hide();
		$("#choose_method").dialog("open");

  });
});
