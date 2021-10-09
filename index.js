const inquirer =require('inquirer');
const prompt = require('./src/prompt');
const db = require('./db/connection');

//views all the departments
function viewDepartments() {
    const mysql = `SELECT * FROM departments`;

    db.query(mysql, (err, rows) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
    });
}

//views all the roles
function viewRoles() {
    const mysql = `SELECT * FROM roles`;

    db.query(mysql, (err, rows) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
    });
}

function viewEmployees () {
    const mysql = `SELECT * FROM employees`;

    db.query(mysql, (err, rows) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
    });
}

function addNewDepartment(name) {
    const mysql = `INSERT INTO departments (name)
        VALUES (?)`
    
        db.query(mysql, name, (err, rows) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.log(rows);
    });
}

function addNewRole(title, salary, departmentId){
    const mysql = `INSERT INTO roles (title, salary, departments_id)
        VALUES (?, ?, ?)`

    const params = [title, salary, departmentId];

        db.query(mysql, params, (err, rows) => {
            if(err) {
                console.log(err.message);
                return;
            }
            console.log(rows);
        });
}

function addNewEmployee(firstName, lastName, rolesId, managerId){
    const mysql = `INSERT INTO employees (first_name, last_name, roles_id, manager_id)
        VALUES (?, ?, ?, ?)`
    
    const params = [firstName, lastName, rolesId, managerId];

    db.query(mysql, params, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log (rows);
    });
}

//runs the prompt
// const questionuser = function(){ 
//     inquirer.prompt(prompt).then(data=> {
//         if (data.option !== 'Finish'){
//             questionuser();
//         } else {
//             console.log(data);
//         }
//     })
// };

// questionuser();