// need to use inquirer and fs
const inquirer = require('inquirer');
const fs = require('fs');
// bring in all data from generateHTML file
const createHTML = require('./src/generateHTML');
// bring in classes - employee isn't needed since it's used as super
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const path = require('path');
// empty array to store all results from inquirer prompts
const rosterArray = [];
// manager specific prompt that will run at start 
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
            type: 'input',
            name: 'id',
            message: "Please enter your Team Manager's ID", 
            // validation for number - this took forever to figure out
            validate: (answer) => {
                return (isNaN(answer)) ? console.log('please enter a number')
                : (answer == '') ? console.log('please enter a number')
                : true;
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
            // validation not made for number only since an office number
            // could be alphanumeric
            validate: officeInput => {
                if (officeInput) {
                    return true;
                } else {
                    console.log("Please enter a valid office number")
                }
            }
        }

    ])
    // takes results, creates a new manager using required manager.js
    // then adds that result to array
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
            // allows user to choose type of employee to add
            choices: [
                'Engineer',
                'Intern',
            ]
        },
        // name, id, and email are used for both
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
            type: 'input',
            name: 'id',
            message: "Please enter the employee's ID", 
            validate: (answer) => {
                return (isNaN(answer)) ? console.log('please enter a number')
                : (answer == '') ? console.log('please enter a number')
                : true;
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
        // if engineer was selected, this will call for github username
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
        // if intern was selected, this will call for school
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
        // allows user to add another employee, or exit this prompt
        {
            type: 'confirm',
            name: 'addEmployee',
            message: 'Would you like to add another Employee?',
            default: false
        }

    ])
    // gathers all data and creates employee bases off role selected
    .then(employeeData => {
        const { name, id, email, role, github, school, addEmployee } = employeeData;

        let employee;
        if (role === 'Engineer') {
            employee = new Engineer (name, id, email, github);
        } else if (role === 'Intern') {
            employee = new Intern (name, id, email, school);
        }
        // pushes the created employee to the array with manager
        rosterArray.push(employee);

        if (addEmployee) {
            // if user wants to add another employee, this starts
            // the prompt over but retains newly added data to array
            return employeeQuestions(rosterArray);
        } else {
            // once all employees are added, the array will be returned
            // so it can be used in the generateHTML.js file
            return rosterArray;
        }
    })    
};
//  rosterArray returns all data

// function takes the resulting data from generateHTML.js file to create
// the new index.html file
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

// async 
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