$(function(){
    var studentRecipes = getGSS;                                    // Rename getGSS (this is mainly for use in cloud 9)
    var GSS_KEY = "0AhepTSuBIkmLdFdrUDZnRDhnRmFtbTNCclhNcUVQRXc";   // Student Recipes GSS key
    var GSS_URL = "https://spreadsheets.google.com?key="+ GSS_KEY;

    studentRecipes(GSS_URL, function(recipes) {    // Pass the GSS URL
        var nextButton = $('#nextRecipe');
        var prevButton = $('#prevRecipe');
        var jumpToButton = $('#jumpToButton');
        var currentRecipe = $('#currentRecipe');
        
        function showRecipe(n){
            
            var studentName = $('#studentName')
                    .html(recipes.firstname[n] + " " + recipes.lastname[n]);
            var studentEmail = $('#studentEmail')
                    .html(recipes.email[n]);
            var recipeType = $('#recipeType')
                    .html(recipes.typeofdish[n]);
            var timestamp = $('#timestamp')
                    .html(recipes.timestamp[n]);
            var ingredients = $('#ingredients')
                    .html(recipes.listalltheingredients[n]);    
            var name = $('#recipeName')
                    .html(recipes.recipename[n]);
            var description = $('#description')
                    .html(recipes.description[n]);
            var directions = $('#directions')
                    .html(recipes.directions[n]);
            var story = $('#story')
                    .html(recipes.significanceofthisfoodinyourculturefamily[n]);
            var history = $('#history')
                    .html(recipes.history[n]);
            var image = $('#image')
                .attr("src", recipes.picurl[n]);
            var servings = $('#servings')
                    .html(recipes.numberofservings[n]);
        }
        
        nextButton.mousedown(function(){
            var recipeNumber = currentRecipe.val(parseInt(currentRecipe.val(),10) + 1);
            showRecipe(recipeNumber.val());
        });
        
        prevButton.mousedown(function(){
            var recipeNumber = currentRecipe.val(parseInt(currentRecipe.val(),10) - 1);
            if (recipeNumber.val() < 0) {
                showRecipe(0);
                recipeNumber.val(0);
                return;
            }
            showRecipe(recipeNumber.val());
        });
        
        jumpToButton.mousedown(function(){
            showRecipe(currentRecipe.val());
        });
        
        
        showRecipe(0);
    });
});