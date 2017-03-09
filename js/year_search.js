var oTable;
//var accession;
/* Formating function for row details */
/* function fnFormatDetails ( nTr )
{
   var aData = oTable.fnGetData( nTr );
   var study={};
 
  study.idStudy= aData['idStudy'];
  study.uniprot=aData['uniprot'];
  var proteinData = $.ajax({
          url: "./php/get_protein_name.php",
          type: "POST",
          data: study,
          dataType:"json",
          async: false
          }).responseText;
   	pData=$.parseJSON(proteinData);
	console.log(pData);
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:75px;">';
    sOut += '<tr><td>Protein name in the paper:</td><td>'+pData[0]['entryname']+'</td></tr>';
    sOut += '<tr><td>Original ID in paper:</td><td>'+pData[0]['originalID']+'</td></tr>';
    sOut += '<tr><td>Database used for screening:</td><td>'+pData[0]['database_name']+'</td></tr>';
    sOut += '</table>';
    return sOut;
}*/

//Reading the form input
  $(function() {
    $("#table_protein").hide();
    $("#table_cell").hide();
    $("#table_organism").hide();
    $("#table_year").hide();
    $("#table_method").hide();
    $("#table_condition").hide();
    $("#table_uniprot").hide();
 //Open jquery dialogue model
    $( "#year" ).dialog({
      autoOpen: false,
      height: 250,
      width: 250,
      modal: true,
        
      buttons: {
        "Search": function() {
		$("#table_year").show();
        var data = document.getElementById("selection_year");
		var index = data.options[data.selectedIndex].value;
	//	console.log(index);
		var input={};
		input.year=index;
          var jsonData = $.ajax({
          url: "./php/year_study.php",
          type: "POST",
          data: input,
          dataType:"json",
          async: false
          }).responseText;	
			newData=$.parseJSON(jsonData);	
			//console.log(newData);
			oTable=$('#table_year').dataTable({
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
						return '<a id="pubmed_link" href="' + full['pubMedLink'] + '" target="_blank">' + full['firstAuthor'] + '</a>';
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
						"sSwfPath": "media/swf/copy_csv_xls_pdf.swf"
				  });
			
		$( this ).dialog( "close" );
		},
		         
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      
      open : function(event, ui) { 
      originalContent = $("#year").html();
      },
   close : function(event, ui) {
      $("#year").html(originalContent);
     }
    });

		$("#table_year").on('mouseover','tbody tr td.details table#study_details tbody tr td#experiment_id', function(){
			$(this).css('color','blue');
			$(this).css('font-weight','bold');
			$(this).css('cursor','pointer');
			$(this).css('cursor','hand');
		});
		$("#table_year").on('mouseout','tbody tr td.details table#study_details tbody tr td#experiment_id', function(){
			$(this).css('color','red');				
			$(this).css('font-weight','normal');
			});


// Experiment ID capcture	
	$('#table_year').on('click', 'tbody tr td.details table#study_details tbody tr td#experiment_id', function (){
	var exp_id=$(this).text();
	var url ="Experiment_details.html?id=" + encodeURIComponent(exp_id);
	window.open(url);
	});

// Dropdown Row
    $('#table_year').on( 'click', 'tbody td img',function () {
        var nTr = $(this).parents('tr')[0];
        if ( oTable.fnIsOpen(nTr) )
        {
            /* This row is already open - close it */
            this.src = "./css/images/details_open.png";
            oTable.fnClose( nTr );
        }
        else
        {
            /* Open this row */
            this.src = "./css/images/details_close.png";
            oTable.fnOpen( nTr, fnStudyDetails(nTr), 'details' );
        }
    } );
 
    $( "#year-search" )
      .button()
      .click(function() {
		$("#table_protein_wrapper").hide();
		$("#table_cell_wrapper").hide();
		$("#table_organism_wrapper").hide();
		$("#table_method_wrapper").hide();
		$("#table_condition_wrapper").hide();
		$("#table_uniprot_wrapper").hide();
		$("#year").find('select').val('');
		$( "#year" ).dialog( "open" );
        	var max = new Date().getFullYear()-1,
		min = max -12,
		select = document.getElementById('selection_year');
		for (var i = min; i<=max; i++){
			var opt = document.createElement('option');
			opt.value = i;
			opt.innerHTML = i;
			select.appendChild(opt);
			}
      });
	$("a#pubmed_link").click(function(){
	window.open($(this).prop(href));
	});
  });
