const faker = require('faker-br');

function generateUserData() {
    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
    };
}

module.exports = { generateUserData };