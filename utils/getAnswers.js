const inquirer = require("inquirer");

// Function to prompt user with questions and retrieve their answers
const getAnswers = async (questions) => {
// Using inquirer.prompt() to display questions and wait for user responses
  return await inquirer.prompt(questions); 
};


// Exporting the function to be used in org.js
module.exports = getAnswers; 
