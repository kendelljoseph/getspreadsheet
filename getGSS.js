
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
            table= formatGSS($.parseJSON(data.responseText));    // I clean up the table formatting first
            success();
        }
        
        if (res != "success") { table=[]; fail(); } // If I recieve an unsuccessful response, I RUN fail.
        
        function success(){ // Things I will do if the response is successful.
        }
        function fail(){    // Things I will do if the response is NOT successful.
        }
        
        if (callback instanceof Function) {     // If the callback is a function, I will proceed.
            callback(table);                    // I RUN passing the table as an argument.
        }
    }
    
    // Cleans the table returned from the AJAX request
    function formatGSS(table) {
        var cleanTable = [];                    // I make a new array to store the new table.
        var tableObjects = table.feed.entry;    // I get the original table(its an array) that was returned from the Ajax request
        
        if (!tableObjects) {    
            return cleanTable;  // If I can't find the table in the GSS I RETURN an empty table.
        }
        
        for(var i=0; i < tableObjects.length; i++){ // I LOOP through the objects in the table
            var row = findValidRecords(tableObjects[i]); // I find only valid table records in the array
            cleanTable.push(row); // Then i push the valid records up to the clean table
        }
        
        function findValidRecords(obj) {
            var validRecords = []; // I make an array for storing each valid object's contents
            
            for (var name in obj) {                     // I LOOP through the names of each object
                
                if (name.indexOf("gsx$") === 0) {       // IF an objects name starts with "gsx$" it is valid
                    validRecords.push(obj[name].$t);    // Then I push the valid objects contents to the temporary list
                }
            }
            return validRecords; // After the object is fully interrigated, i return the array
        }
        return cleanTable;
    }
    
    // This parses the URL arguments as an object, (thanks David!)
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
    
    var spreadsheetKEY = urlArgs(GSS_URL).key;          // I get the spreadsheet key from the input GSS URL
    if(spreadsheetKEY.indexOf('#') !== -1) { spreadsheetKEY = spreadsheetKEY.split('#')[0];} // If the direct URL is used, i remove the extra parts at the end
    var spreadshetURL = "https://spreadsheets.google.com/feeds/list/" + spreadsheetKEY + "/od6/public/values?alt=json";  // I insert the key into the JSON URL          
    
    
    
    
    
    var ajaxOptions = {         // These are my jQuery Ajax Options.
        url: spreadshetURL,     // I pass the spreadshet URL as to the Ajax request
        complete:doWhenComplete // I RUN only when the Ajax request is complete.
    };
    
    $.ajax(ajaxOptions);    // I am the ajax request, I make everything work

}