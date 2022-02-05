const generateManager = managerArr => {
    return `
    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mt-4">
    <div class="card h-100 text-white bg-light border-primary rounded mb-3" >
        <div class="card-body bg-primary">
            <h3 class="card-title"> ${managerArr.name} </h3>
            <h4 class="card-text"><i class="fas fa-coffee"></i> Manager</h4>
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

const generateEngineer = engineerArr => {
    return `
    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mt-4">
    <div class="card h-100 text-white bg-light border-primary rounded mb-3" >
        <div class="card-body bg-primary">
            <h3 class="card-title"> ${engineerArr.name} </h3>
            <h4 class="card-text"><i class="fas fa-glasses"></i> Engineer</h4>
        </div>
        <ul class="text-dark list-group list-group-flush text-black p-4">
            <li class="list-group-item">ID: ${engineerArr.id}</li>
            <li class="list-group-item">Email: <a href="mailto:${engineerArr.email}">Engineer's Email</a></li> 
            <li class="list-group-item">GitHub: ${engineerArr.github}</li>
        </ul>
    </div>
</div>
    `;

};

const generateIntern = internArr => {
    return `
    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mt-4">
    <div class="card h-100 text-white bg-light border-primary rounded mb-3" >
        <div class="card-body bg-primary">
            <h3 class="card-title"> ${internArr.name} </h3>
            <h4 class="card-text"><i class="fas fa-graduation-cap"></i> Intern</h4>
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

    createdCards = [];

    for (let i=0; i < employeeData.length; i++) {
        let employee = employeeData[i];
        let role = employee.getRole();

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
    const rosterCards = createdCards.join('')
    const teamRoster = generateTeamRosterPage(rosterCards);
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
<header class="text-center bg-danger text-white font-size-large" style="height: 8rem;">
    <h1>My Epic Team!</h1>
</header>
<section class="row justify-content-center">
    ${rosterCards}
</section>

</body>
</html>




`;
};

module.exports = createHTML

