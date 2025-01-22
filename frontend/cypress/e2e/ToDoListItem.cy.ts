describe('ToDo List Item', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.intercept('POST', '/api/login', { statusCode: 200 }).as('loginRequest');
    cy.get('input[type="email"]').type('test1@gmail.com');
    cy.get('input[type="password"]').type('test1@gmail.com');
    cy.contains('Login').click();
    cy.url().should('include', 'todo');
  });

  it('Should add one task', () => {
    cy.get('#add-todo-button').click();
    cy.intercept('POST', '/api/todo', {statusCode: 201}).as('createTodo');
    cy.intercept('POST', '/api/todo', (req) => {
      req.continue();
    }).as('createTodo');
    cy.get('input[placeholder="Task title"]').type('Test Task 1 - priority 1');
    cy.get('textarea[placeholder="Enter description"]').type('This is a test task description.');
    cy.get('.mantine-Rating-root').click({multiple: true});
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
  });

  it('Should render task title and description', () => {
    cy.contains('Test Task 1 - priority 1').should('exist');
    cy.contains('This is a test task description.').should('exist');
  });

  it('Should display tags for the task', () => {
    cy.contains('Studia').should('exist');
    cy.contains('Kolokwium').should('exist');
    cy.contains('Egzamin').should('exist');
  });

  it('Should open modal when "Edit task" is clicked', () => {
    cy.get('#settings-button').click();
    cy.contains('Edit task').should('be.visible');
    cy.contains('Delete task').should('be.visible');
    cy.contains('Edit task').click();
    cy.get('form').should('be.visible');
    cy.contains('Test Task 1 - priority 1').should('be.visible');
    cy.contains('This is a test task description.').should('be.visible')
    cy.contains('Studia').should('be.visible');
    cy.contains('Kolokwium').should('be.visible')
    cy.contains('Egzamin').should('be.visible')
  });

  it('Should allow editing the task title and description', () => {
    cy.get('#settings-button').click();
    cy.contains('Edit task').should('be.visible');
    cy.contains('Delete task').should('be.visible');
    cy.contains('Edit task').click();
    cy.get('#title-input').clear().type('Updated Task Title');
    cy.get('#description-input').clear().type('Updated task description');
    cy.get('button[type="submit"]').click();
    cy.get('#todo-button').click();
    cy.contains('Updated Task Title').should('be.visible');
    cy.contains('Updated task description').should('be.visible');
  });

  it('Should toggle the "Done" checkbox', () => {
    cy.get('#settings-button').click();
    cy.contains('Edit task').should('be.visible');
    cy.contains('Delete task').should('be.visible');
    cy.contains('Edit task').click();
    cy.get('input[type="checkbox"]').check();
    cy.get('input[type="checkbox"]').should('be.checked');
    cy.get('button[type="submit"]').click();
    cy.contains('Done').should('be.visible');
    cy.get('#tasks-history-button').click();
  });

  it('Should add one task', () => {
      cy.get('#add-todo-button').click();
      cy.intercept('POST', '/api/todo', {statusCode: 201}).as('createTodo');
      cy.intercept('POST', '/api/todo', (req) => {
        req.continue();
      }).as('createTodo');
      cy.get('input[placeholder="Task title"]').type('Test Task 2 - priority 2');
      cy.get('textarea[placeholder="Enter description"]').type('This is a test task description.');
      cy.get('.mantine-Rating-root').click({multiple: true});
      cy.get('.mantine-Rating-root').within(() => {
        cy.get('svg').eq(2).click();
      });
      cy.get('input[placeholder="Pick value"]').click();
      cy.contains('Studia').click();
      cy.contains('Kolokwium').click();
      cy.contains('Egzamin').click();
      cy.get('input[placeholder="Pick value"]').click();
      cy.get('button[type="submit"]').click();
      cy.wait('@createTodo').its('response.statusCode').should('eq', 201);
      cy.contains('Task created successfully!').should('be.visible');
      cy.contains('Test Task 2 - priority 2').should('exist');
      cy.contains('This is a test task description.').should('exist');
    });

  it('Should open delete confirmation modal', () => {
    cy.get('#settings-button').click();
    cy.contains('Edit task').should('be.visible');
    cy.contains('Delete task').should('be.visible');
    cy.contains('Delete task').click();
    cy.get('#delete-warning').should('be.visible');
    cy.contains('Are you sure you want to delete your task? This action is irreversible').should('be.visible');
  });

  it('Should delete task when confirm delete modal is accepted', () => {
    cy.get('#settings-button').click();
    cy.contains('Edit task').should('be.visible');
    cy.contains('Delete task').should('be.visible');
    cy.contains('Delete task').click();
    cy.get('button').contains('Delete task').click();
    cy.contains('Test Task 1 - priority 1').should('not.exist');
  });

  it('Should add one task', () => {
      cy.get('#add-todo-button').click();
      cy.intercept('POST', '/api/todo', {statusCode: 201}).as('createTodo');
      cy.intercept('POST', '/api/todo', (req) => {
        req.continue();
      }).as('createTodo');
      cy.get('input[placeholder="Task title"]').type('Test Task 3 - priority 3');
      cy.get('textarea[placeholder="Enter description"]').type('This is a test task description.');
      cy.get('.mantine-Rating-root').click({multiple: true});
      cy.get('.mantine-Rating-root').within(() => {
        cy.get('svg').eq(3).click();
      });
      cy.get('input[placeholder="Pick value"]').click();
      cy.contains('Studia').click();
      cy.contains('Kolokwium').click();
      cy.contains('Egzamin').click();
      cy.get('input[placeholder="Pick value"]').click();
      cy.get('button[type="submit"]').click();
      cy.wait('@createTodo').its('response.statusCode').should('eq', 201);
      cy.contains('Task created successfully!').should('be.visible');
      cy.contains('Test Task 3 - priority 3').should('exist');
      cy.contains('This is a test task description.').should('exist');
    });

  it('Should change priority image based on priority value', () => {
    cy.get('#settings-button').click();
    cy.contains('Edit task').should('be.visible');
    cy.contains('Delete task').should('be.visible');
    cy.contains('Edit task').click();
    cy.get('#rating-button-edit').within(() => {
      cy.get('svg').eq(1).click();
    });
    cy.get('button[type="submit"]').click();
    cy.contains('Done').should('be.visible');
    cy.get('#todo-button').click();
    cy.get('img[src="src/assets/exclamation1.png"]').should('be.visible');
  });
});
