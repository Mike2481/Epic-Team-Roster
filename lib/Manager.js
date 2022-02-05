const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
    super(name, id, email); // gets name, id, and email from Employee - may not be needed

    this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return 'Manager'
    }
};

module.exports = Manager;