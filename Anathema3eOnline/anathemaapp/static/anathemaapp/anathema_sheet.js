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




	//EVENT BINDINGS

	//Generic Dot Click Event ○ ●
	$("body").on("click",'[class$="-dot"]',function(){
		//Check if clicking on a filled or unfilled Dot
		
		//Get the base ID of the dots
		baseID = $(this).attr("id").split("-")[0]
		
		//Get all associated dots
		allDots = $('[id^="'+ baseID+"-dot-" +'"')

		//Get the number of the clicked dot
		clickedDot = $(this).attr("id").split("-").pop()

		if( $(this).html() == "●"){
			//Filled dot, so uncheck it and all dots after and fill all dots before it.
			allDots.each(function(index){
				if( $(this).attr("id").split("-").pop() < clickedDot ){
					$(this).html("●")
				}
				else if( $(this).attr("id").split("-").pop() >= clickedDot ){
					$(this).html("○")
				}
			});
		}
		else if($(this).html() == "○"){
			//Unfilled Dot, so fill it and all dots before it and uncheck all dots after
			allDots.each(function(index){
				if( $(this).attr("id").split("-").pop() <= clickedDot ){
					$(this).html("●")
				}
				else if( $(this).attr("id").split("-").pop() > clickedDot ){
					$(this).html("○")
				}
			});
		}

	});


	//FUNCTIONS

	//Load contents of the current Tab
	function loadTab(tabName){
		console.log("Start Tab Load")
		//Check if tabName exists as a key in exalt_data
		if( exalt_data.hasOwnProperty(tabName) ){
			tabData = exalt_data[tabName];
			console.log(tabData.length)
			//Iterate through the tabData
			for(var j = 0; j<tabData.length; j++){
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
				console.log(tabData[j]["dataType"])
				if( tabData[j]["targetID"]["dataType"] == "none" ){
					console.log("No Data")
				}
				else if( tabData[j]["dataType"] == "dots" ){
					console.log("Dots Data")


					createDots(tabData[j]["html"][0]["htmlAttributes"]["id"] ,tabData[j]["html"][0]["htmlAttributes"]["id"], tabData[j]["data"]["maximum"], tabData[j]["data"]["value"])
				}
				else if( tabData[j]["dataType"] == "text" ){
					console.log("Text Data")
				}
				else if( tabData[j]["dataType"] == "textdots" ){
					console.log("Text and Dots Data")
				}
				else{
					//SCREAMS GEOMETRICALLY
					console.log("Data Error")
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
		for(var i=0; i<htmlJSONList.length; i++){
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

	//Creates the Dots within the div with the matching ID
	function createDots(ID, target, maximum, value){
		console.log("Creating Dots")
		htmlOutput = '<div id="'+ID+'-dots">'
		for(var k=1; k<=maximum; k++){
			if(k<=value){
				htmlOutput = htmlOutput+'<p id="'+ID+'-dot-'+k+'" class="'+ID+'-dot">●</p>'
			}
			else{
				htmlOutput = htmlOutput+'<p id="'+ID+'-dot-'+k+'" class="'+ID+'-dot">○</p>'
			}
		}
		htmlOutput = htmlOutput+"</div><br/>"
		htmlTarget = "#"+target
		$(htmlTarget).append(htmlOutput);
	}

	//Temp save function. Should be called after every tab change and before the actual save function


	//Actual Save. Sends to the server to update the Server's JSON,

});