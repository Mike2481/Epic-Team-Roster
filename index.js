const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require('./src/generateHTML');

const Manager = require('./lib/Manager');
const Employee = require('./lib/Employee');

const path = require('path');

const rosterArray = [];

const managerInput = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'managerName',
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
            message: "Please enter your Team Manager's ID",  // validation does not work - get's stuck on NaN
            validate: idInput => {
                if (!idInput) {
                    console.log('Please enter a valid ID');
                    return false;
                } else {
                    return true;
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
            name: 'office',
            message: "What is your Manager's office number?",  
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
        const { managerName, id, email, office } = managerData;
        const manager = new Manager (managerName, id, email, office);

        rosterArray.push(manager);
        console.log(manager);
    })

};

const employeeInput = () => {

    return inquirer.prompt ([
        {
            type: 'list',
            name:'role',
            message: "Please select Employee's role",
            choices: [
                "None - I'm finished building my team", // need a way to exit prompt if none is selected
                'Engineer',
                'Intern',
            ]
        },
        {
            type: 'input',
            name: 'employeeName',
            message: "What is the Employee's name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the Employee's name");
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'employeeId',
            message: "What is the Employee's ID number?",
            validate: employeeIdInput => {
                if (employeeIdInput) {
                    return true;
                } else {
                    console.log("Please provide a valid ID number");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'employeeEmail',
            message: "What is the Employee's email address?",
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
        }
        // Need to add question(s) that are dependant on Engineer being selected
        // Need to add question(s) that are dependant on Intern being selected

    ])
    .then(employeeData => {
        const { employeeName, employeeId, employeeEmail } = employeeData;
        const employee = new Employee (employeeName, employeeId, employeeEmail); // need to pass in Engineer and/or Intern data too

        rosterArray.push(employee);
        console.log(employee);
    })

}

// function writeToFile(fileName, data) {
//     return fs.writeFileSync(path.join(process.cwd(), fileName), data)
// }

// function init() {
//     inquirer.prompt(managerInput, employeeInput)
//         .then((returnedData) => {
//             writeToFile('createdIndex.html', generateHTML({...returnedData}))
//         })
// }
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
    .then(employeeInput)
    // .then(rosterArray => {
    //     return generateHTML(rosterArray);
    // })
    // .then(resultHTML => {
    //     return writeFile(resultHTML);
    // })
    .catch(err => {
        console.log(err);
    });