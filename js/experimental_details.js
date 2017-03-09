	var queryString = new Array();
    $(function () {
        if (queryString.length == 0) {
            if (window.location.search.split('?').length > 1) {
                var params = window.location.search.split('?')[1].split('&');
                for (var i = 0; i < params.length; i++) {
                    var key = params[i].split('=')[0];
                    var value = decodeURIComponent(params[i].split('=')[1]);
                    queryString[key] = value;
                }
            }
        }
        if (queryString["id"] != null) {
			var name=queryString['id'];
			var quantitation = $.ajax({
			url: "./php/check_qualitative.php",
			type: "POST",
			data: name,			
			async: false
			}).responseText;
			quantitation=quantitation.replace(/\"/g,'').replace("[", "").replace("]", "");
        	var jsonInput = $.ajax({
			url: "./php/proteins_all_experiment.php",
			type: "POST",
			data: name,
			//dataType:"json",
			async: false
			}).responseText;
		//	console.log(jsonInput);	
			ProteinData=$.parseJSON(jsonInput);	
			//console.log(ProteinData);
		var idcellName={};
			for (k=0;k < ProteinData.details.length; k++){
			idcellName.TermID=ProteinData.details[k]['idCellname'];
			}				
		var cellName=$.ajax({
          url: "./php/Ontology_cellName.php",
          type: "POST",
          data: idcellName,
          dataType:"json",
          async: false
          }).responseText;
          cellName=cellName.replace("[", "").replace("{","").replace(/\"/g,'').replace(/\,/g,',   ').replace(/[0-9]:/g,"").replace("}","").replace("]", "");
		$("#cellName").text(''+cellName+'');
          $("#species").text(''+ProteinData.details[0]['species']+'');
          $("#description").text(''+ProteinData.details[0]['expDescription']+'');
          $("#method").text(''+ProteinData.details[0]['biochemMethod']+'');
          $("#detergent").text(''+ProteinData.details[0]['detergent']+'');
          $("#quantitation").text(''+ProteinData.details[0]['quantitation']+'');	
						
		if (quantitation=="Quantitative"){          
			$("#table_experiment_qualitative").hide();
			var oTable=$('#table_experiment').dataTable({
				"sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "bProcessing": true,
				  "iDisplayLength": 100,
				  //"sScrollY": 200,
				  "bJQueryUI": true,
				  "bAutoWidth": false,					
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":ProteinData.proteins,
				  "aoColumns": [
					{ "mData": "accession",
					"mRender": function (data, type,full) {
					if (full['accession']!="NA"){
                                        return '<a id="uniprot_new_tab" href="http://www.uniprot.org/uniprot/' + full['accession'] +'" target="_blank">' + full['accession'] + '</a>';
					}
					else {
					full['accession']="--";
					return '<a id="protein_na">' + full['accession'] + '</a>';
					}
					}},
					{ "mData": "originalID"},
					{ "mData": "entryName","sWidth":"80%"},
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
					"aaSorting": [[0, 'desc']], 
					"oTableTools": {
						"aButtons": [
							"print",  
							{
							"sExtends":    "collection",
							"sButtonText": "Save Result",
							"aButtons":    [ "xls", "pdf" ]
							}		
							],
						"sSwfPath": "media/swf/copy_csv_xls_pdf.swf"
						},
				   
					 });
			 }
				else {
				$("#table_experiment").hide();	 
				var oTable=$('#table_experiment_qualitative').dataTable({
				"sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "bProcessing": true,
				  "iDisplayLength": 100,				  
				  "bJQueryUI": true,
				  "bAutoWidth": false,
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":ProteinData.proteins,
				  "aoColumns": [
					{ "mData": "accession",
					"mRender":function(data, type,full) {
						if (full['accession']=="NA"){
								return '<a id="protein_na">' + full['accession'] + '</a>';
							}
							else{
							return '<a id="uniprot_link" href="http://www.uniprot.org/uniprot/'+full['accession']+'" target="_blank">' + full['accession'] + '</a>';
							}
					}},
					{ "mData": "originalID"},
					{ "mData": "entryName","sWidth":"60%"}					
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

					$("#table_experiment").on ('click', 'tbody tr td a#Uniprot_new_tab',function(){
					window.open($(this).prop(href));
					});
					$("#table_experiment").on('click', 'tbody tr td a#protein_na', function(){
		alert ("This protein is not mapped to Uniprot");
		});
				 }
	         
});

