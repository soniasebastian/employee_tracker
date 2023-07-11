SELECT 
    emp.id, 
    CONCAT(emp.first_name, " ", emp.last_name) AS employees_name, 
    roles.title AS job_title, 
    roles.salary AS salary, 
    departments.name AS departments, 
    IFNULL(CONCAT(mans.first_name, " ", mans.last_name), "No Manager") AS manager
FROM 
    employees emp
    LEFT JOIN employees mans ON emp.manager_id = mans.id
    JOIN roles ON emp.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id
