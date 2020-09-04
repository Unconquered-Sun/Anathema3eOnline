$(document).ready(function(){
	console.log("Document Start");
	
	//Process JSON
	var json_text = $("#exalt_data").attr("exalt_data");
	json_text = json_text.split("'").join('"');
	//Parse JSON to a usable object
	var exalt_json  = jQuery.parseJSON(json_text);
	console.log(exalt_json);

	//Begin sheet setup
	var exalt_config = exalt_json.config
	var exalt_data = exalt_json.data

	var tabNames = exalt_config.tabs
	var tabConfig = exalt_config.tabConfig

	//Create Tab Buttons using the tabConfig
	for(key in tabConfig){
		if( tabConfig[key].hasOwnProperty("tabButton") ){
			$("#tabs").append( loadHTML(tabConfig[key]["tabButton"]) );
		}
	}

	//Determine which tab is the primary tab
	var currentTab = exalt_config.startingTab;

	//Use the currentTab to generate the tab's base HTML
	if( tabConfig[currentTab].hasOwnProperty("content") ){
		$("#content").html( loadHTML( tabConfig[currentTab]["content"] ) )
	}
	else{
		console.log("NO TAB CONTENT");
		$("#content").html("NO TAB CONTENT");
	}

	loadTab(currentTab);





	//Load contents of the current Tab
	function loadTab(tabName){
		console.log("Start Tab Load")
		//Check if tabName exists as a key in exalt_data
		if( exalt_data.hasOwnProperty(tabName) ){
			console.log("In Tab")
			tabData = exalt_data[tabName];
			console.log(tabData.length)
			//Iterate through the tabData
			for(j = 0; j<tabData.length; j++){
				console.log("HTML #"+j);
				// console.log(tabData[i])
				//Begin by creating the content and appending it to the associated ID
				tempHTML = loadHTML(tabData[j]["html"]);
				htmlTarget = "#"+tabData[j]["targetID"];
				$(htmlTarget).append(tempHTML)

				//Check if the new HTML has any associated data
				//data types:
					//none: no data associated
					//dots: data is shown in dots and will contain a value and maximum
					//text: data is shown in a textbox and will contain a value
					//textdots: data is shown in a textbox with dots after it. Contains a textValue, dotValue, and dotMaximum
				if( tabData[j]["targetID"]["dataType"] == "none" ){

				}
				else if( tabData[j]["targetID"]["dataType"] == "dots" ){

				}
				else if( tabData[j]["targetID"]["dataType"] == "text" ){
					
				}
				else if( tabData[j]["targetID"]["dataType"] == "textdots" ){
					
				}
				else{
					//SCREAMS GEOMETRICALLY
				}
			}
		}
		else{
			console.log("NO TAB CONTENT");
			$("#content").html("NO TAB CONTENT");
		}

	}

	//Create a HTML statement based on the contents of the htmlJSON
	function loadHTML(htmlJSONList){
		//htmlOutput will contain the final HTML formed from the list
		htmlOutput = "";
		//Process all htmlJSONs passed in the list
		for(i=0; i<htmlJSONList.length; i++){
			htmlJSON = htmlJSONList[i];
			//create the opening of the tag
			tempHTML = "<"+htmlJSON["htmlType"]+" ";
			// add any attributes to the tag
			for(key in htmlJSON["htmlAttributes"]){
				tempHTML = tempHTML+key+"="+htmlJSON["htmlAttributes"][key]+" "
			}
			//close the tag, add its content, and the closing tag
			tempHTML = tempHTML+">"+htmlJSON["htmlContent"]+"</"+htmlJSON["htmlType"]+">";
			// add to htmlOutput
			htmlOutput = htmlOutput+tempHTML;
		}
		//return the result
		return htmlOutput;
	}
});