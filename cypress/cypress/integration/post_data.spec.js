import { LoginPage, PostPage, AdminPage } from './pages'

describe('Testing posts Managements', () => {

    const { faker } = require('@faker-js/faker');
    var data_source = '';
    var PositiveData = [];
    var NegativeData = [];

    before(() => {
        data_source = Cypress.env('data_source');

        switch(data_source) {
          case 'PRIORI':
            cy.fixture('post-positive-data').then((post) => {
              PositiveData = post
            })
            cy.fixture('post-negative-data').then((post) => {
                NegativeData = post
              })
          break;
          case 'PSEUDO':
            faker.seed(1)
            pagesInfo = Cypress._.range(1,20).map((_, k) => {
              return {
                pageTitle: faker.random.words(),
                pageBody: faker.lorem.paragraphs()
              }
            })
          break;
          case 'RUNTIME':
            pagesInfo = Cypress._.range(1,20).map((_, k) => {
              return {
                pageTitle: faker.random.words(),
                pageBody: faker.lorem.paragraphs()
              }
            })
          break;
          default:
            pagesInfo.push('FALLO')
          break;
        }
    })

    beforeEach(() => {

        self.loginPage = new LoginPage();
        self.postPage = new PostPage();
        self.adminPage = new AdminPage();
        //Given of each test
        cy.visit(Cypress.env('login_url'))
        //When of each test
        self.loginPage.login(Cypress.env('username'), Cypress.env('password'))
        cy.wait(2000);
        self.adminPage.navigateToPosts();
        cy.wait(2000);
    })

    //Every it element is the 'then' of the Given-then-when process

    /*it('Creación de post normal', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[0].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[0].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);        
        self.postPage.clickPublishPostButton(); 
        cy.wait(1000);       
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();  
        cy.wait(1000);
        self.postPage.assertPostExists(PositiveData[0].Title);
        cy.wait(5000);
    })

    it('Creación de post con titulo fuera de frontera', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(NegativeData[384].Title_long);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[0].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);        
        self.postPage.clickPublishPostButton(); 
        cy.wait(1000);       
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();  
        cy.wait(1000);
        self.postPage.assertPostExists(NegativeData[384].Title_long);
        cy.wait(5000);
    })

        it('Creación de post con Body fuera de frontera', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[100].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);        
        self.postPage.clickPublishPostButton(); 
        cy.wait(1000);       
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.assertAlertMessage('request entity too large');
        cy.wait(5000);
    })

    it('Creación de post con Titulo y Body fuera de frontera', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(NegativeData[384].Title_long);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body+
            PositiveData[111].Body+
            PositiveData[332].Body+PositiveData[374].Body+
            PositiveData[529].Body+PositiveData[635].Body+
            PositiveData[717].Body+PositiveData[925].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);        
        self.postPage.clickPublishPostButton(); 
        cy.wait(1000);       
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.assertAlertMessage('request entity too large');
        cy.wait(5000);
    })

    

    it('Creación de post con titulo con caracteres especiales', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(NegativeData[310].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[0].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);        
        self.postPage.clickPublishPostButton(); 
        cy.wait(1000);       
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();  
        cy.wait(1000);
        self.postPage.assertPostExists(NegativeData[310].Title);
        cy.wait(5000);
    })

    it('Creación de post con body con caracteres especiales', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[310].Title);
        cy.wait(1000);
        self.postPage.typePostBody(NegativeData[191].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);        
        self.postPage.clickPublishPostButton(); 
        cy.wait(1000);       
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();  
        cy.wait(1000);
        self.postPage.assertPostExists(PositiveData[310].Title);
        cy.wait(5000);
    })

    it('Creación de post con titulo y body con caracteres especiales', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(NegativeData[310].Title);
        cy.wait(1000);
        self.postPage.typePostBody(NegativeData[191].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);        
        self.postPage.clickPublishPostButton(); 
        cy.wait(1000);       
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();  
        cy.wait(1000);
        self.postPage.assertPostExists(PositiveData[310].Title);
        cy.wait(5000);
    })


    it('Creación de un post con titulo vacío', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle('');
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[0].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);        
        self.postPage.clickPublishPostButton(); 
        cy.wait(1000);       
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();  
        cy.wait(1000);
        self.postPage.assertPostExists('');
        cy.wait(5000);
    })

    it('Creación de un post con Body vacío', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[350].Title);
        cy.wait(1000);
        self.postPage.typePostBody('');
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);        
        self.postPage.clickPublishPostButton(); 
        cy.wait(1000);       
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();  
        cy.wait(1000);
        self.postPage.assertPostExists(PositiveData[310].Title);
        cy.wait(5000);
    })

    it('Creación de post sin titulo ni body', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle('');
        cy.wait(1000);
        self.postPage.typePostBody('');
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);        
        self.postPage.clickPublishPostButton(); 
        cy.wait(1000);       
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();  
        cy.wait(1000);
        self.postPage.assertPostExists('');
        cy.wait(5000);
    })*/


    it('Edición de post normal', () => {
        cy.wait(1000);
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[2].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[2].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[5].Title);
        cy.wait(1000);
        self.postPage.typePostBody('');
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[5].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();
        cy.wait(1000);
        self.postPage.assertPostExists(PositiveData[5].Title);
        cy.wait(5000);
    })

    /*it('Test Shedule post', () => {
        cy.screenshot('schedule/1-post-list', {overwrite: false});
        cy.wait(1000);
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle('Test 4 - Post');
        cy.wait(1000);
        self.postPage.typePostBody('New body for post 4');
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        cy.screenshot('schedule/2-post-to-publish', {overwrite: false});
        cy.wait(1000);
        self.postPage.clickCalendarButton();
        cy.wait(1000);
        self.postPage.clickDateCalendar();
        cy.wait(1000);
        cy.screenshot('schedule/3-post-date', {overwrite: false});
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        cy.screenshot('schedule/4-post-schediled', {overwrite: false});
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();
        cy.wait(1000);
        cy.screenshot('schedule/5-post-list', {overwrite: false});
        cy.wait(1000);
        self.postPage.clickShedulePost();
        cy.wait(1000);
        cy.screenshot('schedule/6-post-sceduled-list', {overwrite: false});
        cy.wait(1000);
        self.postPage.assertPostExists('Test 4 - Post');
        cy.wait(5000);
    })*/
})