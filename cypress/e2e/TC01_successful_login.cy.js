describe('TC01: Successful login', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
  
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
  });
  