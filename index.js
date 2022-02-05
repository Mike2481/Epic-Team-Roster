const inquirer = require('inquirer');
const fs = require('fs');
const createHTML = require('./src/generateHTML');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const path = require('path');

const rosterArray = [];

const managerInput = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: "What is your Team Manager's Name? (Required)",  
            validate: managerInput => {
                if (managerInput) {
                    return true;
                } else {
                    console.log("Please enter your Team Manager's Name");
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'id',
            message: "Please enter your Team Manager's ID", 
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log("Please provide a valid ID");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter your Team Manager's Email Address",
            validate: function (email) {
    
                valid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email)
                // this was found by googling how to validate inquirer email - Regex mail check

                if (valid) {
                    return true;
                } else {
                    console.log("Please enter a valid email address")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is your Manager's office number?",  // returns a string and not a number

            validate: officeInput => {
                if (officeInput) {
                    return true;
                } else {
                    console.log("Please enter a valid office number")
                }
            }
        }

    ])

    .then(managerData => {
        const { name, id, email, officeNumber } = managerData;
        const manager = new Manager (name, id, email, officeNumber);

        rosterArray.push(manager);
    })    
};

const employeeQuestions = () => {
    return inquirer.prompt ([

        {
            type: 'list',
            name:'role',
            message: "Please select Employee's role",
            choices: [
                'Engineer',
                'Intern',
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: "What's the employees name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please provide the name');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'id',
            message: "Please enter the employee's ID",  // validation does not work - get's stuck on NaN
            // validate: idInput => {
            //     const goodId = idInput.match('/^[1-9]\d*$/')
            //     if (goodId) {
            //         return true;
            //     } else {
            //         console.log("Please enter valid ID");
            //         return false;
            //     }
            // }
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log("Please provide a valid ID");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the employee's Email Address",
            validate: function (email) {
    
                valid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email)
                // this was found by googling how to validate inquirer email - Regex mail check

                if (valid) {
                    return true;
                } else {
                    console.log("Please enter a valid email address")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the Engineer's github username?",
            when: (input) => input.role === 'Engineer',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please provide a github username');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "What is the Intern's school",
            when: (input) => input.role === 'Intern',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please provide a valid school');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'addEmployee',
            message: 'Would you like to add another Employee?',
            default: false
        }

    ])
    .then(employeeData => {
        const { name, id, email, role, github, school, addEmployee } = employeeData;

        let employee;
        if (role === 'Engineer') {
            employee = new Engineer (name, id, email, github);
        } else if (role === 'Intern') {
            employee = new Intern (name, id, email, school);
        }

        rosterArray.push(employee);

        if (addEmployee) {
            return employeeQuestions(rosterArray);
        } else {
            return rosterArray;
        }
    })    
};
//  rosterArray returns all data


const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('The Epic Team Roster Has Been Created!')
        }
    })
};


managerInput()
    .then(employeeQuestions)
    .then(rosterArray => {
        return createHTML(rosterArray);
    })
    .then(resultHTML => {
        return writeFile(resultHTML);
    })
    .catch(err => {
        console.log(err);
    });