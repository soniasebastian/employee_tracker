# employee_tracker [![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)](https://www.ecma-international.org/ecma-262/)
[![Node.js](https://img.shields.io/badge/Node.js-18.16.1-brightgreen.svg)](https://nodejs.org/)
[![Inquirer.js](https://img.shields.io/badge/Inquirer.js-FF6C37?style=for-the-badge&logo=Inquirer.js&logoColor=white)](https://github.com/SBoudrias/Inquirer.js)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) 
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
[![console.table](https://img.shields.io/badge/console.table-000000?style=for-the-badge&logo=console.table&logoColor=white)](https://github.com/bahmutov/console.table)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Description
The Employee Tracker application is a command-line tool designed to assist business owners in managing and organizing departments, roles, and employees within their company. The application allows users to perform various actions such as viewing, adding, updating, and deleting department, role, and employee information.

## Table of contents
- [License](#License)
- [Installation](#Installation)
- [Usage](#Usage)
- [Screenshots](#Screenshots)
- [Contribution](#Contribution)
- [Test](Test) 
- [Questions](#Questions)

  ## License 
This application is licensed under MIT License
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation:
* Clone the repository to your local machine.
* Install the necessary dependencies (inquirer, mysql2, console.table and asciiart-logo) by running npm install in the application's root directory.
* Set up a MySQL database by executing the provided schema and seed files.
* Update the MySQL connection configuration with our own database credentials(username and password).

## Usage
* Run source.schema.sql, source seeds.sql, source query.sql and then "node server.js" or npm start from the open integrated terminal.
* Follow the on-screen prompts to navigate through the application and perform desired actions.

## User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```
## Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```
<br>

## Bonus Criteria
 Add some additional functionality to your application, such as the ability to do the following:
* Update employee managers.
* View employees by manager.
* View employees by department.
* Delete departments, roles, and employees.
* View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.

## Screenshots




## Links
The URL of the functional deployed application (https://soniasebastian.github.io/employee-tracker/)

## Contribution:
   Contributions are most welcome such as bug fixes, feature enhancements, documentation improvements and code optimization.

## Tests: 
     No tests are performed in this project as of now.

## Questions :
  View my [GitHub](https://github.com/soniasebastian) profile

  Email me at soniasebastian011@gmail.com for any queries.

  

© 2023 Sonia Sebastian Moothedan Confidential and Proprietary. All Rights Reserved.
