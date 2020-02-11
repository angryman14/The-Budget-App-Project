//
//budgetController: Data Module

var budgetController = (function () {
    //Function constructor for an Expense.
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;

    }

    //Function constuctor for an Income.
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;

    }
    // function for calculating Total income/expense
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(curr) {
            //curr is an object stored in type array in our data structure
            sum = sum + curr.value;
        });
        //storing total income/expense in our data structure
        data.totals[type] = sum;
    }
    //Data Structure for storing income and expense data.
    //We could have used a single seperate array for each of them
    //but it would be good to have all the data consolidated in one place. Hence data.

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1,
    }

    //Exposing publicly
    return {
        addItem: function (type, des, val) {
            // creating income/expense object based on 'inc' or 'exp' type
            var newItem;
            //creating a unique id
            ID = data.allItems[type].length === 0 ? 0 : data.allItems[type][data.allItems[type].length - 1].id + 1;

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            }
            else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //pushing data in our data structure
            data.allItems[type].push(newItem);

            //Now we return newItem so that other controller can make use of it
            return newItem;

        },
        testing: function () {
            console.log(data);
        },
        calculateBudget: function() {
            //calculate total income and expenses. We need a function for DRY.
            calculateTotal('exp');
            calculateTotal('inc');
            //calculate the budget: income - expenses
            //storing budget in our global data structure
            data.budget = data.totals.inc - data.totals.exp;
            //calculate the percentage of income that expenses is
            if(data.totals.inc > 0) {
                if (data.totals.exp < data.totals.inc) {
                    data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
                } else data.percentage = -1;
                
            }
            //percentage doesnt exist so -1
            else data.percentage = -1;
            
        },
        //function retreiving budget data
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        }
    }
})();

//UIController: UI Module 

var UIController = (function () {

    //Storing DOM strings to reuse.
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
    }

    return {
        //Function that returns the input values as an Object.
        getinput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }

        },
        //Add Items to the UI. This will need the newItem and the type.
        addListItem: function (obj, type) {
            var html, newHtml;
            //Create HTML String with placeholder text.
            // '<div class="item clearfix" id="income-0"><div class="item__description">Salary</div><div class="right clearfix"><div class="item__value">+ 2,100.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                //Backticks/ template literal used for multiline string
                html = ` <div class="item clearfix" id="income-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                            </div>
                        </div> `
            }
            else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = `<div class="item clearfix" id="expense-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`
            }


            //Replace the placeholder text with actual data.

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);


            //Insert the HTML into the DOM.

            document.querySelector(element).insertAdjacentHTML('afterend', newHtml);
        },
        clearFields: function () {
            var fields, fieldsArr;
            //Getting List(Not Array but NodeList) of elements 
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            //Using call method to use Array function constructor methods onto a list
            fieldsArr = Array.prototype.slice.call(fields);

            //Clearing the fields
            fieldsArr.forEach(function (curr, index, Arr) {
                curr.value = "";
            });

            fieldsArr[0].focus();

        },
        //displaying budget to the UI
        displayBudget: function(obj) {
            console.log(obj)
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }
            else 
            document.querySelector(DOMstrings.percentageLabel).textContent = '----';
            
        },
        //Exposing the getDOMstrings publicly to be used by controller.
        getDOMstings: function () {
            return DOMstrings;
        }
    }
})();


//controller: Global App Controller


var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMstings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                //Javascript Hoisting
                ctrlAddItem();
            }
        });
    }


    // Updating the budget. Not done in ctrlAddItem for DRY
    var updateBudget = function () {
        //1. Calculate the budget. Should be calculated in the budgetController.
        budgetCtrl.calculateBudget();
        
        //2. return the budget
        var budget = budgetCtrl.getBudget();
        //3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    }
    var ctrlAddItem = function () {
        var input, newItem;
        //1. Get the input data.
        input = UICtrl.getinput();
        // Check for empty entries or negative entries
        if (input.description !== "" && input.value > 0 && !isNaN(input.value)) {
            //2. Add the item to the budget controller
            newitem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. Add the item to the UI.
            UICtrl.addListItem(newItem, input.type);
            //Clear the Fields
            UICtrl.clearFields();
            //4. calculate the budget//5. Display the budget on the UI.//To implement DRY we created updateBudget()
            updateBudget();
        }


    }

    return {
        init: function () {
            console.log('Application has Started!');
            //closure
            setupEventListeners();
            //setting all values 0 when app stars
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
        }
    }


})(budgetController, UIController);

controller.init();