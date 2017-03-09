var UniProtTable;
var ProteinNameTable;

/* Formating function for row details */
function fnFormatDetails ( nTr )
{
   var aData =UniProtTable.fnGetData( nTr );
   console.log(aData);
   var study={};
 
  study.idStudy= aData['idStudy'];
  study.uniprot=aData['accession'];
  var proteinData = $.ajax({
          url: "./php/get_protein_name.php",
          type: "POST",
          data: study,
          dataType:"json",
          async: false
          }).responseText;
	eData=$.parseJSON(proteinData);
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
	var sOut = '<table id = "uniprot_details" cellpadding="5" cellspacing="0" border="0" style="padding-left:75px;">';
	for (var j=0; j < eData.length; j++){
		sOut += '<tr><td>Cell/tissue type:</td> <td>'+cellName+'</td></tr>';		
		sOut += '<tr><td>Experiment Description: </td><td>'+eData[j]['expDescription']+'</td></tr>';
    	sOut += '<tr><td>Biochemical method of extraction: </td><td>'+eData[j]['biochemMethod']+'</td></tr>';
    	sOut += '<tr><td>Detergent Used: </td><td>'+eData[j]['detergent']+'</td></tr>';
    	sOut += '<tr><td>Treatment: </td><td>'+eData[j]['medium']+'</td></tr>';
    	sOut += '<tr><td>Protein estimation: </td><td>'+eData[j]['quantitation']+'</td></tr>';
    	sOut += '<tr style="color:red;"><td>Complete list of proteins (click): </td><td id="experiment_id">'+eData[j]['idExperiment']+'</td></tr>';
    	sOut += '<tr><td>            </td><td>            </td></tr>';
	}
	sOut += '</table>';	
	return sOut;
    }

function fnProteinNameDetails ( nTr )
{
   var aData = ProteinNameTable.fnGetData( nTr );
	console.log(aData);
   var study={};
  study.idStudy= aData['idStudy'];
  study.entryname=aData['entryname'];
  var proteinNameData = $.ajax({
          url: "./php/get_protein_accession.php",
          type: "POST",
          data: study,
          dataType:"json",
          async: false
          }).responseText;
   	pnData=$.parseJSON(proteinNameData);
	//console.log(pnData);
    var sOut = '<table id = "protein_details" cellpadding="5" cellspacing="0" border="0" style="padding-left:75px;">';
    for (var j=0; j < pnData.length; j++){
	sOut += '<tr style="color:red;"><td id="experiment_id">'+pnData[j]['Experiment_idExperiment']+'</td></tr>'
    sOut += '<tr><td>Protein name in the paper:</td><td>'+pnData[j]['entryName']+'</td></tr>';
    sOut += '<tr><td>Uniprot Accession:</td><td>'+pnData[j]['accession']+'</td></tr>';
    sOut += '<tr><td>Original ID in paper:</td><td>'+pnData[j]['originalID']+'</td></tr>';
    sOut += '<tr><td>Database used for screening:</td><td>'+pnData[j]['database_name']+'</td></tr>';
    }
    sOut += '</table>';
    return sOut;
}

