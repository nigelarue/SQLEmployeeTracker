 use employees_db;

INSERT INTO department 
    (name) 
VALUES 
    ('Accounting'), 
    ('Production'), 
    ('Payroll'), 
    ('Sales'), 
    ('Marketing');

INSERT INTO role 
    (title, salary, department_id) 
VALUES 
    ('Senior Accountant', 84090, 1),
    ('Accountant I', 64153, 1),
    ('Technician', 42458, 2),
    ('Scheduler', 93524, 2),
    ('Practitioner I', 67178, 3),
    ('Practitioner II', 71245, 3),
    ('Account Executive', 91382, 4),
    ('Senior Sales Executive', 98780, 4),
    ('Marketing Analyst', 64848, 4),
    ('Content Strategist', 66259, 4);

INSERT INTO employee 
    (last_name, first_name, role_id, manager_id) 
VALUES 
    ('Smith', 'Kevin', 1, NULL),
    ('Clark', 'Sarah', 2, 1),
    ('Vas Neemah', 'Tali Zorah', 3, NULL),
    ('Star', 'Patrick', 4, 3),
    ('Gonzalez', 'Alejandro', 5, NULL),
    ('Shepard', 'Jane', 6, 5),
    ('Vakarian', 'Garrus', 7, NULL),
    ('Reigen', 'Arataka', 8, 7);