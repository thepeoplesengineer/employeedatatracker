import inquirer from "inquirer";
import {pool} from "./db/connection.js";

function app(): void {
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ]
    }).then(({ action }) => {
        switch (action) {
            case "View All Employees":
                viewAllEmployees();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Update Employee Role":
                updateEmployeeRole();
                break;

            case "Add Role":
                addRole();
                break;

            case "View All Roles":
                viewAllRoles();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "View All Departments":
                viewAllDepartments();
                break;
            case "Quit":
                pool.end();
                break;
            default:
                console.log("Invalid Option");
                break;

        }
    });

}

async function viewAllEmployees(): Promise<void> {
      const sql = "SELECT employee.id, employee.first_name AS \"first name\", employee.last_name AS \"last name\", role.title, department.name AS department, role.salary, manager.first_name || ' ' || manager.last_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id";
    const employees = await pool.query(sql);
    console.table(employees.rows);
    app()
}

async function viewAllDepartments(): Promise<void> {
    const sql = "SELECT * FROM department";
    const departments = await pool.query(sql);
    console.table(departments.rows);
    app()
}

async function viewAllRoles(): Promise<void> {
    const sql = "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id";
    const roles = await pool.query(sql);
    console.table(roles.rows);
    app();
}

async function addEmployee(): Promise<void> {
    const roles = await pool.query("SELECT id as value, title as name FROM role");
    const employees = await pool.query("SELECT id as value, first_name || '' || last_name as name FROM employee");
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role_id",
            message: "Select the employee's role.",
            choices: roles.rows
        },
        {
            type: "list",
            name: "manager_id",
            message: "Select the employee's manager",
            choices: employees.rows
        }
    ]).then(async ({ first_name, last_name, role_id, manager_id }) => {
        await pool.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [first_name, last_name, role_id, manager_id]);

        console.log("Employee added!");
        app();
    });
}




async function updateEmployeeRole(): Promise<void> {
    const roles = await pool.query("SELECT id as value, title as name FROM role");
    const employees = await pool.query("SELECT id as value, first_name || '' || last_name as name FROM employee");
    inquirer.prompt([
        {
            type: "list",
            name: "employee_id",
            message: "Select the employee.",
            choices: employees.rows
        },
        {
            type: "list",
            name: "role_id",
            message: "Select the employee's new role.",
            choices: roles.rows
        }
    ]).then(async ({ employee_id, role_id }) => {
        await pool.query("UPDATE employee SET role_id = $1 WHERE id = $2", [role_id, employee_id]);
        console.log('Employee role updated!');
        app();
    });
};

async function addRole(): Promise<void> {
    const departments = await pool.query("SELECT id as value, name as name FROM department");
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the role title."

        },
        {
            type: "input",
            name: "salary",
            message: "Enter the role salary."

        },
        {
            type: "list",
            name: "department_id",
            message: "Select department.",
            choices: departments.rows

        }
    ]).then(async ({ title, salary, department_id }) => {
        await pool.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, department_id]);
        console.log("Role added!");
        app();
    });

};

async function addDepartment(): Promise<void> {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the department name"
        }
    ]).then(async ({ name }) => {
        await pool.query("INSERT INTO department (name) VALUES ($1)", [name]);
        console.log("Department added");
        app();
    });
};

app();