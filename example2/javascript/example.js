
$(function(){
    var getUnrulyBeers = getGSS;  // Rename getGSS (this is mainly for use in cloud 9)
    var spreadsheetURL = "https://docs.google.com/spreadsheet/ccc?key=0AkOIIIT7wBStdHZMNFRqbVBoM253c21BWHJRSnN5WlE#gid=0"; // spreadsheet URL
    
    getUnrulyBeers(spreadsheetURL, function(GSS) {    // Pass the GSS URL
        console.log(GSS);
    });
});