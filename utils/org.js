const inquirer = require("inquirer");
const mysql = require("mysql2/promise");

// Function to view all departments
const viewAllDepartments = async (db) => {
  const [departments] = await db.query("SELECT * FROM departments");
  console.table(departments);
};

// Function to view all roles
const viewAllRoles = async (db) => {
  const [roles] = await db.query(`
    SELECT roles.id, roles.title AS 'Role', roles.salary AS 'Salary', 
    departments.name AS 'Department'
    FROM roles 
    LEFT JOIN departments ON roles.department_id = departments.id
  `);
  console.table(roles);
};

// Function to view all employees
const viewAllEmployees = async (db) => {
  const [employees] = await db.query(`
    SELECT emp.id, emp.first_name AS 'First Name', 
    emp.last_name AS 'Last Name', roles.title AS 'Role', roles.salary AS 'Salary', 
    departments.name AS 'Department', 
    CONCAT(empManager.first_name, " ", empManager.last_name) AS 'Manager' 
    FROM employees emp
    LEFT JOIN roles ON emp.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees empManager ON emp.manager_id = empManager.id
  `);
  console.table(employees);
};

// Function to add a department
const addDepartment = async (db) => {
  const addDepartmentName = [
    {
      type: "input",
      message: "What is the name of the department?",
      name: "name",
    },
  ];
  const { name } = await inquirer.prompt(addDepartmentName);
  await db.query(`INSERT INTO departments (name) VALUES (?)`, [name]);
  console.log(`New department '${name}' added successfully.`);
};

// Function to add a role
const addRole = async (db) => {
  const [departments] = await db.query("SELECT * FROM departments");
  const departmentChoices = departments.map((department) => ({
    name: department.name,
    value: department.id,
  }));

  const roleQuestions = [
    {
      type: "input",
      message: "What is the name of the role?",
      name: "title",
    },
    {
      type: "input",
      message: "What is the salary of this role?",
      name: "salary",
    },
    {
      type: "list",
      message: "Which department does this role belong to?",
      name: "department_id",
      choices: departmentChoices,
    },
  ];

  const { title, salary, department_id } = await inquirer.prompt(roleQuestions);
  await db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department_id]);
  console.log(`New role '${title}' added successfully.`);
};

// Function to add an employee
const addAnEmployee = async (db) => {
  const [roles] = await db.query("SELECT * FROM roles");
  const roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const [employees] = await db.query("SELECT * FROM employees");
  const managerChoices = employees.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  const employeeQuestions = [
    {
      type: "input",
      message: "Please enter the first name of the employee:",
      name: "first_name",
    },
    {
      type: "input",
      message: "Please enter the last name of the employee:",
      name: "last_name",
    },
    {
      type: "list",
      message: "Please select the role of the employee:",
      name: "role_id",
      choices: roleChoices,
    },
    {
      type: "list",
      message: "Please select the employee's manager:",
      name: "manager_id",
      choices: managerChoices,
    },
  ];

  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt(employeeQuestions);
  await db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [first_name, last_name, role_id, manager_id]);
  console.log(`New employee '${first_name} ${last_name}' added successfully.`);
};
//function to updatean employee role
const updateAnEmployeeRole = async (db) => {
  const [employees] = await db.query("SELECT * FROM employees");
  const employeeChoices = employees.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  const [roles] = await db.query("SELECT * FROM roles");
  const roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const updateRoleQuestions = [
    {
      type: "list",
      name: "employee",
      message: "Select an employee to update their role:",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "role",
      message: "Select a new role for the employee:",
      choices: roleChoices,
    },
  ];

  const { employee, role } = await inquirer.prompt(updateRoleQuestions);
  await db.query("UPDATE employees SET role_id = ? WHERE id = ?", [role, employee]);
  console.log("Employee role updated successfully!");
};


// Function to update employee managers
const updateEmployeeManagers = async (db) => {
  const [employees] = await db.query("SELECT * FROM employees");
  const employeeChoices = employees.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  const employeeManagerQuestions = [
    {
      type: "list",
      name: "employee",
      message: "Select an employee to update their manager:",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "manager",
      message: "Select a new manager for the employee:",
      choices: employeeChoices,
    },
  ];

  const { employee, manager } = await inquirer.prompt(employeeManagerQuestions);
  await db.query(`UPDATE employees SET manager_id = ? WHERE id = ?`, [manager, employee]);
  console.log("Employee manager updated successfully!");
};

