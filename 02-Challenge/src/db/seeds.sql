-- Connect to the database
-- CHANGE DB NAME HERE TO MATCH YOURS:
\c employees_db; 

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);

-- Insert data into the department table
INSERT INTO department (name) VALUES
('Engineering'),
('Human Resources'),
('Guest Experience'),
('Sales'),
('Accounting');

-- Insert data into the role table
INSERT INTO role (title, salary, department) VALUES
('Civil Engineer', 85000, 1),
('HR Manager', 60000, 2),
('Service Specialist', 55000, 3),
('Sales Representative', 50000, 4),
('Engineering Manager', 95000, 1);

-- Insert data into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Smith', 1, 5),
('Bob', 'Johnson', 2, NULL),
('Charlie', 'Lee', 3, NULL),
('Diana', 'Brown', 4, NULL),
('Eve', 'White', 5, NULL),
('Frank', 'Green', 1, 5),
('Grace', 'Black', 1, 5);

-- Update manager_id to reflect relationships in the employee table
UPDATE employee SET manager_id = 5 WHERE id = 1;  -- Alice reports to Eve
UPDATE employee SET manager_id = 5 WHERE id = 6;  -- Frank reports to Eve
UPDATE employee SET manager_id = 5 WHERE id = 7;  -- Grace reports to Eve
