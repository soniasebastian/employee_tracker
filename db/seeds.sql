INSERT INTO departments (name)
VALUES  ("Computer Engineering"),
        ("Information Technology"),
        ("Electrical Engineering"),
        ("Chemical Engineering");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Software Manager", 100000, 1),
        ("Full Stack Webdeveloper", 80000, 1),
        ("Junior Webdeveloper", 70000, 1),
        ("Senior Software Lead Engineer", 150000, 2),
        ("Junior Software Engineer", 120000, 2),
        ("Entry level Software Intern", 60000, 2),
        ("Electrical Section Manager", 160000, 3),
        ("Electrical Engineer", 125000, 3),
        ("Electrical Technician", 80000, 3),
        ("Senior Chemical Engineer", 250000, 4),
        ("Junior Chemical Engineer", 180000, 4),
        ("Chemical Apprentice", 60000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Milan", "Daniel", 1, null),
        ("Henry", "Paul", 2, 1),
        ("Joshua", "Rodriguez", 3, null),
        ("Alan", "Tupik", 4, 3),
        ("Elizabeth", "Mathew", 5, null),
        ("Malia", "Thomas", 6, 5),
        ("Sarah", "Jeevan", 7, null),
        ("Renu", "Abraham", 8, 7),
        ("Irene", "Rose", 9, null),
        ("Vibin", "Issac", 10, 9),
        ("Lijo", "Varghese", 11, null),
        ("Aaron", "Jerin", 12, 11);

        


