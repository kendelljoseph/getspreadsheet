$(function(){
    var studentRecipes = getGSS;                                    // Rename getGSS (this is mainly for use in cloud 9)
    var GSS_KEY = "0AhepTSuBIkmLdFdrUDZnRDhnRmFtbTNCclhNcUVQRXc";   // Student Recipes GSS key
    var GSS_URL = "https://spreadsheets.google.com/feeds/list/"+    // Student Recipes GSS URL
                GSS_KEY + "/od6/public/values?alt=json";            
    
    studentRecipes(GSS_URL, function(rows) {    // Pass the GSS URL
        var nextButton = $('#nextRecipe');
        var prevButton = $('#prevRecipe');
        var jumpToButton = $('#jumpToButton');
        var currentRecipe = $('#currentRecipe');
        
        function showRecipe(recipeNum){
            var columns;
            if (recipeNum != undefined) {
                columns = rows[recipeNum];
                console.log(recipeNum)
            } else {
                columns = rows[currentRecipe.val()];
                console.log(recipeNum)
            }
            var studentName = $('#studentName')
                    .html(columns[1] + " " + columns[2]);
            var studentEmail = $('#studentEmail')
                    .html(columns[4]);
            var recipeType = $('#recipeType')
                    .html(columns[8]);
            var timestamp = $('#timestamp')   // The Recipe Timestamp
                    .html(columns[0]);
            var ingredients = $('#ingredients') // The Ingredients
                    .html(columns[13]);     // GSS column n
            var name = $('#recipeName')      // The Recipe Name
                    .html(columns[6]);      // GSS Column F
            var description = $('#description')    // The Recipe Description
                    .html(columns[7]);      // GSS Column G
            var directions = $('#directions')    // The Recipe Description
                    .html(columns[14]);      // GSS Column G
            var story = $('#story')    // The Recipe Description
                    .html(columns[15]);      // GSS Column G
            var history = $('#history')    // The Recipe Description
                    .html(columns[16]);      // GSS Column G      
            var image = $('#image')            // The Recipe Image
                .attr("src", columns[3]);   // GSS Column D
            var servings = $('#servings')    // The Recipe Description
                    .html(columns[10]);      // GSS Column G       
        }
        
        nextButton.mousedown(function(){
            var recipeNumber = currentRecipe.val(parseInt(currentRecipe.val(),10) + 1);
            showRecipe();
        });
        prevButton.mousedown(function(){
            if (currentRecipe.val() === 0) {
                showRecipe();
                return;
            }
            var recipeNumber = currentRecipe.val(parseInt(currentRecipe.val(),10) - 1);
            showRecipe();
        });
        jumpToButton.mousedown(showRecipe);
        currentRecipe.keypress(function(){
            if ( event.which == 13 ) {
                event.preventDefault();
                showRecipe();
           }
        });
        
        showRecipe();
    });
});