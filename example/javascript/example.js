var studentRecipes = getGSS;                                    // Rename getGSS (this is mainly for use in cloud 9)
var GSS_KEY = "0AhepTSuBIkmLdFdrUDZnRDhnRmFtbTNCclhNcUVQRXc";   // Student Recipes GSS key
var GSS_URL = "https://spreadsheets.google.com/feeds/list/"+    // Student Recipes GSS URL
            GSS_KEY + "/od6/public/values?alt=json";            


studentRecipes(GSS_URL, function(rows) {    // Pass the GSS URL
    var row = rows[0];          // The GSS rows
    var imageURL = row[3];      // The Recipe Image URL
    var recipieName = row[6];   // The Recipe Name
    var description = row[7];   // The Recipe Description
    
    console.log(recipieName, description, imageURL);
    console.log(row);
    
});