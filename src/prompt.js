const db = require('../db/connection');

//options for departments
departmentsArr =[];
function selectDepartment() {
    db.query("SELECT * FROM departments", function(err, res){
        if(err) throw err;
        for(var i = 0; i< res.length; i++) {
            departmentsArr.push(res[i].name);
        }
    })
    return departmentsArr;
}

//options for roles
var roleArr = [];
function selectRole() {
    db.query("SELECT * FROM roles", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
}

//options for managers
var managersArr = ['Is a manager'];
function selectManager() {
    db.query("SELECT first_name, last_name FROM employees WHERE manager_id IS NULL", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
        managersArr.push(res[i].first_name);
        }
    })
    return managersArr;
}

//options for employee
var employeeArr = [];
function selectEmployee() {
    db.query("SELECT first_name, last_name FROM employees", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
        employeeArr.push(res[i].first_name);
        }
    })
    return employeeArr;
}

const prompt = [
    {
        //opening prompt
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Finish']
    },
    //prompt for adding a department
    {
        type: 'input',
        when: ({ option }) => option === 'Add a department',
        name: 'name',
        message: 'What is the name of the department?'
    },
    //prompts for adding a role
    {
        type: 'input',
        when: ({ option }) => option === 'Add a role',
        name: 'title',
        message: 'What is the name of the role?'
    },
    {
        type: 'number',
        when: ({ option }) => option === 'Add a role',
        name: 'salary',
        message: 'What is the salary for this role?'
    },
    {
        type: 'rawlist',
        when: ({ option }) => option === 'Add a role',
        name: 'departmentId',
        message: 'What department is this role under?',
        choices: selectDepartment()
    },
    {
        type: 'input',
        when: ({ option }) => option === 'Add an employee',
        name: 'firstName',
        message: `What is the employee's first name?`
    },
    {
        type: 'input',
        when: ({ option }) => option === 'Add an employee',
        name: 'lastName',
        message: `What is the employee's last name?`
    },
    {
        type: 'rawlist',
        when: ({ option }) => option === 'Add an employee',
        name: 'roleId',
        message: `What is the employee's role?`,
        choices: selectRole()
    },
    {
        type: 'rawlist',
        when: ({ option }) => option === 'Add an employee',
        name: 'managerId',
        message: `What manager does this employee work under?`,
        choices: selectManager()
    },
    {
        type: 'rawlist',
        when: ({ option }) => option === 'Update an employee role',
        name: 'employeeId',
        message: 'For which employee would you like to update their role?',
        choices: selectEmployee()
    },
    {
        type: 'rawlist',
        when: ({ option }) => option === 'Update an employee role',
        name: 'newRoleId',
        message: 'What is their new role?',
        choices: selectRole()
    }
];

module.exports = prompt;
