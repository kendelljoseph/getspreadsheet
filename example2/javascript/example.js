
$(function(){
    var getUnrulyBeers = getGSS;  // Rename getGSS (this is mainly for use in cloud 9)
    var spreadsheetURL = "https://docs.google.com/spreadsheet/pub?key=0AkOIIIT7wBStdHZMNFRqbVBoM253c21BWHJRSnN5WlE&output=html"; // URL of published spreadsheet
    
    getUnrulyBeers(spreadsheetURL, function(rows) {    // Pass the GSS URL
        console.log(rows);
    });
});