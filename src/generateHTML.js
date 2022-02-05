// function to generate manager card using data supplied by user
// mailto is used to make email pop up when link is clicked

const generateManager = managerArr => {
    return `
    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mt-4">
    <div class="card h-100 text-white bg-light border-primary rounded mb-3 shadow" >
        <div class="card-body bg-primary">
            <h3 class="card-title text-center"> ${managerArr.name} </h3>
            <h4 class="card-text text-center"><i class="fas fa-coffee"></i> Manager</h4>
        </div>
        <ul class="text-dark list-group list-group-flush text-black p-4">
            <li class="list-group-item">ID: ${managerArr.id}</li>
            <li class="list-group-item">Email: <a href="mailto:${managerArr.email}">Manager's Email</a></li> 
            <li class="list-group-item">Office Number: ${managerArr.officeNumber}</li>
        </ul>
    </div>
</div>
`;
};

// function to generate engineer card using data supplied by user
// github username is added into HTML to generate a link to the page


const generateEngineer = engineerArr => {
    return `
    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mt-4">
    <div class="card h-100 text-white bg-light border-primary rounded mb-3 shadow" >
        <div class="card-body bg-primary">
            <h3 class="card-title text-center"> ${engineerArr.name} </h3>
            <h4 class="card-text text-center"><i class="fas fa-glasses"></i> Engineer</h4>
        </div>
        <ul class="text-dark list-group list-group-flush text-black p-4">
            <li class="list-group-item">ID: ${engineerArr.id}</li>
            <li class="list-group-item">Email: <a href="mailto:${engineerArr.email}">Engineer's Email</a></li> 
            <li class="list-group-item">GitHub: <a href="https://github.com/${engineerArr.github}" target="_blank">${engineerArr.github}</a></li>
        </ul>
    </div>
</div>
    `;

};

// function to generate intern card using data supplied by user


const generateIntern = internArr => {
    return `
    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mt-4">
    <div class="card h-100 text-white bg-light border-primary rounded mb-3 shadow" >
        <div class="card-body bg-primary">
            <h3 class="card-title text-center"> ${internArr.name} </h3>
            <h4 class="card-text text-center"><i class="fas fa-graduation-cap"></i> Intern</h4>
        </div>
        <ul class="text-dark list-group list-group-flush text-black p-4">
            <li class="list-group-item">ID: ${internArr.id}</li>
            <li class="list-group-item">Email: <a href="mailto:${internArr.email}">Intern's Email</a></li> 
            <li class="list-group-item">School: ${internArr.school}</li>
        </ul>
    </div>
</div>
    `;

};

createHTML = (employeeData) => {
    // empty array to pass all the generated cards into
    createdCards = [];
    //  loops through each result from inquirer
    for (let i=0; i < employeeData.length; i++) {
        let employee = employeeData[i];
        let role = employee.getRole();
        // role determines which function is called and data from inquirer
        // is passed in
        if (role === 'Manager') {
            const managerCard = generateManager(employee);
            createdCards.push(managerCard);
        }
        if (role === 'Engineer') {
            const engineerCard = generateEngineer(employee);
            createdCards.push(engineerCard);
        }
        if (role === 'Intern') {
            const internCard = generateIntern(employee);
            createdCards.push(internCard);
        }

    }
    console.log(createdCards);
    // join all created cards to use in next function
    const rosterCards = createdCards.join('')
    // function to generate HTML gets all card data passed in 
    const teamRoster = generateTeamRosterPage(rosterCards);
    // generated HTML is then returned and sent to index.js
    return teamRoster;
}

const generateTeamRosterPage = rosterCards => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link  
rel="stylesheet"
href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
/>
<link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
    integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
    crossorigin="anonymous"
    />
    <link
    href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
    rel="stylesheet"
    />
<title>'Epic Team Roster'</title>
    
</head>
<body>
<header class="text-center bg-danger text-white font-size-large m-3 rounded" style="height: 8rem;">
    <h1 class="display-3 p-2">My Epic Team!</h1>
</header>
<section class="row justify-content-center p-5">
    ${rosterCards}
</section>

</body>
</html>




`;
};

module.exports = createHTML

