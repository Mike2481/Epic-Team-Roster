const Employee = require('../lib/Employee');

// Testing the name, id, and email constructors that will be used for all employees
test('creates an employee object', () => {
    const employee = new Employee('Mike', 55, 'myemail@gmail.com');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));

});

//  Testing all the methods that will be used
//  Test was run with values hard coded in as well as with variable

test('gets the employee name', () => {
    const employee = new Employee('Mike', 55, 'myemail@gmail.com');

    expect(employee.getName()).toEqual('Mike');
});

test('gets the employee name', () => {
    let name = 'Mike'
    const employee = new Employee(name);

    expect(employee.getName()).toEqual(name);
});

test('gets the employee id', () => {
    const employee = new Employee('Mike', 55, 'myemail@gmail.com');

    expect(employee.getId()).toEqual(55);
});

test('gets the employee id', () => {
    let id = 55
    const employee = new Employee('Mike', id);

    expect(employee.getId()).toEqual(id);
});

test('gets the employee email', () => {
    const employee = new Employee('Mike', 55, 'myemail@gmail.com');

    expect(employee.getEmail()).toEqual('myemail@gmail.com');
});

test('gets the employee email', () => {
    let email = 'myemail@gmail.com'
    const employee = new Employee('Mike', 55, email);

    expect(employee.getEmail()).toEqual(email);
});


test('gets the employee role', () => {
    const employee = new Employee('Mike', 55, 'myemail@gmail.com');

    expect(employee.getRole()).toEqual('Employee');
});

test('gets the employee role', () => {
    let role = 'Employee'
    const employee = new Employee(role);

    expect(employee.getRole()).toEqual(role);
});
