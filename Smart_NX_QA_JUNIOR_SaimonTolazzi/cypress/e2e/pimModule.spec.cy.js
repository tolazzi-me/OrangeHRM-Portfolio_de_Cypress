/// <reference types="Cypress" />
const { generateUserData } = require('../Feature/pimModuleFeature.cy.js');


describe('OrangeHRM PIM Module registration', function() {
    beforeEach(function() {
        cy.login()
        cy.PimModule()
        cy.addEmployee()
    })

    it('User registration Sucessfuly and exclude', function(){
        const userData = generateUserData();
        cy.get('[name="firstName"]').type(userData.firstName)
        cy.get('[name="middleName"]').type('AutomaçãoTeste')
        cy.get('[name="lastName"]').type(userData.lastName)
        cy.contains('Save').click()
        cy.get('.oxd-text--toast-title').should('be.visible')
        cy.contains('PIM').click()
        cy.get('[placeholder="Type for hints..."]').first().type(userData.firstName)
        cy.get('.oxd-form-actions > .oxd-button--secondary').should('be.visible').click()
        cy.contains(userData.firstName).should('be.visible')
        cy.request({
            method: 'GET',
            url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?nameOrId=Nubia&includeEmployees=onlyCurrent',
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
        cy.get('.oxd-table-cell-actions > :nth-child(2)').should('be.visible').click({ multiple: true })
        cy.contains('No, Cancel').click()
        cy.contains(userData.firstName).should('be.visible')
        cy.get('.oxd-table-cell-actions > :nth-child(2)').click()
        cy.contains('Yes, Delete').click()
    })

    it('User registration without name', function(){
        cy.contains('Save').click()
        cy.contains('Required').should('be.visible')
    })

    it('User registration with existing ID', function(){
        cy.get('[name="firstName"]').type('Saimon')
        cy.get('[name="middleName"]').type('Test')
        cy.get('[name="lastName"]').type('Tolazzi')
        cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type('01715')
        cy.contains('Save').click()
        cy.contains('Employee Id already exists').should('be.visible')
        
    })
    
})

describe('OrangeHRM PIM Module Search', function() {
    beforeEach(function() {
        cy.login()
        cy.PimModule()
        
    })

    it('Search username', function(){
        cy.get('[placeholder="Type for hints..."]').first().type('Amelia')
        cy.get('.oxd-form-actions > .oxd-button--secondary').should('be.visible').click()
        cy.contains('Amelia').should('be.visible')
    })

    it('Search inexistent username', function(){
        cy.get('[placeholder="Type for hints..."]').first().type('Not Found name 01234')
        cy.get('.oxd-form-actions > .oxd-button--secondary').should('be.visible').click()
        cy.contains('No Records Found').should('be.visible')
    })

    it('Search id user', function(){
        cy.get(':nth-child(2) > .oxd-input').type('01715')
        cy.get('.oxd-form-actions > .oxd-button--secondary').should('be.visible').click()
        cy.contains('Amelia').should('be.visible')
    })

    it('Search inexistent id user', function(){
        cy.get(':nth-child(2) > .oxd-input').type('0000')
        cy.get('.oxd-form-actions > .oxd-button--secondary').should('be.visible').click()
        cy.contains('No Records Found').should('be.visible')
    })

    
    
})