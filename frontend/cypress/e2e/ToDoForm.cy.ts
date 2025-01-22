describe('ToDo Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.intercept('POST', '/api/login', { statusCode: 200 }).as('loginRequest');
    cy.get('input[type="email"]').type('test1@gmail.com');
    cy.get('input[type="password"]').type('test1@gmail.com');
    cy.contains('Login').click();
    cy.url().should('include', 'todo');
    cy.get('#add-todo-button').click();
  });

  it('Should display all form fields', () => {
    cy.get('input[placeholder="Task title"]').should('be.visible');
    cy.get('textarea[placeholder="Enter description"]').should('be.visible');
    cy.contains('Done').should('exist');
    cy.get('input[type="checkbox"]').should('exist');
    cy.contains('Select priority').should('be.visible');
    cy.get('.mantine-Rating-root').should('exist');
    cy.get('input[placeholder="Pick value"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Save').and('be.visible');
  });

  it('Should show validation errors for empty required fields', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Title is too short').should('be.visible');
    cy.contains('Content is too short').should('be.visible');
  });

  it('Should create a new task successfully', () => {
    cy.intercept('POST', '/api/todo', { statusCode: 201 }).as('createTodo');
    cy.intercept('POST', '/api/todo', (req) => {
      req.continue();
    }).as('createTodo');
    cy.get('input[placeholder="Task title"]').type('Test Task');
    cy.get('textarea[placeholder="Enter description"]').type('This is a test task description.');
    cy.get('.mantine-Rating-root').click({ multiple: true });
    cy.get('input[placeholder="Pick value"]').click();
    cy.contains('Studia').click();
    cy.contains('Kolokwium').click();
    cy.contains('Egzamin').click();
    cy.get('input[placeholder="Pick value"]').click();
    cy.get('button[type="submit"]').click();
    cy.wait('@createTodo').its('response.statusCode').should('eq', 201);
    cy.contains('Task created successfully!').should('be.visible');
    cy.contains('Test Task').should('exist');
    cy.contains('This is a test task description.').should('exist');
  });

  it('Should create a new historical task successfully', () => {
    cy.intercept('POST', '/api/todo', (req) => {
        req.continue();
      }).as('createTodo');
    cy.get('input[placeholder="Task title"]').type('Test History Task');
    cy.get('textarea[placeholder="Enter description"]').type('This is a history test task description.');
    cy.get('input[type="checkbox"]').check();
    cy.get('input[placeholder="Pick value"]').click();
    cy.contains('Dom').click();
    cy.contains('Online').click();
    cy.get('input[placeholder="Pick value"]').click();
    cy.get('button[type="submit"]').click();
    cy.wait('@createTodo').its('response.statusCode').should('eq', 201);
    cy.contains('Task created successfully!').should('be.visible');
    cy.url().should('include', '/history');
    cy.contains('Test History Task').should('exist');
    cy.contains('This is a history test task description.').should('exist');
  });

  it('Should show error notification when API fails', () => {
    cy.intercept('POST', '/api/todo', { statusCode: 500 }).as('createTodo');
    cy.get('input[placeholder="Task title"]').type('Test Task');
    cy.get('textarea[placeholder="Enter description"]').type('This is a test task description.');
    cy.get('button[type="submit"]').click();

    cy.wait('@createTodo').its('response.statusCode').should('eq', 500);
    cy.contains('Something went wrong while saving your task.').should('be.visible');
  });
});
