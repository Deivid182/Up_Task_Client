/// <reference types="cypress" />

describe('<Login />', () => {
  it('<Login /> - should render', () => {
    cy.visit('/');

    cy.get('[data-cy="heading"]').invoke('text').should('equal', 'Welcome to Up Task')

    cy.get('[data-cy="login-form"]').should('be.visible')
    
    cy.get('[data-cy="email-input"]').should('be.visible')
    
    cy.get('[data-cy="password-input"]').should('be.visible')

    cy.get('[data-cy="submit-login"]')
      .should('be.visible')
      .should('have.value', 'Sign In')
      .should('have.class', 'bg-sky-600 text-white')

    cy.get('[data-cy="signup-link"]').should('be.visible')

    cy.get('[data-cy="signup-link"]')
      .should('have.attr', 'href', '/signup')

  })

  it('<Sign Up /> - should render', () => {

    cy.visit('/signup')

    cy.get('[data-cy="signup-heading"]').invoke('text').should('equal', 'Sign Up')

    cy.get('[data-cy="signup-name-input"]').should('be.visible')

    cy.get('[data-cy="signup-email-input"]').should('be.visible')

    cy.get('[data-cy="signup-password-input"]')
      .should('be.visible')
      .should('have.prop', 'type', 'password')

    cy.get('[data-cy="signup-repeat-password-input"]').should('be.visible')

    cy.get('[data-cy="signup-submit"]')
      .should('be.visible')
      .should('have.value', 'Sign Up')
      .should('have.class', 'bg-black text-white')

  })

})