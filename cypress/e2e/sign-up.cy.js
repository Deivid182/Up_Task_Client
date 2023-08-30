/// <reference types="cypress" />

describe('<Sign Up />', () => {
  it('<Sign Up /> - should render', () => {
    cy.visit('/signup')
    /* cy.get('[data-cy="signup-submit"]').click()

    cy.get('[data-cy="signup-alert"]')
      .should('exist')
      .should('have.text', 'All fields are required')
 */
    cy.get('[data-cy="signup-name-input"]').type('test')

    cy.get('[data-cy="signup-email-input"]').type('test@gmail.com')

    cy.get('[data-cy="signup-password-input"]').type('pass')

    cy.get('[data-cy="signup-repeat-password-input"]').type('pass')

    cy.get('[data-cy="signup-submit"]').click()

    cy.get('[data-cy="signup-alert"]')
      .should('exist')
      .should('have.text', 'Your password is too short. It must be at least 6 characteres so try again')

    cy.get('[data-cy="signup-password-input"]').clear().type('password')
    cy.get('[data-cy="signup-repeat-password-input"]').clear().type('passwor')

    cy.get('[data-cy="signup-submit"]').click()

    cy.get('[data-cy="signup-alert"]')
      .should('exist')
      .should('have.text', 'Your passwords do not match')

    cy.get('[data-cy="signup-password-input"]').clear().type('password')
    cy.get('[data-cy="signup-repeat-password-input"]').clear().type('password')

    cy.get('[data-cy="signup-submit"]').click()

    cy.get('[data-cy="signup-alert"]')
      .should('exist')
      .should('have.text', 'Thanks for signing up. Check your email for a link to verify your email address')
  })
})