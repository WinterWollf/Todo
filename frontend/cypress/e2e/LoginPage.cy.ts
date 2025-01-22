describe('Login Page', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.visit('http://localhost:3000/login');
  });

  it('Should display the login form', () => {
    cy.contains('Welcome to AGH ToDo').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.contains('Login').should('be.visible');
  });

  it('Should show validation errors for empty fields', () => {
    cy.contains('Login').click();
    cy.get('input[type="email"]').should('contain.text', '');
    cy.get('input[type="password"]').should('contain.text', '');
  });

  it('Should login successfully with valid credentials', () => {
    cy.get('input[type="email"]').type('test1@gmail.com');
    cy.get('input[type="password"]').type('test1@gmail.com');
    cy.contains('Login').click();
    cy.wait(1000);
    cy.url().should('include', 'todo');
  });

  it('Should show error notification on login failure', () => {
    cy.wait(1000);
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.contains('Login').click();
    cy.wait(1000);
    cy.contains('Login failed').should('be.visible');
    cy.contains('Please check your credentials and try again').should('be.visible');
  });

  it('Should open the registration modal when clicking register', () => {
    cy.wait(1000);
    cy.contains('Register').click();
    cy.contains('Register form').should('be.visible');
    cy.get('input[type="email"]').should('contain.text', '');
    cy.get('input[type="password"]').should('contain.text', '');
    cy.get('input[placeholder="Enter email"]').should('be.visible');
    cy.get('input[placeholder="Enter password"]').should('be.visible');
  });

  it('Should show success notification on successful registration', () => {
    cy.get('#register-open-button').click();
    cy.get('form').should('be.visible');
    cy.get('#mail-register-form').type('test8@example.com');
    cy.get('#password-register-form').type('test8@example.com');
    cy.get('#register-submit-button').click();
    cy.contains('Registration successful').should('be.visible');
  });

  it('Should show error notification on registration failure', () => {
    cy.get('#register-open-button').click();
    cy.get('input[placeholder="Enter email"]').type('test8@example.com');
    cy.get('input[placeholder="Enter password"]').type('test8@example.com');
    cy.get('#register-submit-button').click();
    cy.contains('Oops!').should('be.visible');
    cy.contains('User already exists').should('be.visible');
  });

  it('Should logout', () => {
    cy.intercept('POST', '/api/login', { statusCode: 201 }).as('loginRequest');
    cy.get('input[type="email"]').type('test1@gmail.com');
    cy.get('input[type="password"]').type('test1@gmail.com');
    cy.contains('Login').click();
    cy.wait(1000);
    cy.url().should('include', 'todo');
    cy.get('#logout-button').click();
    cy.wait(1000);
    cy.getCookies().should('have.length', 0);
    cy.url().should('include', 'login');
  });
});
