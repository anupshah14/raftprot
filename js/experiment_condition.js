var  oTable;
var input={};
$(function() {
	$("#table_protein").hide();
	$("#table_cell").hide();
	$("#table_organism").hide();
	$("#table_year").hide();
	$("#table_method").hide();
	$("#table_condition").hide();
	$("#table_uniprot").hide();
	$( "#condition" ).dialog({
     	 autoOpen: false,
	 height: 300,
     	 width: 350,
     	 modal: true,   
	buttons: {
        "Search": function() {
		$("#table_condition").show();
	$("#back_search").show();
//	$("#table_condition").show();
	$(".grid.cs-style-3").hide();
	$("#all_proteins_list").show();
	var selected_treatment=$("#selection_treatment").children("option").filter(":selected").text();
	if (selected_treatment!=""){
	input.medium=selected_treatment;
	}
	else if (selected_treatment==""){
	input.medium=selected_stimulation;
	}
          var jsonData = $.ajax({
          url: "./php/condition_study.php",
          type: "POST",
          data: input,
          dataType:"json",
          async: false
          }).responseText;	
	newData=$.parseJSON(jsonData);

	oTable=$('#table_condition').dataTable({
	  "sDom": '<"H"<"clear">lfr>t<"F"ip>',
	  "bProcessing": true,
	"bJQueryUI": true,
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":newData.table,
				  "aoColumns": [
					{ "mData": "img", "sClass": "center", "sWidth": "05%","bSortable": false},
					{ "mData": "firstAuthor", 
						"mRender": function (data, type,full) {
						return '<a href="' + full['pubMedLink'] + '">' + full['firstAuthor'] + '</a>';
					}},
					{ "mData": "Title","sWidth":"80%"},
					{ "mData": "year" , "sClass": "center"}
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
	$( this ).dialog( "close" );
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
		$("#table_condition_wrapper").hide();		
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
					{ "mData": "Experiment_idExperiment"},
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
							}}
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


    $('#table_condition').on( 'click', 'tbody td img',function () {
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
    });

	$("#table_condition").on('mouseover','tbody tr td.details table#study_details tbody tr td#experiment_id', function(){
			$(this).css('color','blue');
			$(this).css('font-weight','bold');
			$(this).css('cursor','pointer');
			$(this).css('cursor','hand');
		});
	$("#table_condition").on('mouseout','tbody tr td.details table#study_details tbody tr td#experiment_id', function(){
			$(this).css('color','red');				
			$(this).css('font-weight','normal');
		});


$("#table_condition").on('click', 'tbody tr td.details table#study_details tbody tr td#experiment_id',function(){
			var name=$(this).text();
			var url="Experiment_details.html?id=" + encodeURIComponent(name);
			window.open(url);
			});
 
$( "#condition-search" )
      .button()
      .click(function() {
		$("#table_protein_wrapper").hide();
		$("#table_cell_wrapper").hide();
		$("#table_organism_wrapper").hide();
		$("#table_year_wrapper").hide();
		$("#table_method_wrapper").hide();
		$("#table_condition_wrapper").hide();
		$("#table_uniprot_wrapper").hide();
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

      });
  });
