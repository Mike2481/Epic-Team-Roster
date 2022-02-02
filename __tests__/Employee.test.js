const Employee = require('../lib/Employee');

test('creates an employee object', () => {
    const employee = new Employee('Mike', 55, 'myemail@gmail.com');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));

});

test('gets the employee name', () => {
    const employee = new Employee('Mike', 55, 'myemail@gmail.com');

    expect(employee.getName()).toEqual('Mike');
});

test('gets the employee id', () => {
    const employee = new Employee('Mike', 55, 'myemail@gmail.com');

    expect(employee.getId()).toEqual(55);
});

test('gets the employee email', () => {
    const employee = new Employee('Mike', 55, 'myemail@gmail.com');

    expect(employee.getEmail()).toEqual('myemail@gmail.com');
});

test('gets the employee role', () => {
    const employee = new Employee('Mike', 55, 'myemail@gmail.com');

    expect(employee.getRole()).toEqual('Employee');
});