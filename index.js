const inquirer = require('inquirer');
const fs = require('fs');
const generateHTML = require('./src/generateHTML');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

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
            // validate: idInput => {
            //     const goodId = String(idInput).match(/^[1-9]\d*$/)
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

        console.log(manager);
        rosterArray.push(manager);
    })

};

function menu() {
    return inquirer.prompt ([
        {
            type: 'list',
            name:'role',
            message: "Please select Employee's role",
            choices: [
                // "None - I'm finished building my team", // need a way to exit prompt if none is selected
                'Engineer',
                'Intern',
            ]
        }
    ])
    .then((answers) => {
        //switch case to direct user to the appropriate function
        switch (answers.role) {
            case 'Engineer':
                console.log('testing output');
                addEngineer();
                break;
            case 'Intern':
                addIntern();
                break;
            // case "None - I'm finished building my team":
            //     break;
        }
    
    })
}

function addEngineer () {
        return inquirer.prompt ([
            {
                type: 'input',
                name: 'engineerName',
                message: "What is the Engineer's Name? (Required)",  
                validate: engineerInput => {
                    if (engineerInput) {
                        return true;
                    } else {
                        console.log("Please enter the Engineer's Name");
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'id',
                message: "Please enter the Engineer's ID",  // validation does not work - get's stuck on NaN
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
                message: "Please enter the Engineer's Email Address",
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
                message: "What is the Engineer's GitHub username?",  
                validate: githubInput => {
                    if (githubInput) {
                        return true;
                    } else {
                        console.log("Please enter a valid username")
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
        .then(engineerData => {
            const { engineerName, id, email, github, addEmployee } = engineerData;
            const engineer = new Engineer (engineerName, id, email, github);
    
            rosterArray.push(engineer);

            if (addEmployee) {
                return menu(rosterArray); //Do I pass something in here?
            } else {
                console.log(rosterArray);
                return rosterArray;
            }
        })
    
    };
    

    const addIntern = () => {
        return inquirer.prompt ([
            {
                type: 'input',
                name: 'internName',
                message: "What is the Intern's Name? (Required)",  
                validate: internInput => {
                    if (internInput) {
                        return true;
                    } else {
                        console.log("Please enter the Intern's Name");
                        return false;
                    }
                }
            },
            {
                type: 'number',
                name: 'id',
                message: "Please enter the Intern's ID",  // validation does not work - get's stuck on NaN
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
                message: "Please enter the Intern's Email Address",
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
                name: 'school',
                message: "What is the Intern's school?",  
                validate: schoolInput => {
                    if (schoolInput) {
                        return true;
                    } else {
                        console.log("Please enter a school name")
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
        .then(internData => {
            const { internName, id, email, school, addEmployee } = internData;
            const intern = new Intern (internName, id, email, school);
    
            rosterArray.push(intern);

            if (addEmployee) {
                return menu(rosterArray);
            } else {
                return rosterArray;
            }
        })
    
    };

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
    .then(menu)
    .then(rosterArray => {
        console.log(rosterArray);
        return generateHTML(rosterArray);
    })
    .then(resultHTML => {
        return writeFile(resultHTML);
    })
    .catch(err => {
        console.log(err);
    });