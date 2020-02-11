# The-Budget-App-Project
The Budgety App helps you keep track of your income and expenses in an Intelligent way. How much you made? How much you spent? What are you left with currently?


# Planning and Architecture:
We cant just start coding just like that. To solve any problem we need a proper plan of action, a structure/architecture of ou application. Here it goes...

# Creating a To do list for our Application:
1. Add Event Listener for the submit(check button).
2. Get the input values.
3. Add the new item to our data structure.
4. Add the new item to the UI.
5. Calculate Budget.
6. Update the UI.

# Stucturing our code into Modules: 
Modules are very important aspect of any Robust Application. Modules help to keep our code clean ,seperated and organized. Using modules we can ensure what data to keep private and what data to expose publicly. (Variables and functions are private to these modules so no other code can overide or modify our data).
BASIC IDEA TO BREAK VARIOUS LOGICAL PARTS OF OUR CODE INTO MODULES AND THEN MAKE THEM INTERACT WITH ONE ANOTHER.

# What modules can we have for our tasks at hand?
We can clearly tell by looking at our to-do-list that some of the tasks have to do with UI and others have to do with our data handling so we decide to have 2 modules for now.
UI MODULE[2,4,6]  DATA MODULE[3,5]
Now we are left with our event handler so we create another module for keeping such task called CONTROLLER MODULE[1]. This module also acts as the link between the UI module and the DATA Module.

