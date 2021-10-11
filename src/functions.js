const inquirer =require('inquirer');
const prompt = require('./prompt');
const db = require('../db/connection');

class F {
    getDepartmentNames() {
        let departmentsNames =[];
        db.query(`SELECT name FROM departments`, function(err, rows) {
            rows.forEach(e=>{
                departmentsNames.push(e.name);
            })
        });
        setTimeout(()=> {
            return departmentsNames
        }, 100);
    }
}


module.exports = F;