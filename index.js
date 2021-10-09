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
        console.log(rows);
    });
}
viewDepartments();

//views all the roles
function viewRoles() {
    const mysql = `SELECT * FROM roles`;

    db.query(mysql, (err, rows) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.log(rows);
    });
}
viewRoles();

function viewEmployees () {
    const mysql = `SELECT * FROM employees`;

    db.query(mysql, (err, rows) => {
        if(err) {
            console.log(err.message);
            return;
        }
        console.log(rows);
    });
}
viewEmployees();

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