# Implementing the Module Pattern(all you need to know here is closures and IIFE's)
1. Here we start by creating 2 different modules which donot communicate with each other i.e. called seperation of concerns.
So that later on if you want to add more complex functionality then you will have to work only on the budgetController Module and not touch UIContoller module for example or vice versa. They are standalone and doesnt even know that other one exist.
2. For creating these modules we have used IIFEs and Closures. Each controller is an IIFE that returns an object having methods that you want to make public. Rest whatever happens in the IIFE remains in the scope of tat fucntion and hidden and not accessible to the outside scope.
3. So we have budgetController module for handling our budget logic and our UIController for handling our UI logic. They are totally independent of each other and mind there own business.
4. Now we need a way to connect them somehow or make them talk to each other. Thats why we have another module called controller. It reads data from the UI and passes it to the budget for manipulation and vice versa.
5. Now since  modules are functions(IIFE's) after all we can pass arguments to them. So we are passing budgetController and UIController objects into this function. We could have directly used them since they are available being declared in the outer scope but then that wouldnt be a very good practice because later for instance if we want to get their names changed then we will have to change the name everywhere. By passing them as function arguments all we need is to change them just once. 
6 `Note: In a nutshell we create a function doing the task in the respective module (here controllers) and then exposes it publicly and then call it in the respective module. And inside a module if we want a task to be done that is not required to be exposed we cretae its own private function. Each function has its own specific task. and we always have to keep DRY in our mind`

# Coding Budgety (To Do list)
1. We shall use the module pattern we created above i.e. budgetController, UIController, controller.
2. First task is to add an event listener to the add button (Check) to listen when the add button is clicked. We do it in the controller module, since this is our Global App Controller. Refer to DOM-Pig-Game LearnDOMPigGame.md about Event Listeners.
3. Next we need the add/check button functionality to work even when the enter key is pressed. So we need to add another event listener for when the enter key is pressed. But we donot add event listener for keypress event on any specific button as such. *** We add it to the entire document ***. Hence we have: document.addEventListener('keypress', function(event) {

});  A new thing we learn here is the "event" argument that is passed by the browser itself to our anonymous function. TRy consoling this event. You will find all the info about the keypress event that just occured. The Prototype chain is awesome here.
4. ***ctrlAddItem()*** is a custom function for adding item to the budget controller. It has been created to implement DRY.
5. The logic in this poject works in the way that in controller we have code that tells other modules budgetController and UICOntroller what to do. For instance we have logic for inputting data in UIContoller and logic for calculation of budget in budgetController. We have method for inputting data in UIController and we call that method here in controller so that we can pass it to the budgetController.
6. So now we code the first task at hand i.e. getting the input data. We must write the method in UIController and then expose it publicly and call it inside the controller. Thats what we do, create a getInput function and return it in the object that our IIFE UIContoller returns. In getInput() function we have simply used querySelector() got the value propety of the html elements.
7. But now we have a problem here, we are using the html classes in too many place, so later on if one changes the html class then he will have to change it everywhere. So to prevent this pain we store the html classes in an object DOMStrings. Since we shall be using the html classes in controller as well we will need this object there also. And as programmers are definitely not writing the same object again. Hence we expose this object publicly from UIController too.
8. Our code looks a bit scattered. For instance we have the event listeners hanging around and then variable declarations and all. Rather all we need in our controller is functions. So lets organize our code a bit. So we create a function for setting up event listeners called setupEventListeners(). Now Obviously this function needs to be called When our application starts and hence we expose it publicly and call it in our initialization function(when Application starts)called ***init***
9. ***Choosing Data Structure for our budgetController***. So our data looks like an income or an expense which will have an amount and a detail and an additional unique id. so lets have the data of a single income or expense stored in an object and we can have as many objects as we like. So we need a blueprint/prototype/constructor to generate all these objects everytime a new item is pushed in. Thats why we create function constructor fo income and expense.
*** In case we need methods for the objects created it is a very good practice to have those methods inside the prototype property of the function constuctor so that all the instances/objects created from this constructor can inherit those methods rather than being attached every time an object is created, resulting in extra memory being used every single time. *** Now if for example a user input 10 incomes and 10 expenses we need a data structure to store this data. Right now the best choice that comes to my mind is Array. To keep it all together in a single place, an Object of arrays.
10. Next Step is to create a public function in budgetController responsible for adding item to ou budget. And that is addItem(). unique id is created = id of last item entered in the array + 1;
11. Adding new item to the UI. Since this is the UI part it shall go into UIController. We do it in 3 parts. We first create the HTML with some placeholder text (we enclose the placeholder text in % so as to identify while replacing)that will show the item as th list both for income and expense. Next step we replace the placeholder text with actual data. Next we insert our html sting into the DOM using `insertAdjacentHtml()` method of the document object. it takes one of the 4 positions depending on where to insert the html relative to the previous html tag.
`document.querySelector('.class').insertAdjacentHtml('position', newHtml)`'
12. Clearing the input fields. Since this has clearly to do with user interface we do it in UIController and expose the method publicly to be called in controller. We call it clearFields(). Here we use `document.querySelectorAll('.class' + ', ' + '.class')` to get the elements exactly like css selectors do. But wht we get from this is a List. Now list isnt an array, its like an array but it isnt an array and doesnt have all the methods that array has from the Array Function constructor. So we use the call method we studied in call,apply,bind in Objects. We use the slice method from the Array function constructor and call it by giving the list we received variable as the `this variable reference`. `using call, bind, apply one can use methods of one objects on another`. *** This is AWESOME ***. Now using `forech(callback fn)` method we iterate through all the elements in our array and clear their value attribute(foreach() method applies the callback function to each element). Like addEventListener()'s callback function could take one argument called event passed to it by the browser, here the callback function can take three arguments. foreach(function(curr, index, Arr){}) where curr is the current element, index is the current index and Arr as the array through which we are iterating. Next once the fields are clear we set the focus back to add description. clearField() is called in the controller to make it work.
13. Updating the Budget:controller. We create a new function updateBudget() and not having this code in ctrlAddItem() coz we will need this code when we delete an item so DRY thats why. Now *** Get used to the Philosphy that each function has a specific task ***. getting information from a module is a simple task but specific that can be put in a function. Hence we have the function to return the budget like we had the function that returned DOMstrings.
14. Fixing a few bugs.`parseFloat() the value inputed`. so we can use it in calculations. Next is if the user doesnot enter any data and hits enter NaN is entered in our entry which is definitely not we want. so we put a check in our code. Description should not be empty. Value should be positive. Value should not be NaN. for the third check we use isNaN() method.
15. Calculating the budget. Since this has to do with the budget calculations we do it in budgetController and then call it in controller. so we create a calculateBudget() function in budgetController and expose it publicly and call it in controller. Inside calculateBudget() we calculate the total income and total expense, budget and perecentage. And we make use of our Global data structure for the same. And we store all these values in our Global data structure. We create our little private calculateTotal() function keeping DRY in mind since otherwise we shall have to repeat code once fo inc and again for exp. `Math.round()` has been used to round off the percentage to the near integer. Then calculateBudget has been called in the controller. We have a seperate function getBudget() exposed publicly for returning these calculated values ***Philosphy of having functions that only retreive data*** keeping in mind the modular pattern. this getBudget() is called in controller to get the values which are then passed to the UI controller. `Note: updateBudget() function is called everytime we input a new item`
16. Updating the budget in UI. we create a function in UI called displayBudget() and expose it publicly so that we can  call it in controller later. we update the DOMstrings with the html classes we shall need for this task so as to save us the trouble of messing up later when the class names change so that we have to make changes in DOMstrings only once. Setting budget to 0 in init() so that when app starts all values are set to 0.

# Planing and Architecture Part-2
Represent the entire structure/architecture of the application that we just built using arrows and flow of control. Refer Planning-and-Architecture-Part-2.png. It is advisable to have such an architecture of the app you want to make.

# To Do List - 2
All that is left now in our Budgety App is to delete the entires from our UI and our data structure when the croos is clicked
1. Add Event Handler
2. Delete the item from our data structure.
3. Delete the item from the UI.
4. Re-calculate the Budget.
5. Update the UI.

# Coding To Do List- 2
1. `Event Delegation- important concept used in javascript when we interact with the DOM`. 







 







