describe('Login Test Suite', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  // TC02: Failed login with invalid password
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

  // TC01: Successful login
  it('should log in successfully with valid credentials', () => {
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();

    // Wait for redirect and dashboard to load
    cy.url().should('include', '/dashboard');

    // Check if the dashboard page renders correctly
    cy.get('[data-testid="dashboard"]').should('exist');

    // Check if the user email is displayed
    cy.get('[data-testid="user-email"]').should('contain', 'test@example.com');

    // Optional: Check the welcome message
    cy.contains('Welcome!').should('be.visible');
  });

  // TC03: UI test 
  
  // TC04: API simulation test 
  
});