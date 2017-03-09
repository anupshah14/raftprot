var oTable;
var newData;

function fnStudyDetails ( nTr )
{
   var aData = oTable.fnGetData( nTr );
   var study={};
  study.idStudy= aData['idStudy'];
  study.medium=input.medium;
  study.method=input.method;
  study.detergent=input.detergent;
  study.idCellname=aData['idCellname'];
var expData = $.ajax({
          url: "./php/get_experiment_details_for_study.php",
          type: "POST",
          data: study,
          dataType:"json",
          async: false
          }).responseText;
   	eData=$.parseJSON(expData);
   	var idcellName={};
   	for (k=0;k < eData.length; k++){
		idcellName.TermID=eData[k]['idCellname'];
	}

var cellName=$.ajax({
          url: "./php/Ontology_cellName.php",
          type: "POST",
          data: idcellName,
          dataType:"json",
          async: false
          }).responseText;

cellName=cellName.replace("[", "").replace("{","").replace(/\"/g,'').replace(/\,/g,',   ').replace(/[0-9]:/g,"").replace("}","").replace("]", "");
	var sOut = '<table id = "study_details" cellpadding="5" cellspacing="0" border="0" style="padding-left:75px;">';
	for (var j=0; j < eData.length; j++){
		sOut += '<tr><td>Cell/tissue type:</td> <td>'+cellName+'</td></tr>';
		sOut += '<tr><td>Organism: </td><td>'+eData[j]['species']+'</td></tr>';
		sOut += '<tr><td>Experiment Description: </td><td>'+eData[j]['expDescription']+'</td></tr>';
    	sOut += '<tr><td>Biochemical method of extraction: </td><td>'+eData[j]['biochemMethod']+'</td></tr>';
    	sOut += '<tr><td>Detergent Used: </td><td>'+eData[j]['detergent']+'</td></tr>';
    	sOut += '<tr><td>Protein estimation: </td><td>'+eData[j]['quantitation']+'</td></tr>';
    	sOut += '<tr style="color:red;"><td>Complete list of proteins (click): </td><td id="experiment_id">'+eData[j]['idExperiment']+'</td></tr>';
    	sOut += '<tr><td>                    </td><td>          </td></tr>';
	}
	sOut += '</table>';	
	return sOut;
}
$(function() {    
	  $("#overlay").hide();
    $("#protein_organism").hide();	
    $("#protein_unmapped").hide();
    $("#table_id").hide();
    $("#back_search").hide();
    $("#protein_high_confidence").hide();
$( "#organism" ).dialog({
      autoOpen: false,
      height: 500,
      width: 250,
      modal: true,
      buttons: {
	"Browse": function() {
		$(".container .grid.cs-style-3").hide();
		$( this ).dialog( "close" );		
		var data= document.getElementsByName('radio');
        for (var i = 0, length = data.length; i < length; i++) {
		if (data[i].checked) {    
        var input={};
        input.organism=data[i].value;
	//trim(input.organism);       
        console.log(input);  
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
	console.log(newData);
	$("#protein_organism").show();
    $("#back_search").show();
			oTable=$('#protein_organism').dataTable({
				"sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "bProcessing": true,
				  "bJQueryUI": true,
				  "iDisplayLength": 25,
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
					{ "mData": "exp_count","sClass": "center" },
					{ "mData": "lable","sClass": "center" }
					],
					"aaSorting": [[3, 'desc']],
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

$( "#browse-organism" )
      .button()
      .click(function() {
		$("#protein_organism_wrapper").hide();
		$("#protein_unmapped_wrapper").hide();
		$( "#organism" ).dialog( "open" );
      });

  });
