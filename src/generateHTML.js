// Need email to bring up default email and populate the
// TO field of the email with the address

const generateRoster = roster => {
    console.log(roster);


    const generateManager = managerArr => {
        return `
        <section class="card">
            <div class="card-body">
                <h3 class="card-title"> ${managerArr.getName()} </h3>
                <h4 class="card-text">Manager</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${managerArr.id}</li>
                <li class="list-group-item">${managerArr.email}</li> 
                <li class="list-group-item">${managerArr.officeNumber}</li>
            </ul>
        </section>
        `;
    };

    const generateEngineer = engineerArr => {
        return `
        <section class="card">
            <div class="card-body">
                <h3 class="card-title"> ${engineerArr.name} </h3>
                <h4 class="card-text">Manager</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${engineerArr.id}</li>
                <li class="list-group-item">${engineerArr.email}</li>
                <li class="list-group-item">${engineerArr.github}</li>
            </ul>
        </section>
        `;

    };

    const generateIntern = InternArr => {
        return `
        <section class="card">
            <div class="card-body">
                <h3 class="card-title"> ${InternArr.name} </h3>
                <h4 class="card-text">Manager</h4>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${InternArr.id}</li>
                <li class="list-group-item">${InternArr.email}</li>
                <li class="list-group-item">${InternArr.school}</li>
            </ul>
        </section>
        `;

    };

        html = [];
        
};
        
module.exports = roster => {

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
            <!-- Link for font awesome provided -->
            <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
            integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
            crossorigin="anonymous"
            />
            <!-- Link for Google fonts provided -->
            <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
            rel="stylesheet"
            />
            <title>'Epic Team Roster'</title>

        </head>
        <body>
            

        ${generateRoster(roster)}
        </body>
        </html>
    


    
    `;
    };


