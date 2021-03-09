describe('Url Shortener', () => {
  const baseURL = 'http://localhost:3000/';

  beforeEach(() => {
    cy.fixture('dummy_urls.json')
      .then(urls => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
          body: urls
        })
      });
    
      cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
        body: {
          id: 2, 
          long_url: "https://youtu.be/dGeEuyG_DIc", 
          short_url: "http://localhost:3001/useshorturl/2", title: 'Does this work?'
        }
      });
    
    cy.visit(baseURL)
  })

  it('Should have a page title', () => {
    cy.get('h1').should('contain', 'URL Shortener');
  });

  it('Should display the URLs on load', () => {
    cy.get('.url')
      .should('be.visible')
      .and('have.length', 1);
  });

  it('Should have a form', () => {
    cy.get('form').should('be.visible');
  });

  it('Should have a title input', () => {
    cy.get('form input[name="title"]').should('be.visible');
  });

  it('Should be able to type in the title input', () => {
    cy.get('form input[name="title"]').should('have.value', '');

    cy.get('form input[name="title"]').type('testes');

    cy.get('form input[name="title"]').should('have.value', 'testes')
  });

  it('Should have a url input', () => {
    cy.get('form input[name="urlToShorten"]').should('be.visible');
  });

  it('Should be able to type in the url input', () => {
    cy.get('form input[name="urlToShorten"]').should('have.value', '');

    cy.get('form input[name="urlToShorten"]').type(baseURL);

    cy.get('form input[name="urlToShorten"]').should('have.value', baseURL)
  });

  it('Should have a shorten button', () => {
    cy.get('form button')
      .should('be.visible')
      .should('contain', 'Shorten Please!');
  });

  it.only('Should be able to post with the shorten button', () => {
    cy.get('.url').should('have.length', 1);

    cy.get('form input[name="title"]').type('testes');

    cy.get('form input[name="urlToShorten"]').type(baseURL);

    cy.get('form button').click();

    cy.get('.url').should('have.length', 2);

    cy.get('.url:last')
      .should('contain', 'Does this work?')
      .and('contain', 'http://localhost:3001/useshorturl/2');

      cy.get('.url:last a').should('have.attr', 'href', 'http://localhost:3001/useshorturl/2');
  });
})