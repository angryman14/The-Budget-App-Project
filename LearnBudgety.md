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

# Coding Budgety
1. We shall use the module pattern we created above i.e. budgetController, UIController, controller.
2. First task is to add an event listener to the add button (Check) to listen when the add button is clicked. We do it in the controller module, since this is our Global App Controller. Refer to DOM-Pig-Game LearnDOMPigGame.md about Event Listeners.
3. Next we need the add/check button functionality to work even when the enter key is pressed. So we need to add another event listener for when the enter key is pressed. But we donot add event listener for keypress event on any specific button as such. *** We add it to the entire document ***. Hence we have: document.addEventListener('keypress', function(event) {

});  A new thing we learn here is the "event" argument that is passed by the browser itself to our anonymous function. TRy consoling this event. You will find all the info about the keypress event that just occured. The Prototype chain is awesome here.
4. ctrlAddItem() is a custom fucntion for adding item to the budget controller. It has been created to implement DRY.
5. 






 







