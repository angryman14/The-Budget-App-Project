//
 //budgetController: Data Module
 
var budgetController = (function(){
   
}) ();

//UIController: UI Module 

 var UIController = (function(){
    
    return {
        getinput: function(){
            return {
                type: document.querySelector('.add__type').value,
                description: document.querySelector('.add__description').value,
                value: document.querySelector('.add__value').value
            }
            
        }
    }
 }) ();


//controller: Global App Controller


var controller = (function(budgetCtrl, UICtrl){

    var ctrlAddItem = function() {
    //1. Get the input data.
    var input = UICtrl.getinput();
    console.log(input);
    //2. Add the item to the budget controller
    //3. Add the item to the UI.
    //4. calculate the budget
    //5. Display the budget on the UI.

    }

   document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

   document.addEventListener('keypress', function(event){
    if(event.keyCode === 13) {
        ctrlAddItem();
    }
   });
}) (budgetController, UIController);