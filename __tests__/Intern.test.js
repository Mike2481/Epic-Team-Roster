const Intern = require('../lib/Intern');

test('creates intern object', () => {
    const intern = new Intern('Mike', 55, 'myemail@gmail.com', 'MSU');

    expect(intern.school).toEqual(expect.any(String));
});

test('gets intern school name', () => {
    const intern = new Intern('Mike', 55, 'myemail@gmail.com', 'MSU');

    expect(intern.getSchool()).toEqual('MSU');
});

test('gets employee role', () => {
    const intern = new Intern('Mike', 55, 'myemail@gmail.com', 'MSU');

    expect(intern.getRole()).toEqual('Intern');
});