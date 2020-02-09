//This File lays out the basic architecture with proper comments for the budgety app.
/********
 * budgetController:IIFE that will return an object 
 * containing all the functions that you want to 
 * expose publicly

 */
var budgetController = (function(){
    // if you go check in console u wont find x or add() coz they are private
    var x = 23;

    var add = function(a) {
        return x + a;
    }
    //Exposing the publicTest method only
    /* Also Closure Example: An Inner Function has access to the variable Object(Variables and Functions) of the outer function
        even though the outer funtion has return. Variable Object of the outer function isnt destroyed and stays in memory
        to which the scoping chain has access to*/
    return {
        publicTest: function(b) {
            
            return add(b);
        }
    }
}) ();
//() is an operator of immediately calling IIFE

/******
 * UI Module: IIFE again
 * The budgetController and UIController are totally independent of each other.
 * 
 */

 var UIController = (function(){
    //Some Code
 }) ();


 /*******
  * App Controller: To connect the above two controllers.
  *  It read data from UI and add that to our budget. 
  * We could have just used budgetController and UIController inside our function
  * since they are in the global scopebut we dont do that coz it aint good practice
  * and this brings dependency and makes them less independent. For example if we have
  * to change the name of our budgetController then we will have to change it everywhere.
  */

var controller = (function(budgetCtrl, UICtrl){

    var z = budgetCtrl.publicTest(5);

    return {
        anotherPublic: function() {
            console.log(z);
        }
    }

}) (budgetController, UIController);