$(document).ready(function(){
	console.log("Document Start");
	var testJSON = '{ "config":{ "characterType":"Solar", "tabs":["core","background","equiptment","charms"], "tabConfig":{ "core":{ "tabButton":"<button id=\"coreButton\">Core<\/button>", "tabButtonID":"coreButton", "content":"<div id=\"character_container\"><\/div><div id=\"attribute_container\"><\/div><div id=\"ability_container\"><\/div><div id=\"merit_container\"><\/div><div id=\"other_container\"><\/div>", "contentIDs":["character_container","attribute_container","ability_container","merit_container","other_container"] }, "background":{}, "equiptment":{}, "charms":{} } }, "data":{ "core":{ "html":[ { "targetID":"attribute_container", "html":"<div id=\"physical_attributes\"><\/div><div id=\"social_attributes\"><\/div><div id=\"mental_attributes\"><\/div>", "dataTypes":"none" }, { "targetID":"physical_attributes", "html":"<div id=\"strength\"><\/div>", "htmlID":"strength", "dataType":"dots", "data":{ "value":3, "maximum":5 } }, { "targetID":"physical_attributes", "html":"<div id=\"dexterity\"><\/div>", "htmlID":"dexterity", "dataType":"dots", "data":{ "value":4, "maximum":5 } }, { "targetID":"physical_attributes", "html":"<div id=\"stamina\"><\/div>", "htmlID":"stamina", "dataType":"dots", "data":{ "value":2, "maximum":5 } }, { "targetID":"social_attributes", "html":"<div id=\"charisma\"><\/div>", "htmlID":"charisma", "dataType":"dots", "data":{ "value":4, "maximum":5 } }, { "targetID":"social_attributes", "html":"<div id=\"manipulation\"><\/div>", "htmlID":"manipulation", "dataType":"dots", "data":{ "value":3, "maximum":5 } }, { "targetID":"social_attributes", "html":"<div id=\"appearance\"><\/div>", "htmlID":"appearance", "dataType":"dots", "data":{ "value":2, "maximum":5 } }, { "targetID":"mental_attributes", "html":"<div id=\"intelligence\"><\/div>", "htmlID":"intelligence", "dataType":"dots", "data":{ "value":2, "maximum":5 } }, { "targetID":"mental_attributes", "html":"<div id=\"wits\"><\/div>", "htmlID":"wits", "dataType":"dots", "data":{ "value":3, "maximum":5 } }, { "targetID":"mental_attributes", "html":"<div id=\"perception\"><\/div>", "htmlID":"perception", "dataType":"dots", "data":{ "value":2, "maximum":5 } } ] }, "background":{}, "equiptment":{}, "charms":{}} }';
	var testParse = jQuery.parseJSON(testJSON);
	console.log(testParse)
	//Process JSON
	var json_text = $("#exalt_data").attr("exalt_data");
	console.log(json_text,"\n----------------------");

	json_text = json_text.split("'").join('"');
	console.log(json_text);
	
	var exalt_json  = jQuery.parseJSON(json_text);
	console.log(exalt_json);

});