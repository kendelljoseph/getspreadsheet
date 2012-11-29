$(function(){
    var studentRecipes = getGSS;                                    // Rename getGSS (this is mainly for use in cloud 9)
    var GSS_KEY = "0AhepTSuBIkmLdFdrUDZnRDhnRmFtbTNCclhNcUVQRXc";   // Student Recipes GSS key
    var GSS_URL = "https://spreadsheets.google.com/feeds/list/"+    // Student Recipes GSS URL
                GSS_KEY + "/od6/public/values?alt=json";            
    
    studentRecipes(GSS_URL, function(rows) {    // Pass the GSS URL
        var nextRecipeButton = $('#nextRecipeButton');
        var currentRecipe = $('#currentRecipe');
        
        function showRecipe(){
            var columns = rows[currentRecipe.val()];
            var recipe = $('#recipe');      // The Recipe Element
            var timestamp = $('<span />')   // The Recipe Timestamp
                    .attr("id", "timestamp")
                    .html(columns[0]);
            var ingredients = $('<span />') // The Ingredients
                    .attr("id", "ingredients") 
                    .html(columns[13]);     // GSS column n
            var name = $('<header />')      // The Recipe Name
                    .html(columns[6]);      // GSS Column F
            var description = $('<p />')    // The Recipe Description
                    .html(columns[7]);      // GSS Column G
            var image = $('<img />')            // The Recipe Image
                .attr("src", columns[3]);   // GSS Column D
            recipe.html("");
            recipe.append(timestamp);
            recipe.append(ingredients);
            recipe.append(name);
            recipe.append(image);
            recipe.append(description);
                
            // Debug
            console.log(recipe, name, image);
        }
        
        nextRecipeButton.mousedown(showRecipe);
        currentRecipe.keypress(function(){
            if ( event.which == 13 ) {
                event.preventDefault();
                showRecipe();
           }
        });
        
        showRecipe();
    });
});