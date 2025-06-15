describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Edita uma tarefa existente', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]').type('Tarefa inicial{enter}');

    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('label')
      .dblclick(); // Duplo clique para ativar a edição

    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('.edit')
      .clear()
      .type('Tarefa editada{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa editada');
  });

  it('Limpa as tarefas completadas da lista', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('Tarefa para completar 1{enter}')
      .type('Tarefa ativa{enter}')
      .type('Tarefa para completar 2{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]').first().click();
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]').last().click();

    cy.get('.clear-completed').click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa ativa');

    cy.get('.clear-completed').should('not.be.visible');
  });

  it('deve registrar, completar e deletar a tarefa manualmente', () => {
    cy.visit('');
    const taskText = 'Fazer a apresentação para a reunião';
    cy.get('[data-cy=todo-input]').type(`${taskText}{enter}`);

    cy.get('[data-cy=todos-list] > li')
      .should('have.length', 1)
      .and('contain.text', taskText);

    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('[data-cy=toggle-todo-checkbox]')
      .click();

    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('have.class', 'completed');

    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('[data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list] > li').should('not.exist');
  });
});