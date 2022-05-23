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
            PositiveData = Cypress._.range(1,20).map((_, k) => {
              return {
                Title: faker.random.words(),
                Body: faker.lorem.paragraphs(10),
                day: faker.datatype.number({ min: 10, max: 30,}),
                month: faker.datatype.number({ min: 10, max: 12}),
                hour: faker.datatype.number({ min: 10, max: 24}),
                minute: faker.datatype.number({ min: 10, max: 59}),
              }
            }),
            NegativeData = Cypress._.range(1,500).map((_, k) => {
                return {
                  Title: faker.internet.emoji(),
                  Body: faker.internet.emoji(),
                  Title_empty:"",
                  Body_empty:"",
                  Title_long:(faker.lorem.paragraphs(2,false)),
                  day: faker.datatype.number({ min: 32, max: 40}),
                  month: faker.datatype.number({ min: 13, max: 20}),
                  hour: faker.datatype.number({ min: 25, max: 30}),
                  minute: faker.datatype.number({ min: 60, max: 70}),

                }
              })
          break; 
          case 'RUNTIME':
            PositiveData = Cypress._.range(1,20).map((_, k) => {
                return {
                  Title: faker.random.words(),
                  Body: faker.lorem.paragraphs(10),
                  day: faker.datatype.number({ min: 10, max: 30}),
                  month: faker.datatype.number({ min: 10, max: 12}),
                  hour: faker.datatype.number({ min: 10, max: 24}),
                  minute: faker.datatype.number({ min: 10, max: 59}),
                }
              }),
              NegativeData = Cypress._.range(1,500).map((_, k) => {
                  return {
                    Title: faker.internet.emoji(),
                    Body: faker.internet.emoji(),
                    Title_empty:"",
                    Body_empty:"",
                    Title_long:(faker.lorem.paragraphs(2,false)),
                    day: faker.datatype.number({ min: 32, max: 40}),
                    month: faker.datatype.number({ min: 13, max: 20}),
                    hour: faker.datatype.number({ min: 25, max: 30}),
                    minute: faker.datatype.number({ min: 60, max: 70}),
  
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
    
    it('Creación de post normal', () => {
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
        self.postPage.assertPostExists('(Untitled)');
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
        self.postPage.assertPostExists('(Untitled)');
        cy.wait(5000);
    })

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

    it('Edición de post con titulo fuera de frontera', () => {
        cy.wait(1000);
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
        self.postPage.typePostTitle(NegativeData[0].Title_long);
        cy.wait(1000);
        self.postPage.typePostBody('');
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[0].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.assertAlertMessage('Update failed: Title cannot be longer than 255 characters.');
        cy.wait(5000);
    })

    it('Edición de post con Body fuera de frontera', () => {
        cy.wait(1000);
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[1].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[1].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[2].Title);
        cy.wait(1000);
        self.postPage.typePostBody('');
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[1].Body+PositiveData[2].Body+PositiveData[3].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[2].Body+PositiveData[3].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[2].Body+PositiveData[3].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[2].Body+PositiveData[3].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[2].Body+PositiveData[3].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.assertAlertMessage('request entity too large');
        cy.wait(5000);
    })
    it('Edición de post con Titulo y Body fuera de frontera', () => {
        cy.wait(1000);
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[1].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[1].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(NegativeData[4].Title_long);
        cy.wait(1000);
        self.postPage.typePostBody('');
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[3].Body+PositiveData[2].Body+PositiveData[3].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[2].Body+PositiveData[3].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[2].Body+PositiveData[3].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[2].Body+PositiveData[3].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body+
            PositiveData[1].Body+PositiveData[2].Body+PositiveData[3].Body+
            PositiveData[1].Body+PositiveData[1].Body+PositiveData[1].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.assertAlertMessage('Update failed: Title cannot be longer than 255 characters.');
        cy.wait(5000);
    })

    it('Edición de post con titulo con caracteres especiales', () => {
        cy.wait(1000);
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[4].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[4].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(NegativeData[4].Title);
        cy.wait(1000);
        self.postPage.typePostBody('');
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[4].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();
        cy.wait(1000);
        self.postPage.assertPostExists(NegativeData[4].Title);
        cy.wait(5000);
    })

    it('Edición de post con body con caracteres especiales', () => {
        cy.wait(1000);
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[4].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[4].Body);
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
        self.postPage.typePostBody(NegativeData[5].Body);
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

    it('Edición de post con titulo y body con caracteres especiales', () => {
        cy.wait(1000);
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[4].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[4].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(NegativeData[6].Title);
        cy.wait(1000);
        self.postPage.typePostBody('');
        cy.wait(1000);
        self.postPage.typePostBody(NegativeData[6].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();
        cy.wait(1000);
        self.postPage.assertPostExists(NegativeData[6].Title);
        cy.wait(5000);
    })

    it('Edición de un post con titulo vacío', () => {
        cy.wait(1000);
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[4].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[4].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.typePostTitle('');
        cy.wait(1000);
        self.postPage.typePostBody('');
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[6].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();
        cy.wait(1000);
        self.postPage.assertPostExists('(Untitled)');
        cy.wait(5000);
    })

    it('Edición de un post con body vacío', () => {
        cy.wait(1000);
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[4].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[4].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[7].Title);
        cy.wait(1000);
        self.postPage.typePostBody('');
        cy.wait(1000);
        self.postPage.typePostBody('');
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();
        cy.wait(1000);
        self.postPage.assertPostExists(PositiveData[7].Title);
        cy.wait(5000);
    })

    it('Edición de post sin titulo ni body', () => {
        cy.wait(1000);
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[4].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[4].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(' ');
        cy.wait(1000);
        self.postPage.typePostBody(' ');
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();
        cy.wait(1000);
        self.postPage.assertPostExists('(Untitled)');
        cy.wait(5000);
    })

    it('Programación de post normal', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[10].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[10].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickCalendarButton();
        cy.wait(1000);
        self.postPage.typePostDate('2022-'+PositiveData[10].month+'-'+PositiveData[10].day);
        cy.wait(1000);
        self.postPage.typePostHour(PositiveData[10].hour+':'+PositiveData[10].minute);
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.clickConfirmPublishPostButton();
        cy.wait(1000);
        self.postPage.clickBackToPostsButton();
        cy.wait(1000);
        self.postPage.clickShedulePost();
        cy.wait(1000);
        self.postPage.assertPostExists(PositiveData[8].Title);
        cy.wait(5000);
    })
    it('Programación de post dia fuera de frontera', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[11].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[11].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickCalendarButton();
        cy.wait(1000);
        self.postPage.typePostDate('2022-'+PositiveData[11].month+'-'+NegativeData[11].day);
        cy.wait(1000);
        self.postPage.typePostHour(PositiveData[11].hour+':'+PositiveData[11].minute);
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.assertAlertDateMessage('Invalid date');
        cy.wait(5000);
    })
    it('Programación de post mes fuera de frontera', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[12].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[12].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickCalendarButton();
        cy.wait(1000);
        self.postPage.typePostDate('2022-'+NegativeData[12].month+'-'+PositiveData[12].day);
        cy.wait(1000);
        self.postPage.typePostHour(PositiveData[12].hour+':'+PositiveData[12].minute);
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.assertAlertDateMessage('Invalid date');
        cy.wait(5000);
    })
    it('Programación de post hora fuera de frontera', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[12].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[12].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickCalendarButton();
        cy.wait(1000);
        self.postPage.typePostDate('2022-'+PositiveData[12].month+'-'+PositiveData[12].day);
        cy.wait(1000);
        self.postPage.typePostHour(NegativeData[12].hour+':'+PositiveData[12].minute);
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.assertAlertDateMessage('Must be in format: "15:00"');
        cy.wait(5000);
    })
    it('Programación de post minutos fuera de frontera', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[13].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[13].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickCalendarButton();
        cy.wait(1000);
        self.postPage.typePostDate('2022-'+PositiveData[13].month+'-'+PositiveData[13].day);
        cy.wait(1000);
        self.postPage.typePostHour(PositiveData[13].hour+':'+NegativeData[13].minute);
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.assertAlertDateMessage('Must be in format: "15:00"');
        cy.wait(5000);
    })
    it('Programación de post dia y hora fuera de frontera', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[14].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[14].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickCalendarButton();
        cy.wait(1000);
        self.postPage.typePostDate('2022-'+NegativeData[14].month+'-'+NegativeData[14].day);
        cy.wait(1000);
        self.postPage.typePostHour(NegativeData[14].hour+':'+NegativeData[14].minute);
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.assertAlertDateMessage('Invalid date');
        cy.wait(5000);
    })
    it('Programación de post fecha con letras', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[15].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[15].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickCalendarButton();
        cy.wait(1000);
        self.postPage.typePostDate(PositiveData[15].Title);
        cy.wait(1000);
        self.postPage.typePostHour(PositiveData[15].hour+':'+PositiveData[15].minute);
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.assertAlertDateMessage('Invalid date');
        cy.wait(5000);
    })
    it('Programación de post hora con letras', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[16].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[16].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickCalendarButton();
        cy.wait(1000);
        self.postPage.typePostDate('2022-'+PositiveData[16].month+'-'+PositiveData[16].day);
        cy.wait(1000);
        self.postPage.typePostHour(PositiveData[16].Title);
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.assertAlertDateMessage('Must be in format: "15:00"');
        cy.wait(5000);
    })
    it('Programación de post fecha con simbolo', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[17].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[17].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickCalendarButton();
        cy.wait(1000);
        self.postPage.typePostDate(NegativeData[17].Title);
        cy.wait(1000);
        self.postPage.typePostHour(PositiveData[17].hour+':'+PositiveData[17].minute);
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.assertAlertDateMessage('Invalid date');
        cy.wait(5000);
    })
    it('Programación de post hora con simbolo', () => {
        self.postPage.clickCreatePostButton();
        cy.wait(1000);
        self.postPage.typePostTitle(PositiveData[18].Title);
        cy.wait(1000);
        self.postPage.typePostBody(PositiveData[18].Body);
        cy.wait(1000);
        self.postPage.clickPublishPostOptionButton();
        cy.wait(1000);
        self.postPage.clickCalendarButton();
        cy.wait(1000);
        self.postPage.typePostDate('2022-'+PositiveData[18].month+'-'+PositiveData[18].day);
        cy.wait(1000);
        self.postPage.typePostHour(NegativeData[17].Title);
        cy.wait(1000);
        self.postPage.clickPublishPostButton();
        cy.wait(1000);
        self.postPage.assertAlertDateMessage('Must be in format: "15:00"');
        cy.wait(5000);
    })
    
})