const db = require('../db/connection');

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
        name: 'departmentName',
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
        type: 'list',
        when: ({ option }) => option === 'Add a role',
        name: 'departmentId',
        message: 'What department is this role under?',
        choices: () => {
            let departmentsNames = [];
            db.query(`SELECT name FROM departments`, function (err, rows) {
                rows.forEach(e => {
                    departmentsNames.push(e.name);
                });
            });
            setTimeout(() => {
                console.log(departmentsNames);
                return departmentsNames;
            }, 100);
        }
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
        type: 'list',
        when: ({ option }) => option === 'Add an employee',
        name: 'roleId',
        message: `What is the employee's role?`,
        choices: []
    },
    {
        type: 'list',
        when: ({ option }) => option === 'Add an employee',
        name: 'managerId',
        message: `What manager does this employee work under?`,
        choices: []
    },
    {
        type: 'list',
        when: ({ option }) => option === 'Update an employee role',
        name: 'employeeId',
        message: 'For which employee would you like to update their role?',
        choices: []
    },
    {
        type: 'list',
        when: ({ option }) => option === 'Update an employee role',
        name: 'newRoleId',
        message: 'What is their new role?',
        choices: []
    }
];

module.exports = prompt;
