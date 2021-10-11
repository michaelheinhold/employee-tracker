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
    const mysql = `SELECT employees.id AS employee_id, first_name, last_name, name AS department, manager_id AS reports_to, title, salary FROM employees, roles, departments 
    WHERE roles.id = employees.roles_id AND departments.id = roles.departments_id;`;

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
    });
}

function addNewRole(title, salary, departmentName){
  let departmentId;
  db.query(`SELECT id FROM departments WHERE TRIM(name) = TRIM(?)`, departmentName, (err, res)=>{
    departmentId = (res[0].id);
  });

    const mysql = `INSERT INTO roles (title, salary, departments_id)
        VALUES (?, ?, ?)`

    setTimeout(()=>{
      const params = [title, salary, departmentId];

        db.query(mysql, params, (err, rows) => {
            if(err) {
                console.log(err.message);
                return;
            }
        });
    }, 100)
      
}

function addNewEmployee(firstName, lastName, rolesName, managerName){
  let rolesId;
  let managerId;
    db.query(`SELECT id FROM roles WHERE TRIM(title) = TRIM(?)`, rolesName, (err, res)=>{
      rolesId = (res[0].id);
    });
    if(managerName === 'Is a manager'){
      managerId = null;
    } else{
      db.query(`SELECT id FROM employees WHERE TRIM(first_name) = TRIM(?)`, managerName, (err, res)=>{
        managerId = (res[0].id);
      });
    }
    const mysql = `INSERT INTO employees (first_name, last_name, roles_id, manager_id)
        VALUES (?, ?, ?, ?)`

    setTimeout(()=>{
      const params = [firstName, lastName, rolesId, managerId];
      db.query(mysql, params, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
    })
  }, 100);
}

function updateEmployeeRole(newRoleName, employeeName) {
  let newRoleId;
  let employeeId;

  db.query(`SELECT id FROM roles WHERE TRIM(title) = TRIM(?)`, newRoleName, (err, res)=>{
    newRoleId = (res[0].id);
  });
  db.query(`SELECT id FROM employees WHERE TRIM(first_name) = TRIM(?)`, employeeName, (err, res)=>{
    employeeId = (res[0].id);
  });

    const mysql = `UPDATE employees SET roles_id = ?
        WHERE id = ?`
    
    setTimeout(()=>{
      const params = [newRoleId, employeeId];

      db.query(mysql, params, (err, result) => {
          if (err) {
              console.log(err.message);
              return;
          } else if (!result.affectedRows){
              console.log(`Employee not found`)
          }
      });
    }, 100);
      
  }



//runs the prompt
async function questionUser(){ 
    inquirer.prompt(prompt).then(data=> {
        switch (data.option){
            case 'Finish':
                console.log('Goodbye.');
                break;
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
              viewRoles();
                break;
            case 'View all employees':
              viewEmployees();
                break;
            case 'Add a department':
                addNewDepartment(data.name);
                break;
            case 'Add a role':
                addNewRole(data.title, data.salary, data.departmentId);
                break;
            case 'Add an employee':
                addNewEmployee(data.firstName, data.lastName, data.roleId, data.managerId);
                break;
            case 'Update an employee role':
                updateEmployeeRole(data.newRoleId, data.employeeId);
                break;
        }
        if(data.option !== 'Finish'){
            setTimeout(() => {
                questionUser();
            }, 1000);
        }
    })
};

questionUser();
