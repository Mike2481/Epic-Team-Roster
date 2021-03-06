const Engineer = require('../lib/Engineer');

//  Test for engineer specific data - github and Engineer Role
test('creates an engineer object', () => {
    const engineer = new Engineer('Mike', 55, 'myemail@gmail.com', 'Mike2481');

    expect(engineer.github).toEqual(expect.any(String));
});

test('gets github profile', () => {
    const engineer = new Engineer('Mike', 55, 'myemail@gmail.com', 'Mike2481');

    expect(engineer.getGitHub()).toEqual('Mike2481')
});

test('gets github profile', () => {
    const engineer = new Engineer('Mike', 55, 'myemail@gmail.com', 'Mike2481');

    expect(engineer.github).toEqual('Mike2481')
});

test('gets the employee role', () => {
    const engineer = new Engineer('Mike', 55, 'myemail@gmail.com', 'Mike2481');

    expect(engineer.getRole()).toEqual('Engineer');
});