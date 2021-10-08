INSERT INTO departments (name)
VALUES
    ('Software Developers'),
    ('Sales'),
    ('Warehouse');

INSERT INTO roles (title, salary, departments_id)
VALUES
    ('Manager', 110000.00, 1),
    ('Developer', 80000.00, 1),
    ('Salesman', 76000.00, 2),
    ('Worker', 40000, 3);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES
    ('Dave', 'Trumbo', 1, null),
    ('Bob', 'Smith', 2, 1),
    ('Lindsey', 'Peck', 3, 1),
    ('Zach', 'Muff', 1, null),
    ('Bill', 'Thomason', 4, 4),
    ('Gordon', 'Ramsey', 2, 1),
    ('Liz', 'Abeth', 3, 1),
    ('Jamal', 'Wright', 4, 4);