const Manager = require('../lib/Manager');

//  Test for manager specific data - office number and Manager Role

test('creates manager object', () => {
    const manager = new Manager('Mike', 55, 'myemail@gmail.com', 223);

    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test('gets office number', () => {
    const manager = new Manager('Mike', 55, 'myemail@gmail.com', 223);

    expect(manager.getOfficeNumber()).toEqual(223);
});

test('gets employee role', () => {
    const manager = new Manager('Mike', 55, 'myemail@gmail.com', 223);

    expect(manager.getRole()).toEqual('Manager');
});