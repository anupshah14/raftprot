var Unmapped;
$(function() {  
//	  $("#exp-details" ).button();  
	$("#overlay").hide();
    $("#protein_organism").hide();	
    $("#protein_unmapped").hide();    
    $("protein_high_confidence").hide();    
    $("#exp_details_table").hide();
    $("#table_id").hide();
    $( "#browse-unmapped" )
      .button()
      .click(function() {
		$("#heading").text('Lipid raft associated proteins');
		$("#protein_organism_wrapper").hide();
		$("#protein_unmapped_wrapper").hide();        
		$("#table_id_wrapper").hide();        
		$(".container .grid.cs-style-3").hide();		   
          var jsonData = $.ajax({
          url: "./php/all_proteins_json",
   //       type: "GET",
          beforeSend: function() {
               $("#overlay").show(); 
            },
            complete: function() {
                $("#overlay").hide();
            },
         dataType:"json",
          async: false
          }).responseText;	
			newData=$.parseJSON(jsonData);	
		$("#protein_unmapped").show();
			Unmapped=$('#protein_unmapped').dataTable({
				"sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "bProcessing": true,
				  "bJQueryUI": true,
				  "iDisplayLength": 100,
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":newData,
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
					{ "mData": "protein_name"},
					{ "mData": "species"},
					{ "mData": "protein_count", "sClass": "center" },								
					{ "mData": "description", "sClass": "center" },			
					{ "mData": "subcell_loc",
						"mRender":function(data, type,full) {
						if (full['subcell_loc']=="NA"){
								full['subcell_loc']="--";
								return full['subcell_loc'];
							}
						else { return full['subcell_loc'];}				
								
					}}								
					],
					"aaSorting": [[4, 'desc']],
					"oTableTools": {
						"aButtons": [
							"print",  
							{
							"sExtends":    "collection",
							"sButtonText": "Save Result",
							"aButtons":    [ "csv",	"pdf" ]
							}		
							]
						}						
				  });		
		 });
$("#references")
	  .button()
	  .click(function(){
		  $("#heading").text('List of publications');
		  $("#protein_organism_wrapper").hide();
		$("#protein_unmapped_wrapper").hide();        
		$(".container .grid.cs-style-3").hide();
		  var jsonData = $.ajax({
          url: "./php/references.php",
          type: "GET",
          dataType:"json",
          async: false
          }).responseText;	
	newData=$.parseJSON(jsonData);	

$('#table_id').show();
			oTable=$('#table_id').dataTable({
				  "sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "bProcessing": true,
				  "iDisplayLength": 50,
				  "bJQueryUI": true,
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":newData,
				  "aoColumns": [
					{ "mData": "firstAuthor", "sWidth":"7%"},
					{ "mData": "Title"},
					{ "mData": "year" , "sClass": "center","sWidth":"5%"},
					{ "mData": "img", "sClass": "center", "sWidth": "10%","bSortable": false,
					"mRender": function (data, type,full) {
						return '<a id="new_tab" href="' + full['pubMedLink'] + '" target="_blank">' + full['img'] + '</a>';
					}}
					],
					"aaSorting": [[2, 'asc']],
					"oTableTools": {
                                                "aButtons": [
                                                        "print",
                                                        {
                                                        "sExtends":    "collection",
                                                        "sButtonText": "Save Result",
                                                        "aButtons":    [ "csv", "pdf" ]
                                                        }
                                                        ]
                                                }
					 });
					
					if($("#new_tab").length){
					$("#new_tab").click(function(){
					window.open($(this).prop(href));
					});
					}
					});
$("#confidence")
	  .button()
	  .click(function(){
		  $("#protein_organism_wrapper").hide();
		$("#protein_unmapped_wrapper").hide();        
		$("#table_id_wrapper").hide();        
		$(".container .grid.cs-style-3").hide();
/*		var jsonData = $.ajax({
          url: "./php/confidence.php",
          type: "GET",
          beforeSend: function() {
               $("#overlay").show(); 
            },
            complete: function() {
                $("#overlay").hide();
            },
          dataType:"json",
          async: false
          }).responseText;*/
	var jsonData=$.ajax({
			  dataType:"json",
			  url:"./php/hc_json",
			  async:false
		  }).responseText;	
			newData=$.parseJSON(jsonData);
	//		console.log(jsonData);
			$("#protein_high_confidence").show();
			$("#heading").text('High confidence proteins');
			oTable=$('#protein_high_confidence').dataTable({
				"sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "bProcessing": true,
				  "bJQueryUI": true,
				  "iDisplayLength": 25,
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":newData,
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
					{ "mData": "protein_name"},
					{ "mData": "species"},
					{ "mData": "biochemCount", "sClass": "center" },			
					{ "mData": "protein_count", "sClass": "center" },								
					{ "mData": "subcell_loc",
						"mRender":function(data, type,full) {
						if (full['subcell_loc']=="NA"){
								full['subcell_loc']="--";
								return full['subcell_loc'];
							}
						else { return full['subcell_loc'];}				
								
					}}								
					//{ "mData": "details", "sClass": "center", "sWidth": "05%","bSortable": false}
					],
					"aaSorting": [[4, 'desc']],
					"oTableTools": {
						"aButtons": [
							"print",  
							{
							"sExtends":    "collection",
							"sButtonText": "Save Result",
							"aButtons":    [ "csv",	"pdf" ]
							}		
							]
						}
						
				  });
				  });
 $("#exp-details" )
				  .button()
				  .click(function(){
		$("#protein_organism_wrapper").hide();
		$("#protein_unmapped_wrapper").hide();        
		$(".grid.cs-style-3").hide();
		var jsonData = $.ajax({
          url: "./php/exp_details.php",
          type: "GET",
          beforeSend: function() {
               $("#overlay").show(); 
            },
            complete: function() {
                $("#overlay").hide();
            },
          dataType:"json",
          async: false
          }).responseText;	  
          newData=$.parseJSON(jsonData);
//			console.log(jsonData);
	$("#exp_details_table").show();
			$("#heading").text('List of all experiments in RaftProt');
			oTable=$('#exp_details_table').dataTable({
				"sDom": '<"H"T<"clear">lfr>t<"F"ip>',			  "bProcessing": true,
				  "bJQueryUI": true,
				  "iDisplayLength":50,
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":newData,
				   "aoColumns": [
					{ "mData": "exp_title", 
					"mRender":function(data, type,full) {									
							return '<a id="exp_link" href="Experiment_details.html?id='+full['exp_id']+'" target="_blank">' + full['exp_title'] + '</a>';
							},					
					"sClass": "center", "sWidth": "05%"},
					{ "mData": "firstAuthor",
						"mRender":function(data, type,full) {									
							return '<a id="paper_link" href="'+full['pubMedLink']+'" target="_blank">' + full['firstAuthor'] + '</a>';
							}
						},
					{ "mData": "year"},			
					{ "mData": "species"},								
					{ "mData": "cellName"},
					{ "mData": "expDescription","sWidth": "30%" },													
					{ "mData": "biochemMethod"},								
					{ "mData": "detergent"},
					{ "mData": "quantitation"},
					{ "mData": "medium"}					
					],
					"aaSorting": [[0, 'asc']],
					"oTableTools": {
						"aButtons": [
							"print",  
							{
							"sExtends":    "collection",
							"sButtonText": "Save Result",
							"aButtons":    [ "csv",	"pdf" ]
							}		
							]
						}
						
				  });
	  });
		

		
});
     
