$(document).ready(function(){
	console.log("Document Start");
	
	//Process JSON
	var json_text = $("#exalt_data").attr("exalt_data");
	console.log(json_text,"\n----------------------");

	json_text = json_text.split("'").join('"');
	console.log(json_text);
	
	var exalt_json  = jQuery.parseJSON(json_text);
	console.log(exalt_json);

});