var oTable;

/* Formating function for row details */
function fnFormatDetails ( nTr )
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
//	console.log(pData);
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
    sOut += '<tr><td>Protein name in the paper:</td><td>'+pData[0]['entryname']+'</td></tr>';
    sOut += '<tr><td>Original ID in paper:</td><td>'+pData[0]['originalID']+'</td></tr>';
    sOut += '<tr><td>Database used for screening:</td><td>'+pData[0]['database_name']+'</td></tr>';
    sOut += '</table>';
    return sOut;
}

//Reading the form input
  $(function() {
	$("#table_protein").hide();
    $("#table_cell").hide();
    $("#table_organism").hide();
	$("#table_year").hide();
	var uniprot=$("#uniprot");
	var name = $("#name");
     var tips = $( ".validateTips" );

//Function for validation
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
		setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
	
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
 
 //Open jquery dialogue model
    $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      
      buttons: {
        "Search": function() {
			$("#table_protein").show();
			var bValid = true;
            var bProtein=true;
           
	//	   console.log(name);
		   
		   
			
			bProtein = bProtein && checkLength( name, "protein", 3, 300 );
			//bProtein= bProtein && checkRegexp( name, /^[a-zA-Z0-9]([0-9a-z_])+$/i, "Name of protein may consist of a-z, 0-9, underscores, begin with a letter." );
		//console.log(bProtein);
			
		
			
			bValid = bValid && checkLength( uniprot, "Uniprot ID", 6, 9 );
            bValid = bValid && checkRegexp( uniprot,/([A-Z][0-9][A-Z0-9]{3}[0-9])|([A-Z][0-9][A-Z0-9]{3}[0-9]\-\[0-9]{1-2})/i, "eg. Q9WVC3" );
            console.log(bValid);
          
	
          if ( bValid && !bProtein) {
          var jsonData = $.ajax({
          url: "./php/protein_study.php",
          type: "POST",
          data: uniprot,
          dataType:"json",
          async: false
          }).responseText;	
			newData=$.parseJSON(jsonData);	
			//console.log(newData);
			oTable=$('#table_protein').dataTable({
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
						}
				  });
		$( this ).dialog( "close" );
		}
		  else if (!bValid && bProtein) {
          var jsonData = $.ajax({
          url: "./php/protein_name.php",
          type: "POST",
          data: name,
          dataType:"json",
          async: false
          }).responseText;	
			newData=$.parseJSON(jsonData);
			
		oTable=$('#table_protein').dataTable({
				  "bProcessing": true,
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
					{ "mData": "year", "sClass": "center" }
					],
					"aaSorting": [[3, 'asc']],
					"oTableTools": {
						"aButtons": [
							"print",  
							{
							"sExtends":    "collection",
							"sButtonText": "Save",
							"aButtons":    [ "csv",	"pdf" ]
							}		
							]
						},
						"SwfPath": "media/swf/copy_cvs_xls_pdf.swf"
				  });
		
		$( this ).dialog( "close" );
		}
		else{
			updateTips( "Put atleast one value for search" );
		}
        },
         
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
		uniprot.val("").removeClass( "ui-state-error" );
        name.val( "" ).removeClass( "ui-state-error" );
      }
    });
    $('#table_protein').on( 'click', 'tbody td img',function () {
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
            oTable.fnOpen( nTr, fnFormatDetails (nTr), 'details' );
        }
    } );
 
    $( "#create-user" )
      .button()
      .click(function() {
		$("#table_protein_wrapper").hide();
		$("#table_cell_wrapper").hide();
		$("#table_organism_wrapper").hide();
		$("#table_year_wrapper").hide();
        $( "#dialog-form" ).dialog( "open" );
     /*   $("#name").autocomplete({  //autocomplete option
      source: "./php/autocomplete_entryname.php",
       minLength: 3,
		select	: function( event, ui ) {
        $("#name").val(ui.item.label);
		}
		});*/        
      });
  });
