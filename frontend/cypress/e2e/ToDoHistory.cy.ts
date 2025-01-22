describe('ToDo History List', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.intercept('POST', '/api/login', { statusCode: 200 }).as('loginRequest');
    cy.get('input[type="email"]').type('test1@gmail.com');
    cy.get('input[type="password"]').type('test1@gmail.com');
    cy.contains('Login').click();
    cy.url().should('include', 'todo');
    cy.get('#tasks-history-button').click();
  });

  it('Should add 3 tasks with 3 different priority', () => {
    cy.get('#add-todo-button').click();
    cy.intercept('POST', '/api/todo', { statusCode: 201 }).as('createTodo');
    cy.intercept('POST', '/api/todo', (req) => {
      req.continue();
    }).as('createTodo');
    cy.get('input[placeholder="Task title"]').type('Test History Task 1 - priority 1');
    cy.get('textarea[placeholder="Enter description"]').type('This is a test task description.');
    cy.get('input[type="checkbox"]').check();
    cy.get('.mantine-Rating-root').click({ multiple: true });
    cy.get('.mantine-Rating-root').within(() => {
      cy.get('svg').eq(1).click();
    });
    cy.get('input[placeholder="Pick value"]').click();
    cy.contains('Studia').click();
    cy.contains('Kolokwium').click();
    cy.contains('Egzamin').click();
    cy.get('input[placeholder="Pick value"]').click();
    cy.get('button[type="submit"]').click();
    cy.wait('@createTodo').its('response.statusCode').should('eq', 201);
    cy.contains('Task created successfully!').should('be.visible');
    cy.contains('Test History Task 1 - priority 1').should('exist');
    cy.contains('This is a test task description.').should('exist');

    cy.get('#add-todo-button').click();
    cy.intercept('POST', '/api/todo', { statusCode: 201 }).as('createTodo');
    cy.intercept('POST', '/api/todo', (req) => {
      req.continue();
    }).as('createTodo');
    cy.get('input[placeholder="Task title"]').type('Test History Task 2 - priority 2');
    cy.get('textarea[placeholder="Enter description"]').type('This is a test task description.');
    cy.get('input[type="checkbox"]').check();
    cy.get('.mantine-Rating-root').click({ multiple: true });
    cy.get('.mantine-Rating-root').within(() => {
      cy.get('svg').eq(2).click();
    });
    cy.get('input[placeholder="Pick value"]').click();
    cy.contains('Praca').click();
    cy.contains('Online').click();
    cy.get('input[placeholder="Pick value"]').click();
    cy.get('button[type="submit"]').click();
    cy.wait('@createTodo').its('response.statusCode').should('eq', 201);
    cy.contains('Task created successfully!').should('be.visible');
    cy.contains('Test History Task 2 - priority 2').should('exist');
    cy.contains('This is a test task description.').should('exist');

    cy.get('#add-todo-button').click();
    cy.intercept('POST', '/api/todo', { statusCode: 201 }).as('createTodo');
    cy.intercept('POST', '/api/todo', (req) => {
      req.continue();
    }).as('createTodo');
    cy.get('input[placeholder="Task title"]').type('Test History Task 3 - priority 3');
    cy.get('textarea[placeholder="Enter description"]').type('This is a test task description.');
    cy.get('input[type="checkbox"]').check();
    cy.get('.mantine-Rating-root').click({ multiple: true });
    cy.get('.mantine-Rating-root').within(() => {
      cy.get('svg').eq(3).click();
    });
    cy.get('input[placeholder="Pick value"]').click();
    cy.get('input[placeholder="Pick value"]').click();
    cy.get('button[type="submit"]').click();
    cy.wait('@createTodo').its('response.statusCode').should('eq', 201);
    cy.contains('Task created successfully!').should('be.visible');
    cy.contains('Test History Task 3 - priority 3').should('exist');
    cy.contains('This is a test task description.').should('exist');
    });

  it('Should display rating, reset button, and list items', () => {
    cy.get('.mantine-Rating-root').should('be.visible');
    cy.get('#reset-button').should('be.visible');
    cy.contains('Test History Task 1 - priority 1').should('exist');
    cy.contains('This is a test task description.').should('exist');
    cy.contains('Test History Task 2 - priority 2').should('exist');
    cy.contains('This is a test task description.').should('exist');
    cy.contains('Test History Task 3 - priority 3').should('exist');
    cy.contains('This is a test task description.').should('exist');
  });

  it('Should filter tasks based on priority', () => {
    cy.get('#rating-button').within(() => {
      cy.get('svg').eq(1).click({ force: true });
    });
    cy.get('.mantine-SimpleGrid-root').within(() => {
      cy.contains('Test History Task 1 - priority 1').should('exist');
    });

    cy.get('#rating-button').within(() => {
      cy.get('svg').eq(2).click({ force: true });
    });
    cy.get('.mantine-SimpleGrid-root').within(() => {
      cy.contains('Test History Task 2 - priority 2').should('exist');
    });

    cy.get('#rating-button').within(() => {
      cy.get('svg').eq(3).click({ force: true });
    });
    cy.get('.mantine-SimpleGrid-root').within(() => {
      cy.contains('Test History Task 3 - priority 3').should('exist');
    });
  });

  it('Should reset priority filter when reset button is clicked', () => {
    cy.get('#rating-button').within(() => {
      cy.get('svg').eq(3).click({ force: true });
    });
    cy.get('.mantine-SimpleGrid-root').within(() => {
      cy.contains('Test History Task 1 - priority 1').should('not.exist');
    });
    cy.get('.mantine-SimpleGrid-root').within(() => {
      cy.contains('Test History Task 2 - priority 2').should('not.exist');
    });
    cy.get('.mantine-SimpleGrid-root').within(() => {
      cy.contains('Test History Task 3 - priority 3').should('exist');
    });
    cy.get('#reset-button').click();
    cy.get('.mantine-SimpleGrid-root').within(() => {
      cy.contains('Test History Task 1 - priority 1').should('exist');
    });
    cy.get('.mantine-SimpleGrid-root').within(() => {
      cy.contains('Test History Task 2 - priority 2').should('exist');
    });
    cy.get('.mantine-SimpleGrid-root').within(() => {
      cy.contains('Test History Task 3 - priority 3').should('exist');
    });
  });
});