// Function to view employees by manager
const viewEmployeesByManager = async (db) => {
  const [managers] = await db.query("SELECT * FROM employees WHERE manager_id IS NULL");
  const managerChoices = managers.map((manager) => ({
    name: `${manager.first_name} ${manager.last_name}`,
    value: manager.id,
  }));

  const managerQuestion = [
    {
      type: "list",
      name: "manager",
      message: "Select a manager to view their employees:",
      choices: managerChoices,
    },
  ];

  const { manager } = await inquirer.prompt(managerQuestion);
  const [employees] = await db.query(`SELECT * FROM employees WHERE manager_id = ?`, [manager]);
  console.log("Employees under the selected manager:");
  console.table(employees);
};

// Function to view employees by department
const viewEmployeesByDepartment = async (db) => {
  const [departments] = await db.query("SELECT * FROM departments");
  const departmentChoices = departments.map((department) => ({
    name: department.name,
    value: department.name,
  }));

  const departmentQuestion = [
    {
      type: "list",
      name: "department",
      message: "Select a department to view its employees:",
      choices: departmentChoices,
    },
  ];

  const { department } = await inquirer.prompt(departmentQuestion);

  const [employees] = await db.query(
    `SELECT emp.id, emp.first_name AS 'First Name', 
    emp.last_name AS 'Last Name', roles.title AS 'Role', roles.salary AS 'Salary', 
    departments.name AS 'Department', 
    CONCAT(empManager.first_name, " ", empManager.last_name) AS 'Manager' 
    FROM employees emp
    LEFT JOIN roles ON emp.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees empManager ON emp.manager_id = empManager.id
    WHERE departments.name = ?`,
    [department]
  );

  console.log("Employees listed by department:");
  console.table(employees);
};

// Function to delete a department
const deleteDepartment = async (db) => {
  const [departments] = await db.query("SELECT * FROM departments");
  const departmentChoices = departments.map((department) => ({
    name: department.name,
    value: department.id,
  }));

  const departmentQuestion = [
    {
      type: "list",
      name: "department",
      message: "Select a department to delete:",
      choices: departmentChoices,
    },
  ];

  const { department } = await inquirer.prompt(departmentQuestion);
  await db.query("DELETE FROM departments WHERE id = ?", [department]);
  console.log("Department deleted successfully!");
};

// Function to delete a role
const deleteRole = async (db) => {
  const [roles] = await db.query("SELECT * FROM roles");
  const roleChoices = roles.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const roleQuestion = [
    {
      type: "list",
      name: "role",
      message: "Select a role to delete:",
      choices: roleChoices,
    },
  ];

  const { role } = await inquirer.prompt(roleQuestion);
  await db.query("DELETE FROM roles WHERE id = ?", [role]);
  console.log("Role deleted successfully!");
};

// Function to delete an employee
const deleteEmployee = async (db) => {
  const [employees] = await db.query("SELECT * FROM employees");
  const employeeChoices = employees.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  const employeeQuestion = [
    {
      type: "list",
      name: "employee",
      message: "Select an employee to delete:",
      choices: employeeChoices,
    },
  ];

  const { employee } = await inquirer.prompt(employeeQuestion);
  await db.query("DELETE FROM employees WHERE id = ?", [employee]);
  console.log("Employee deleted successfully!");
};

// Function to view the total utilized budget of a department
const viewUtilizedBudget = async (db) => {
  const [departments] = await db.query("SELECT * FROM departments");
  const departmentChoices = departments.map((department) => ({
    name: department.name,
    value: department.id,
  }));

  const departmentQuestion = [
    {
      type: "list",
      name: "department",
      message: "Select a department to view the total utilized budget:",
      choices: departmentChoices,
    },
  ];

  const { department } = await inquirer.prompt(departmentQuestion);

  const [results] = await db.query(
    `
    SELECT departments.name AS department_name, IFNULL(SUM(roles.salary), 0) AS total_budget
    FROM employees
    INNER JOIN roles ON employees.role_id = roles.id
    INNER JOIN departments ON roles.department_id = departments.id
    WHERE departments.id = ?
    GROUP BY departments.name
    `,
    [department]
  );
  
  const totalBudget = results.length ? results[0].total_budget : 0;

  console.log(
    `Total utilized budget of the ${results[0].department_name} department: $${totalBudget}`
  );
};

module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
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
};

