/// <reference types="Cypress" />


describe('OrangeHRM PIM Module', function() {
    beforeEach(function() {
        cy.login()
        
    })

    it('Search to PIM Module', function(){
        cy.get('.oxd-main-menu-search > .oxd-input').type('PIM')
        cy.contains('PIM').should('be.visible')
    })
    
    it('Search to Time Module', function(){
        cy.get('.oxd-main-menu-search > .oxd-input').type('Time')
        cy.contains('Time').should('be.visible')
    })

    it('Search to PIM Module and delete search', function(){
        cy.get('.oxd-main-menu-search > .oxd-input').type('PIM')
        cy.contains('PIM').should('be.visible')
        cy.get('.oxd-main-menu-search > .oxd-input').clear()
    })

    it('Acess PIM Module', function(){
        cy.get('.oxd-main-menu-search > .oxd-input').type('PIM')
        cy.contains('PIM').click()
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'PIM')
    })
})