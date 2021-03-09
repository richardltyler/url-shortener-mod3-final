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
          long_url: 'https://youtu.be/dGeEuyG_DIc',
          title: 'does this work?'
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
    cy.get('form input[name="title"]').type('testes');

    cy.get('form input[name="title"]').should('have.value', 'testes')
  });

  it('Should have a url input', () => {
    cy.get('form input[name="urlToShorten"]').should('be.visible');
  });

  it('Should be able to type in the url input', () => {
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
      .should('contain', 'does this work?')
      //you'll prolly notice that this isn't a shortened URL. However, you look at App.js line 27, you'll see that I'm adding the response to the DOM, not the newURL passed in as a parameter. That means that the url that is coming in is from my stubbed response, cuz this url matches the url in my intercept in this file at line 14
      .and('contain', 'https://youtu.be/dGeEuyG_DIc')
  });


})