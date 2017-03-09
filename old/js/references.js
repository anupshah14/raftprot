$(function() {
	  var jsonData = $.ajax({
          url: "./php/references.php",
          type: "GET",
          dataType:"json",
          async: false
          }).responseText;	
			newData=$.parseJSON(jsonData);	
			//console.log(newData);
			oTable=$('#table_id').dataTable({
				  "sDom": '<"H"T<"clear">lfr>t<"F"ip>',
				  "bProcessing": true,
				  "iDisplayLength": 50,
				  //"sScrollY": 200,
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
					"aaSorting": [[2, 'asc']] 
				  });
	         		
				$("a#new_tab").click(function(){
				window.open($(this).prop(href));
				});
});
