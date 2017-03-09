$(function() {
var jsonData = $.ajax({
          url: "./php/stats_exp_details.php",
          type: "GET",
          dataType:"json",
          async: false
          }).responseText;	
	newData=$.parseJSON(jsonData);
	$('#table_exp').show();
			oTable=$('#table_exp').dataTable({
				  "sDom": '<"H"Tlr>t<"F"ip>',
				  "bProcessing": true,
				  "iDisplayLength": 10,
		"bJQueryUI": true,
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":newData,
				  "aoColumns": [
					{ "mData": "idExperiment", 
					"mRender":function(data, type,full) {									
							return '<a id="exp_link" href="Experiment_details.html?id='+full['idExperiment']+'" target="_blank">' + full['idExperiment'] + '</a>';
							},					
					"sClass": "center", "sWidth": "05%"},
					{ "mData": "firstAuthor",
						"mRender":function(data, type,full) {									
							return '<a id="paper_link" href="'+full['pubMedLink']+'" target="_blank">' + full['firstAuthor'] + '</a>';
							}
						},
					{ "mData": "year"},			
					{ "mData": "species"},								
					{ "mData": "cellname"},
					{ "mData": "expDescription","sWidth": "40%" },													
					{ "mData": "proteins","sClass": "center"}			
					
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