//Reading the form input
  $(function() {
	$("#table_protein").hide();
	$("#table_uniprot").hide();
        $("#table_cell").hide();
        $("#table_organism").hide();
	$("#table_year").hide();
	$("#table_method").hide();
	$("#table_condition").hide();
	var uniprot=$("#uniprot");
	var name = $("#name");
	var gene_name=$("#gene_name");
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
//        updateTips( "Length of " + n + " must be between " +
  //        min + " and " + max + "." );
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
      height: 350,
      width: 350,
      modal: true,
      
      buttons: {
        "Search": function() {
			$(".grid.cs-style-3").hide();
			$("#back_search").show();
			if (uniprot.val()!=""){
			$("#table_uniprot").show();
			$("#table_protein").hide();
			$("#table_gene_name").hide();
			}
			else if (name.val()!=""){
				$("#table_protein").show();
				$("#table_uniprot").hide();
				$("#table_gene_name").hide();
			}
			else if (gene_name.val()!=""){
				$("#table_protein").show();
				$("#table_uniprot").hide();
				$("#table_gene_name").hide();
			}
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
			UniProtTable=$('#table_uniprot').dataTable({
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
					"aaSorting": [[4, 'asc']], 
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
		ProteinNameTable=$('#table_protein').dataTable({
				  "sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "bProcessing": true,
				  "bJQueryUI": true,
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":newData,
					"aoColumns": [
					{ "mData": "gene_name",
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
					{ "mData": "species"},
					{ "mData": "protein_count", "sClass": "center" },
					{ "mData": "detail", "sClass": "center", "sWidth": "05%","bSortable": false}
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
		$( this ).dialog( "close" );
		}
		else if (gene_name!="") {
          var jsonData = $.ajax({
          url: "./php/gene_name_search.php",
          type: "POST",
          data: gene_name,
          dataType:"json",
          async: false
          }).responseText;	
		newData=$.parseJSON(jsonData);
		ProteinNameTable=$('#table_protein').dataTable({
				"sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "bProcessing": true,
				  "bJQueryUI": true,
				  "sPaginationType": "full_numbers",
				  "bDestroy":true,
				  "aaData":newData,
				  "aoColumns": [
					{ "mData": "gene_name",
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
					{ "mData": "species"},
					{ "mData": "protein_count", "sClass": "center" },
					{ "mData": "detail", "sClass": "center", "sWidth": "05%","bSortable": false}
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
		gene_name.val( "" ).removeClass( "ui-state-error" );
      }
    });
    
			$("a#pubmed_link").click(function(){
			window.open($(this).prop(href));
			});
	$("#table_uniprot").on('mouseover','tbody tr td.details table#uniprot_details tbody tr td#experiment_id', function(){
                                $(this).css('color','blue');
                                $(this).css('font-weight','bold');
                                $(this).css('cursor','pointer');
                                $(this).css('cursor','hand');
                        });
                        //Mouse out
      $("#table_uniprot").on('mouseout','tbody tr td.details table#uniprot_details tbody tr td#experiment_id', function(){
                        $(this).css('color','red');
                        $(this).css('font-weight','normal');
        });
                        
			
			$("#table_uniprot").on('click', 'tbody tr td.details table#uniprot_details tbody tr td#experiment_id',function(){
			var name=$(this).text();
			var url="Experiment_details.html?id=" + encodeURIComponent(name);
			window.open(url);
			});
			
			
    $('#table_uniprot').on( 'click', 'tbody td img',function () {
        var nTr = $(this).parents('tr')[0];
        if ( UniProtTable.fnIsOpen(nTr) )
        {
            /* This row is already open - close it */
            this.src = "./css/images/details_open.png";
            UniProtTable.fnClose( nTr );
        }
        else
        {
            /* Open this row */
            this.src = "./css/images/details_close.png";
            UniProtTable.fnOpen( nTr, fnFormatDetails (nTr), 'details' );
        }
    });
 
 //manupulating protein details table
 
			$("a#paper_link").click(function(){
			window.open($(this).prop(href));
			});
			
//			$("#table_protein").on('click', 'tbody tr td.details table#protein_details tbody tr td#experiment_id',function(){
//			var name=$(this).text();
//			var url="Experiment_details.html?id=" + encodeURIComponent(name);
//			window.open(url);
//			});
			
			
    $('#table_protein').on( 'click', 'tbody td img',function () {
	$("#table_cell").show();
        var nTr = $(this).parents('tr')[0];        
        var aData = ProteinNameTable.fnGetData( nTr ); 
        //console.log(aData);   
          var study={};
          study.accession=aData['accession'];
          var details_data = $.ajax({
          url: "./php/protein_exp_details.php",
          type: "POST",
          data: study,
          dataType:"json",
          async: false
          }).responseText;          
          newData=$.parseJSON(details_data);
	console.log(newData);
	 oTable=$('#table_cell').dataTable({
                        "sDom": '<"H"<"clear">lfr>t<"F"ip>',
                                  "bProcessing": true,
                                  "bJQueryUI": true,
                                  "sPaginationType": "full_numbers",
                                  "bDestroy":true,
                                  "aaData":newData,
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
                                                "sClass": "center", "bSortable": false}
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

    });
    
   $('#table_gene_name').on( 'click', 'tbody td img',function () {
        $("#table_cell").show();
        var nTr = $(this).parents('tr')[0];
        var aData = ProteinNameTable.fnGetData( nTr );
        console.log(aData);
          var study={};
          study.accession=aData['accession'];
          var details_data = $.ajax({
          url: "./php/protein_exp_details.php",
          type: "POST",
          data: study,
          dataType:"json",
          async: false
          }).responseText;
          newData=$.parseJSON(details_data);
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

    });
 
    
    $("#create-user" )
      .button()
      .click(function() {
		$("#table_protein_wrapper").hide();
		$("#table_uniprot_wrapper").hide();
		$("#table_cell_wrapper").hide();
		$("#table_organism_wrapper").hide();
		$("#table_year_wrapper").hide();
		$("#table_gene_name_wrapper").hide();
		$("#table_condition_wrapper").hide();
		$("#table_method_wrapper").hide();
		$("#back_search").hide();
  		$( "#dialog-form" ).dialog( "open" );
   		$("#name").autocomplete({  //autocomplete option
		source: "./php/autocomplete_entryname.php",
		minLength: 2,
		select	: function( event, ui ) {
    		$("#name").val(ui.item.label);
		}
		});
		$("#gene_name").autocomplete({  //autocomplete option
		source: "./php/autocomplete_gene_name.php",
		minLength: 3,
		select	: function( event, ui ) {
		        $("#gene_name").val(ui.item.label);
		}
		});         
      });
  });
