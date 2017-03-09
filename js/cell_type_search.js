//Reading the form input
  $(function() { 
	$("#table_protein").hide();
    $("#table_cell").hide();
    $("#table_organism").hide();
	$("#table_year").hide();
	$("#table_method").hide();
	$("#table_condition").hide();
	$("#table_uniprot").hide();
$( "#choose_cell" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,        
      buttons: {
        "Search": function() {
		$(this).dialog('close');
		var data= document.getElementsByName('choose_cell');
        for (var i = 0, length = data.length; i < length; i++) {
		if (data[i].checked) {         
        choose.options=data[i].value;
		}
	}
	if (choose.options==null){
	alert ("No input selected");
	}

else if(choose.options!==""){
	$("#cell").dialog("open");		
	$("#cellName").autocomplete({
       	source: "./php/autocomplete.php",
        minLength: 2,
		select	: function( event, ui ) {
				  $("#cellName").val(ui.item.label);
				  },
		}); 
		var previousTarget=null;
		$('#selectCellName').click(function(){
			if(this===previousTarget) {
			$('#output').text("");
		}
		previousTarget=this;
		var name=$('#cellName').val().trim();
		if (name==""){
			alert("No search parameter");
		}
		var query = {};
		query.input = name;
	$.ajax({
          url: "./php/get_descendents.php",
          type: "POST",
          data: query,
          dataType:"json",
          async: false,
          success: function (result){			 
		$.each(result, function () {
        $("#output").append($("<label>").text(this.name).prepend(
        $("<input>").attr('type', 'checkbox').attr('name','cell').val(this.id)        
        ),("<br/>"));
		});
		},
		});	
	$('#resetID').click(function(){
		$(":text").val("");
		$('#output').text("");
		});
	
	});
	}
	}
	}
});	

  $( "#cell" ).dialog({
      autoOpen: false,
      height: 400,
      width: 350,
      modal: true,
      buttons: {
		  "Search":function(){
			$("#back_search").show();
			var checklist=[];
			var checked= $("#output input:checked").length>0;
			if ($("#cellName").val()==""){
				alert ("Please enter cell or tissue name");
				}
			else if (!checked){
				alert ("Please select atleast one cell/tissue type");
				}
			else if (choose.options==="Experiment"){	
			  $("#table_cell").show();
			  $(".grid.cs-style-3").hide();
			  $("#all_proteins_list").show();	
			  $("#back_search").show();
			  $.ajaxSetup({async:false});
	//			  var checklist=[];
			  $("input:checkbox:checked").each(function(i){
				 checklist.push({name:$(this).val()});
				});
			var cellnames= 	$( "input:checkbox:checked" ).map(function() {return $(this).parent("label").text().split(' ');}).get().join(' and '); //important
			$("#heading").text( ''+choose.options+ 's in: ' +cellnames+ '');

			var jsonData;
			$.post("./php/celltype_experiments.php",checklist, function(data){
				jsonData=data;
				});
	//console.log(jsonData);
		
		newData=$.parseJSON(jsonData);	
			//console.log(newData);
			oTable=$('#table_cell').dataTable({
			"sDom": '<"H"<"clear">lfr>t<"F"ip>',
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
							"sButtonText": "Save",
							"aButtons":    [ "xls", "pdf" ]
							}		
							]
						},
						
				  });
		
		$(this).dialog( "close" );
		}
		else if (choose.options==="Protein"){
			$("#table_cell").hide();	
			$(".container .grid.cs-style-3").hide();		
			$("#table_gene_name").show();
			$("#all_proteins_list").hide();	
			$.ajaxSetup({async:false});
		$("input:checkbox:checked").each(function(i){
				 checklist.push({name:$(this).val()});			
				});
			var cellnames= 	$( "input:checkbox:checked" ).map(function() {return $(this).parent("label").text().split(' ');}).get().join(' and '); //important
			$("#heading").text( ''+choose.options+ 's in: ' +cellnames+ '');
			var jsonData;			
			$.post("./php/get_proteins_bycellname.php",checklist, function(data){
					jsonData=data;
				});
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
							"sButtonText": "Save",
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
		$(this).dialog( "close" );
}

		else if (choose.options==="HC"){
			$("#table_cell").hide();	
			$(".container .grid.cs-style-3").hide();		
			$("#table_gene_name").show();
			$("#all_proteins_list").hide();	
			$.ajaxSetup({async:false});
		$("input:checkbox:checked").each(function(i){
				 checklist.push({name:$(this).val()});			
				});
			var cellnames= 	$( "input:checkbox:checked" ).map(function() {return $(this).parent("label").text().split(' ');}).get().join(' and '); //important
			$("#heading").text( 'High confidence proteins in: ' +cellnames+ '');
			var jsonData;			
			$.post("./php/get_hc_proteins_bycellname.php",checklist, function(data){
					jsonData=data;
				});
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
							"sButtonText": "Save",
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
		$(this).dialog( "close" );
	}
},
		
		  Cancel: function() {
          $(this).dialog( "close" );
        }
	},
	 open : function(event, ui) { 
      originalContent = $("#cell").html();
   },
   close : function(event, ui) {
      $("#cell").html(originalContent);
   }
      });
    $("#all_proteins_list").on('click',function(){
	if ($("#table_cell").is(':visible')){
		$("#table_cell").hide();
		$("#table_cell_wrapper").hide();
		
		$("#all_proteins_list").hide();
		$("#back_search").show();
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
					{ "mData": "protein_name","sWidth":"80%",
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
							"sButtonText": "Save",
							"aButtons":    [ "xls", "pdf" ]
							}		
							]
						}
				   
					 });		
					}		 
						
	  });
				
				
  $("#search-cell")
      .button()
      .click(function() {
		 $("#table_protein_wrapper").hide();
		$("#table_cell_wrapper").hide();
		$("#table_organism_wrapper").hide();
		$("#table_year_wrapper").hide();
		$("#table_method_wrapper").hide();
		$("#table_condition_wrapper").hide();
		$("#table_uniprot_wrapper").hide();
		$("#cell").find('input:text, textarea').val('');
		$("#choose_cell").dialog("open");
	 });
/*	$("a#protein_link").click(function(){
	window.open($(this).prop(href));
	});
	$('#table_cell').on( 'click', 'tbody tr td a#protein_na', function(){
		alert("No Uniprot ID found for this protein");
		});*/

/*	$("#table_cell").on('mouseover','tbody tr td.details table#study_details tbody tr td#experiment_id', function(){
			$(this).css('color','blue');
			$(this).css('font-weight','bold');
			$(this).css('cursor','pointer');
			$(this).css('cursor','hand');
		});
	$("#table_cell").on('mouseout','tbody tr td.details table#study_details tbody tr td#experiment_id', function(){
			$(this).css('color','red');				
			$(this).css('font-weight','normal');
		});

//Dropdown row
$('#table_cell').on( 'click', 'tbody td img',function () {
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
    } );
//Experiment ID click function
$("#table_cell").on('click', 'tbody tr td.details table#study_details tbody tr td#experiment_id',function(){
			var name=$(this).text();
			var url="Experiment_details.html?id=" + encodeURIComponent(name);
			window.open(url);
			});*/

	});
