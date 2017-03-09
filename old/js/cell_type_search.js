//Reading the form input
  $(function() { 
	$("#table_protein").hide();
    $("#table_cell").hide();
    $("#table_organism").hide();
	$("#table_year").hide();
	$("#table_method").hide();
	$("#table_condition").hide();
	$("#table_uniprot").hide();
	  $( "#cell" ).dialog({
      autoOpen: false,
      height: 400,
      width: 350,
      modal: true,
      buttons: {
		  "Search":function(){
			var checked= $("#output input:checked").length>0;
			if ($("#cellName").val()==""){
				alert ("Please enter cell or tissue name");
				}
			else if (!checked){
				alert ("Please select atleast one cell/tissue type");
				}
			else{	
			  $("#table_cell").show();
			  $(".grid.cs-style-3").hide();
			  $("#all_proteins_list").show();	
			  $("#back_search").show();
			  $.ajaxSetup({async:false});
			  var checklist=[];
			  $("input:checkbox:checked").each(function(i){
				 checklist.push({name:$(this).val()});
				});
			var jsonData;
			$.post("./php/celltype_study.php",checklist, function(data){
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
					{ "mData": "img", "sClass": "center", "sWidth": "05%","bSortable": false},
					{ "mData": "firstAuthor", 
						"mRender": function (data, type,full) {
						return '<a id="paper_link" href="' + full['pubMedLink'] + '" target="_blank">' + full['firstAuthor'] + '</a>';
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
		$("#cell").dialog("open");		
		$("#cellName").autocomplete({
       	source: "./php/autocomplete.php",
        minLength: 2,
		select	: function( event, ui ) {
				  $("#cellName").val(ui.item.label);
				  },
		}); 
		var numberClick=null;
		$('#selectCellName').click(function(){
		if(this===numberClick){
		$("#output").text("");
		}
		numberClick=this;
		var name=$('#cellName').val().trim();
		var query = {};
		query.input = name;
//		console.log(query);
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
	});
	$('#resetID').click(function(){
		$(":text").val("");
		$('#output').text("");
	//	$('#output').hide();
		//removeAttr('selected');
	});
	 });
/*	$("a#protein_link").click(function(){
	window.open($(this).prop(href));
	});
	$('#table_cell').on( 'click', 'tbody tr td a#protein_na', function(){
		alert("No Uniprot ID found for this protein");
		});*/

	$("#table_cell").on('mouseover','tbody tr td.details table#study_details tbody tr td#experiment_id', function(){
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
			});

	});
