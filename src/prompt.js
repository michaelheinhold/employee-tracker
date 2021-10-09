

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
        name: 'roleName',
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
        choices: () => ({ departmentName })
    }
];

module.exports = prompt;
