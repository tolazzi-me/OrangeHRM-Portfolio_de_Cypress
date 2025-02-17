Cypress.Commands.add('login', function(){
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[placeholder="Username"]').type('Admin')
    cy.get('[placeholder="Password"]').type('admin123')
    cy.get('[type="submit"]').click()
    cy.get('.oxd-brand-banner > img').should('be.visible') //Validar página da home
})

Cypress.Commands.add('PimModule', function(){
    cy.get('.oxd-main-menu-search > .oxd-input').type('PIM')
    cy.contains('PIM').click()
    cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('contain', 'PIM') //Validar página PIM
})

Cypress.Commands.add('addEmployee', function(){
    cy.get('.orangehrm-header-container > .oxd-button').should('be.visible').click() //Botão Add+
    cy.get('.orangehrm-card-container > .oxd-text--h6').should('be.visible')
})