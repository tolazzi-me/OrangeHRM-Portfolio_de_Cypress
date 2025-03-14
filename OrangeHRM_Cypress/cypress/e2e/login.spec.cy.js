/// <reference types="Cypress" />


describe('OrangeHRM Login', function() {
    beforeEach(function() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    it('Sucessful Login', function(){
        cy.get('[placeholder="Username"]').type('Admin')
        cy.get('[placeholder="Password"]').type('admin123')
        cy.get('[type="submit"]').click()
        cy.get('.oxd-brand-banner > img').should('be.visible') //Validar página da home
    })

    it('Login with empty fields', function(){
        cy.get('[type="submit"]').click()
        cy.contains('Required').should('be.visible')
    })

    it('Unsucessful Login', function(){
        cy.get('[placeholder="Username"]').type('Admin')
        cy.get('[placeholder="Password"]').type('admin1234')
        cy.get('[type="submit"]').click()
        cy.get('.oxd-alert').should('contain', 'Invalid credentials')
    })
})