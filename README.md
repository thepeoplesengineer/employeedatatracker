# Employee Tracker

## Description

Employee Tracker is a command-line interface (CLI) application designed to manage a company's employee database. This tool allows business owners or managers to easily view and interact with information related to departments, roles, and employees within the company. The application is built using Node.js, Inquirer, and PostgreSQL.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)
- [Questions](#questions)

## Installation

1. **Clone the Repository:**

   git clone https://github.com/your-username/employee-tracker.git
   cd employee-tracker
2. **Install Dependency:**

    Ensure you have node.js -> npm install
3. **Set Up PostgreSQL database**
4. **Create .ENV variables**

DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=employees_db
DB_HOST=localhost
DB_PORT=5432

## Features

View All Employees: Displays a formatted table of employee information, including IDs, names, roles, departments, salaries, and managers.

Add Employee: Prompts for the employee’s first name, last name, role, and manager to add a new employee to the database.

Update Employee Role: Allows updating an employee’s role by selecting the employee and the new role.

View All Roles: Shows job titles, role IDs, associated departments, and salaries.

Add Role: Prompts for the role title, salary, and department to add a new role to the database.

View All Departments: Displays department names and IDs.

Add Department: Prompts for a department name to add a new department to the database.

The database schema consists of three tables:

Department Table:

id: SERIAL PRIMARY KEY
name: VARCHAR(30) UNIQUE NOT NULL
Role Table:

id: SERIAL PRIMARY KEY
title: VARCHAR(30) UNIQUE NOT NULL
salary: DECIMAL NOT NULL
department_id: INTEGER NOT NULL (Foreign key referencing Department)
Employee Table:

id: SERIAL PRIMARY KEY
first_name: VARCHAR(30) NOT NULL
last_name: VARCHAR(30) NOT NULL
role_id: INTEGER NOT NULL (Foreign key referencing Role)
manager_id: INTEGER (Foreign key referencing Employee, allows for NULL if no manager)

## Walkthrough Video

## License

This project is licensed under the MIT License. See the LICENSE file for details.

