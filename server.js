 // Import the console.table module for displaying tabular data
 const table = require("console.table");
 // Import the mysql2/promise module for interacting with the MySQL database
 const mysql = require("mysql2/promise");
 // Import the asciiart-logo module for displaying the ASCII art logo
 const logo = require('asciiart-logo');
// Set the title for the application
const title = "Employee Tracker"; 

// Function to initialize the application
function init() {
  console.log(logo({
      name: "Employee Tracker", // Set the name for the logo
  }).render()); // Render and display the ASCII art logo
  start(); // Start the application
}

// Import the functions from the ./utils/org.js module
const {
  viewAllDepartments,
  addDepartment,
  viewAllRoles,
  viewAllEmployees,
  addRole,
  addAnEmployee,
  updateAnEmployeeRole,
  updateEmployeeManagers,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  viewUtilizedBudget,
} = require("./utils/org");

// Import the getAnswers function from the ./utils/getAnswers.js module
const getAnswers = require("./utils/getAnswers"); 

// Define the looping question that prompts the user for the next action
const loopingQuestion = [
  {
    name: "actionPoint",
    type: "list",
    message:
      "What would you like to do next? (choose one action from the list or quit)",
    choices: [
      // Define the available actions with their names and corresponding values
      { name: "View all departments", value: "viewAllDepartments" },
      { name: "View all roles", value: "viewAllRoles" },
      { name: "View all employees", value: "viewAllEmployees" },
      { name: "Add a department", value: "addDepartment" },
      { name: "Add a role", value: "addRole" },
      { name: "Add an employee", value: "addAnEmployee" },
      { name: "Update an employee role", value: "updateAnEmployeeRole" },
      { name: "Update employee managers", value: "updateEmployeeManagers" },
      { name: "View employees by manager", value: "viewEmployeesByManager" },
      { name: "View employees by department", value: "viewEmployeesByDepartment" },
      { name: "Delete department", value: "deleteDepartment" },
      { name: "Delete role", value: "deleteRole" },
      { name: "Delete employee", value: "deleteEmployee" },
      { name: "View utilized Budget", value: "viewUtilizedBudget" },
      { name: "Quit", value: "quit" },
    ],
  },
];

// Start function that handles the main logic of the application
const start = async () => {
  // Define the configuration for connecting to the database
  const config = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employee_db",
  };

  // Connect to the MySQL database
  const db = await mysql.createConnection(config);

  let status = true;

  while (status) {
    // Prompt the user for the next action using the looping question
    const { actionPoint } = await getAnswers(loopingQuestion);

    // Use conditional statements to execute the corresponding function based on the selected action
    if (actionPoint === "viewAllDepartments") {
      await viewAllDepartments(db);
    } else if (actionPoint === "viewAllRoles") {
      await viewAllRoles(db);
    } else if (actionPoint === "viewAllEmployees") {
      await viewAllEmployees(db);
    } else if (actionPoint === "addDepartment") {
      await addDepartment(db);
    } else if (actionPoint === "addRole") {
      await addRole(db);
    } else if (actionPoint === "addAnEmployee") {
      await addAnEmployee(db);
    } else if (actionPoint === "updateAnEmployeeRole") {
      await updateAnEmployeeRole(db);
    } else if (actionPoint === "updateEmployeeManagers") {
      await updateEmployeeManagers(db);
    } else if (actionPoint === "viewEmployeesByManager") {
      await viewEmployeesByManager(db);
    } else if (actionPoint === "viewEmployeesByDepartment") {
      await viewEmployeesByDepartment(db);
    } else if (actionPoint === "deleteDepartment") {
      await deleteDepartment(db);
    } else if (actionPoint === "deleteRole") {
      await deleteRole(db);
    } else if (actionPoint === "deleteEmployee") {
      await deleteEmployee(db);
    } else if (actionPoint === "viewUtilizedBudget") {
      await viewUtilizedBudget(db);
    } else {
// Set the status to false to exit the while loop
      status = false; 
// End the database connection
      await db.end(); 
    }
  }
};

// Call the init function to start the application
init(); 
