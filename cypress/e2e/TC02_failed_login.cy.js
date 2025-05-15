describe('TC02: Failed Login Test', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should show error message with invalid password', () => {
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();
    
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid email or password');
    
    // Verify we stay on login page
    cy.url().should('include', '/login');
  });
});