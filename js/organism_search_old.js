var oTable;
//var accession;
/* Formating function for row details */
function fnStudyDetails ( nTr )
{
   var aData = oTable.fnGetData( nTr );
   var study={};
 
  study.idStudy= aData['idStudy'];
  //study.uniprot=aData['uniprot'];
  var expData = $.ajax({
          url: "./php/get_experiment_details_for_study.php",
          type: "POST",
          data: study,
          dataType:"json",
          async: false
          }).responseText;
   	eData=$.parseJSON(expData);
//	console.log(eData);
    var sOut = '<table id ="study_details" cellpadding="5" cellspacing="0" border="0" style="padding-left:75px;">';
for (var j=0; j < eData.length;j++){
    sOut += '<tr style="color:red"><td>Experiment ID: </td><td id="experiment_id">'+eData[j]['idExperiment']+'</td></tr>';
    sOut += '<tr><td>Biochemical method of extraction: </td><td>'+eData[j]['biochemMethod']+'</td></tr>';
    sOut += '<tr><td>Detergent Used: </td><td>'+eData[j]['detergent']+'</td></tr>';
    sOut += '<tr><td>Quantitative method (NA for qualitative experiment): </td><td>'+eData[j]['quantitation']+'</td></tr>';
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
 //Open jquery dialogue model
    $( "#organism" ).dialog({
      autoOpen: false,
      height: 450,
      width: 250,
      modal: true,
      
      buttons: {
        "Search": function() {
		$("#table_organism").show();	
         var data= document.getElementsByName('radio');
         for (var i = 0, length = data.length; i < length; i++) {
		if (data[i].checked) {
        // do whatever you want with the checked radio
        //alert(data[i].value);
        var input={};
        input.organism=data[i].value;
//		console.log(input);
        // only one radio can be logically checked, don't check the rest
        
		//	console.log(data);
          var jsonData = $.ajax({
          url: "./php/organism_study.php",
          type: "POST",
          data: input,
          dataType:"json",
          async: false
          }).responseText;	
			newData=$.parseJSON(jsonData);	
			console.log(newData);
			oTable=$('#table_organism').dataTable({
				  "sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "bProcessing": true,
				  //"sScrollY": 200,
				  "bJQueryUI": true,
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":newData,
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
					"sSwfPath":"media/swf/copy_csv_xls_pdf.swf"
				  });
				  break;
		}
	}
		$( this ).dialog( "close" );
		},
		         
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
//		data.val( "" ).removeClass( "ui-state-error" );
   //     name.val( "" ).removeClass( "ui-state-error" );
      }
    });
    $('#table_organism').on( 'click', 'tbody td img',function () {
        var nTr = $(this).parents('tr')[0];
        if ( oTable.fnIsOpen(nTr) )
        {
            /* This row is already open - close it */
            this.src = "../php/css/examples_support/details_open.png";
            oTable.fnClose( nTr );
        }
        else
        {
            /* Open this row */
            this.src = "../php/css/examples_support/details_close.png";
            oTable.fnOpen( nTr, fnStudyDetails (nTr), 'details' );
        }
    } );
 
    $( "#search-organism" )
      .button()
      .click(function() {
		$("#table_protein_wrapper").hide();
		$("#table_cell_wrapper").hide();
		$("#table_organism_wrapper").hide();
        $( "#organism" ).dialog( "open" );
      });
  });
