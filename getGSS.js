
/*  
*   Get Google Spreadsheet (GSS) Script
*
*   This will retrieve a google spreadsheet by a key you give it,
*   and return an brand spankin' new object containing the data!
*/

function getGSS(GSS_URL, callback) {
    /*
    *   Accepts 2(1) arguments
    *   Argument 1: URL of the GSS
    *   Argument 2(Optional): Callback function to run once the data is recieved
    */
    
    function doWhenComplete(data, res){
        var table;
        
        if (res === "success") {                    // If I recieve a successful response, I RUN success.
            table = formatGSS($.parseJSON(data.responseText));    // I clean up the table formatting first
            success();
        }
        
        if (res != "success") { table=[]; fail(); } // If I recieve an unsuccessful response, I RUN fail.
        
        function success(){ // Things I will do if the response is successful.
            console.log('Successfully retrieved a table');
        }
        function fail(){    // Things I will do if the response is NOT successful.
            console.log('Failed to retrieve table using the URL ' + GSS_URL);
            console.log('The key in the url ' + urlArgs(GSS_URL).key + ' may be invalid OR');
            console.log('The table may not yet be published to the web for public viewing.');
        }
        
        if (callback instanceof Function) {     // If the callback is a function, I will proceed.
            callback(table);                    // I RUN passing the table as an argument.
        }
    }
    
    // Cleans the table returned from the AJAX request
    function formatGSS(table) {
        var tableObjects = table.feed.entry;    // I get the original table(its an array) that was returned from the Ajax request
        var tabeObject = {};
        
        for (var name0 in tableObjects[0]) {
            if (name0.indexOf("gsx$") === 0) {
                var columnName = name0.split("gsx$")[1];
                tabeObject[columnName] = [];
            }
        }
        
        if (!tableObjects) {    
            return false;  // If I can't find the table in the GSS I RETURN false
        }
        
        for(var i=0; i < tableObjects.length; i++){ // I LOOP through the objects in the table
            for (var name1 in tableObjects[i]) {                     // I LOOP through the names of each object
                if (name1.indexOf("gsx$") === 0) {       // IF an objects name starts with "gsx$" it is valid
                    var column = name1.split("gsx$")[1];
                    tabeObject[column].push(tableObjects[i][name1].$t);
                }
            }
        }
        return tabeObject;
    }
    
    // This parses the URL arguments as an object, this is a modifed version of a general use method by David Flannigan
    function urlArgs(url) {
        var args = {};
        var query;
        if (url) {
            var j= url.indexOf('?');
            query = url.substring(j).substring(1);
        } else {
            query = location.search.substring(1);
        }
        var pairs = query.split("&");
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if (pos == -1) continue;
            var name = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos + 1);
            value = decodeURIComponent(value);
            args[name] = value;
        }
        return args;
    }
    
    var spreadsheetKEY = urlArgs(GSS_URL).key;  // I get the spreadsheet key from the input GSS URL
    if(spreadsheetKEY.indexOf('#') !== -1) { spreadsheetKEY = spreadsheetKEY.split('#')[0];} // If the direct URL is used, i remove the extra parts at the end
    var spreadshetURL = "https://spreadsheets.google.com/feeds/list/" + spreadsheetKEY + "/od6/public/values?alt=json";  // I insert the key into the JSON URL          
    var ajaxOptions = {         // These are my jQuery Ajax Options.
        url: spreadshetURL,     // I pass the spreadshet URL as to the Ajax request
        complete:doWhenComplete // I RUN only when the Ajax request is complete.
    };
    
    $.ajax(ajaxOptions);    // I am the ajax request, I make everything work

}