import { it } from 'mocha';
import { PagesPage, LoginPage } from './pages';

var gversion = '';
var data_source = '';
var pagesInfoPositive = [];
var pagesInfoNegative = [];

const { faker } = require('@faker-js/faker');

describe('2e2 ghost app pages', () => {

  before(() => {

    data_source = Cypress.env('data_source');
    console.log('DATA SOURCE:', data_source)

    switch(data_source) {
      case 'PRIORI':
        cy.fixture('pages_priori_positive').then((pagePositive) => {
          console.log('POSITIVO:', pagePositive);
          return pagesInfoPositive = pagePositive;
        })
        cy.fixture('pages_priori_negative').then((pageNegative) => {
          console.log('NEGATIVO:', pageNegative);
          return pagesInfoNegative = pageNegative;
        })
      break;
      case 'PSEUDO':
        faker.seed(1)
        pagesInfoPositive = Cypress._.range(1,500).map((_, k) => {
          return {
            pageTitle: faker.random.words(),
            pageBody: faker.lorem.paragraphs()
          }
        })
        pagesInfoNegative = Cypress._.range(1,500).map((_, k) => {
          return {
            pageTitle: faker.random.words(200),
            pageBody: faker.lorem.paragraphs(500)
          }
        })
      break;
      case 'RUNTIME':
        pagesInfoPositive = Cypress._.range(1,20).map((_, k) => {
          return {
            pageTitle: faker.random.words(),
            pageBody: faker.lorem.paragraphs()
          }
        })
        pagesInfoNegative = Cypress._.range(1,500).map((_, k) => {
          return {
            pageTitle: faker.random.words(200),
            pageBody: faker.lorem.paragraphs(500)
          }
        })
      break;
      default:
        pagesInfoPositive.push('FALLO')
      break;
    }
    
  })

  beforeEach(() => {
    gversion = Cypress.env('ghost_version');
    cy.visit(Cypress.env('login_url'))
    self.loginPage = new LoginPage();
    self.pagesPage = new PagesPage();
    loginPage.login(Cypress.env('username'), Cypress.env('password'))
  })
  
  // Borrar todas las paginas antes de ejecutar
  
  var i = 0;
  Cypress._.times(5,
    () => {
      it.only(`test create new page element, atempt ${i + 1}`, () => {
        self.pagesPage.clickPageSectionButton()
        self.pagesPage.takeScreenshot('ghost-3-42-create-page-step-1')
        cy.wait(3000)
        self.pagesPage.clickNewPageButton()
        cy.wait(2000)
        self.pagesPage.typePageName(pagesInfoPositive[i].pageTitle)
        self.pagesPage.typePageText(pagesInfoPositive[i].pageBody)
        self.pagesPage.takeScreenshot('ghost-3-42-create-page-step-2')
        cy.wait(2000)
        self.pagesPage.clickPublishMenu()
        cy.wait(2000)
        self.pagesPage.clickPublishButton()
        cy.wait(2000)
        self.pagesPage.clickPageSectionButton()
        self.pagesPage.takeScreenshot('ghost-3-42-create-page-step-3')
        cy.wait(1000)
        self.pagesPage.visitPage('test-page')
        cy.wait(5000)
        gversion === '3.42' ? self.pagesPage.assertPageExistsOld('Test Page') : self.pagesPage.assertPageExistsNew('Test Page')
        cy.wait(2000)
      });
      i++;
    }
  )

  var i = 0;
  Cypress._.times(5,
    () => {
      it.only(`test create new page with invalid data, atempt ${i + 1} `, () => {
        self.pagesPage.clickPageSectionButton()
        self.pagesPage.takeScreenshot('ghost-3-42-create-page-step-1')
        cy.wait(3000)
        self.pagesPage.clickNewPageButton()
        cy.wait(2000)
        self.pagesPage.typePageName(pagesInfoNegative[i].pageTitle)
        self.pagesPage.typePageText(pagesInfoNegative[i].pageBody)
        self.pagesPage.takeScreenshot('ghost-3-42-create-page-step-2')
        cy.wait(2000)
        self.pagesPage.clickPublishMenu()
        cy.wait(2000)
        self.pagesPage.clickPublishButton()
        cy.wait(2000)
        self.pagesPage.clickPageSectionButton()
        self.pagesPage.takeScreenshot('ghost-3-42-create-page-step-3')
        cy.wait(1000)
        self.pagesPage.visitPage('test-page')
        cy.wait(5000)
        gversion === '3.42' ? self.pagesPage.assertPageExistsOld('Test Page') : self.pagesPage.assertPageExistsNew('Test Page')
        cy.wait(2000)
      });
      i++;
    }
  )
  
  it('test create and edit page', () => {
    self.pagesPage.clickPageSectionButton()
    self.pagesPage.takeScreenshot('ghost-3-42-edit-page-step-1')
    cy.wait(2000)
    self.pagesPage.clickNewPageButton()
    cy.wait(2000)
    self.pagesPage.typePageName('Editable Page')
    cy.wait(1000)
    self.pagesPage.typePageText('This is an editable page created by Cypress.')
    self.pagesPage.takeScreenshot('ghost-3-42-edit-page-step-2')
    cy.wait(1000)
    self.pagesPage.clickPublishMenu()
    cy.wait(1000)
    self.pagesPage.clickPublishButton()
    cy.wait(2000)
    self.pagesPage.clickPageSectionButton()
    self.pagesPage.takeScreenshot('ghost-3-42-edit-page-step-3')
    cy.wait(1000)
    
    self.pagesPage.clickFirstPageItem()
    cy.wait(1000)
    self.pagesPage.clearPageName()
    cy.wait(1000)
    self.pagesPage.typePageName('Edited Page')
    cy.wait(1000)
    self.pagesPage.clearPageText()
    cy.wait(1000)
    self.pagesPage.typePageText('This is an edited page created by Cypress.')
    self.pagesPage.takeScreenshot('ghost-3-42-edit-page-step-4')
    cy.wait(1000)
    self.pagesPage.clickPublishMenu()
    cy.wait(1000)
    self.pagesPage.clickPublishButton()
    cy.wait(1000)
    self.pagesPage.clickPageSectionButton()
    self.pagesPage.takeScreenshot('ghost-3-42-edit-page-step-5')
    cy.wait(1000)
    self.pagesPage.visitPage('editable-page')
    cy.wait(5000)
    gversion === '3.42' ? self.pagesPage.assertPageExistsOld('Edited Page') : self.pagesPage.assertPageExistsNew('Edited Page')
    cy.wait(2000)
  })
  
  it('test unpublish a published page', () => {
    self.pagesPage.clickPageSectionButton()
    self.pagesPage.takeScreenshot('ghost-3-42-publish-page-step-1')
    cy.wait(2000)
    self.pagesPage.clickNewPageButton()
    cy.wait(2000)
    self.pagesPage.typePageName('Published Page')
    self.pagesPage.typePageText('This is a published page created by Cypress.')
    self.pagesPage.takeScreenshot('ghost-3-42-publish-page-step-2')
    cy.wait(1000)
    self.pagesPage.clickPublishMenu()
    cy.wait(1000)
    self.pagesPage.clickPublishButton()
    cy.wait(2000)
    self.pagesPage.clickPageSectionButton()
    self.pagesPage.takeScreenshot('ghost-3-42-publish-page-step-3')
    cy.wait(1000)
    
    self.pagesPage.clickFirstPageItem()
    cy.wait(2000)
    self.pagesPage.clickPublishMenu()
    cy.wait(2000)
    self.pagesPage.clickUnpublishRadioButton()
    self.pagesPage.takeScreenshot('ghost-3-42-publish-page-step-4')
    cy.wait(1000)
    self.pagesPage.clickPublishButton()
    cy.wait(1000)
    self.pagesPage.clickPageSectionButton()
    self.pagesPage.takeScreenshot('ghost-3-42-publish-page-step-5')
    cy.wait(1000)
    self.pagesPage.visitPage('published-page')
    cy.wait(5000)
    self.pagesPage.assertPageNotExists()
    cy.wait(2000)
  })

  it('Creación de página normal', () => {
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[0].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[0].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);        
    self.pagesPage.clickPublishPageButton(); 
    cy.wait(1000);       
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();  
    cy.wait(1000);
    self.pagesPage.assertpageExists(pagesInfoPositive[0].pageTitle);
    cy.wait(5000);
})

it('Creación de página con titulo largo', () => {
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoNegative[384].pageLongTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[0].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);        
    self.pagesPage.clickPublishPageButton(); 
    cy.wait(1000);       
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();  
    cy.wait(1000);
    self.pagesPage.assertpageExists(pagesInfoNegative[384].pageLongTitle);
    cy.wait(5000);
})

    it('Creación de página con Body largo', () => {
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[100].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);        
    self.pagesPage.clickPublishPageButton(); 
    cy.wait(1000);       
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.assertAlertMessage('request entity too large');
    cy.wait(5000);
})

it('Creación de página con Titulo y Body largos', () => {
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoNegative[384].pageLongTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody+
        pagesInfoPositive[111].pageBody+
        pagesInfoPositive[332].pageBody+pagesInfoPositive[374].pageBody+
        pagesInfoPositive[529].pageBody+pagesInfoPositive[635].pageBody+
        pagesInfoPositive[717].pageBody+pagesInfoPositive[925].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);        
    self.pagesPage.clickPublishPageButton(); 
    cy.wait(1000);       
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.assertAlertMessage('request entity too large');
    cy.wait(5000);
})

it('Creación de página con titulo con caracteres especiales', () => {
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoNegative[310].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[0].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);        
    self.pagesPage.clickPublishPageButton(); 
    cy.wait(1000);       
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();  
    cy.wait(1000);
    self.pagesPage.assertpageExists(pagesInfoNegative[310].pageTitle);
    cy.wait(5000);
})

it('Creación de página con body con caracteres especiales', () => {
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[310].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoNegative[191].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);        
    self.pagesPage.clickPublishPageButton(); 
    cy.wait(1000);       
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();  
    cy.wait(1000);
    self.pagesPage.assertpageExists(pagesInfoPositive[310].pageTitle);
    cy.wait(5000);
})

it('Creación de página con titulo y body con caracteres especiales', () => {
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoNegative[310].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoNegative[191].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);        
    self.pagesPage.clickPublishPageButton(); 
    cy.wait(1000);       
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();  
    cy.wait(1000);
    self.pagesPage.assertpageExists(pagesInfoPositive[310].pageTitle);
    cy.wait(5000);
})


it('Creación de un página con titulo vacío', () => {
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle('');
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[0].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);        
    self.pagesPage.clickPublishPageButton(); 
    cy.wait(1000);       
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();  
    cy.wait(1000);
    self.pagesPage.assertpageExists('(Untitled)');
    cy.wait(5000);
})

it('Creación de página con Body vacío', () => {
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[350].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody('');
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);        
    self.pagesPage.clickPublishPageButton(); 
    cy.wait(1000);       
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();  
    cy.wait(1000);
    self.pagesPage.assertpageExists(pagesInfoPositive[310].pageTitle);
    cy.wait(5000);
})

it('Creación de página sin titulo ni body', () => {
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle('');
    cy.wait(1000);
    self.pagesPage.typePageBody('');
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);        
    self.pagesPage.clickPublishPageButton(); 
    cy.wait(1000);       
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();  
    cy.wait(1000);
    self.pagesPage.assertpageExists('(Untitled)');
    cy.wait(5000);
})

it('Edición de página normal', () => {
    cy.wait(1000);
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[2].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[2].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[5].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody('');
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[5].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();
    cy.wait(1000);
    self.pagesPage.assertpageExists(pagesInfoPositive[5].pageTitle);
    cy.wait(5000);
})

it('Edición de página con titulo largo', () => {
    cy.wait(1000);
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[0].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[0].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoNegative[0].pageLongTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody('');
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[0].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.assertAlertMessage('Update failed: Title cannot be longer than 255 characters.');
    cy.wait(5000);
})

it('Edición de página con Body largo', () => {
    cy.wait(1000);
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[1].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[1].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[2].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody('');
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[1].pageBody+pagesInfoPositive[2].pageBody+pagesInfoPositive[3].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[2].pageBody+pagesInfoPositive[3].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[2].pageBody+pagesInfoPositive[3].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[2].pageBody+pagesInfoPositive[3].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[2].pageBody+pagesInfoPositive[3].pageBody+
        pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody+pagesInfoPositive[1].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.assertAlertMessage('request entity too large');
    cy.wait(5000);
})
it('Edición de página con Titulo y Body fuera de frontera', () => {
    cy.wait(1000);
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[132].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[132].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoNegative[411].pageLongTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody('');
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[223].pageBody+pagesInfoPositive[453].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[223].pageBody+pagesInfoPositive[453].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[223].pageBody+pagesInfoPositive[453].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[223].pageBody+pagesInfoPositive[453].pageBody+
        pagesInfoPositive[431].pageBody+pagesInfoPositive[123].pageBody+pagesInfoPositive[451].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.assertAlertMessage('Update failed: Title cannot be longer than 255 characters.');
    cy.wait(5000);
})

it('Edición de página con titulo con caracteres especiales', () => {
    cy.wait(1000);
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[114].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[114].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoNegative[114].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody('');
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[114].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();
    cy.wait(1000);
    self.pagesPage.assertpageExists(pagesInfoNegative[114].pageTitle);
    cy.wait(5000);
})

it('Edición de página con body con caracteres especiales', () => {
    cy.wait(1000);
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[234].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[234].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[57].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody('');
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoNegative[57].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();
    cy.wait(1000);
    self.pagesPage.assertpageExists(pagesInfoPositive[57].pageTitle);
    cy.wait(5000);
})

it('Edición de página con titulo y body con caracteres especiales', () => {
    cy.wait(1000);
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[476].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[476].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoNegative[546].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody('');
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoNegative[546].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();
    cy.wait(1000);
    self.pagesPage.assertpageExists(pagesInfoNegative[236].pageTitle);
    cy.wait(5000);
})

it('Edición de un página con titulo vacío', () => {
    cy.wait(1000);
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[145].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[145].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle('');
    cy.wait(1000);
    self.pagesPage.typePageBody('');
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[86].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();
    cy.wait(1000);
    self.pagesPage.assertpageExists('(Untitled)');
    cy.wait(5000);
})

it('Edición de un página con body vacío', () => {
    cy.wait(1000);
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[9].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[9].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[35].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody('');
    cy.wait(1000);
    self.pagesPage.typePageBody('');
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();
    cy.wait(1000);
    self.pagesPage.assertpageExists(pagesInfoPositive[35].pageTitle);
    cy.wait(5000);
})

it('Edición de página sin titulo ni body', () => {
    cy.wait(1000);
    self.pagesPage.clickCreatePageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(pagesInfoPositive[61].pageTitle);
    cy.wait(1000);
    self.pagesPage.typePageBody(pagesInfoPositive[61].pageBody);
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickConfirmPublishPageButton();
    cy.wait(1000);
    self.pagesPage.typePageTitle(' ');
    cy.wait(1000);
    self.pagesPage.typePageBody(' ');
    cy.wait(1000);
    self.pagesPage.clickPublishPageOptionButton();
    cy.wait(1000);
    self.pagesPage.clickPublishPageButton();
    cy.wait(1000);
    self.pagesPage.clickBackTopagesButton();
    cy.wait(1000);
    self.pagesPage.assertpageExists('(Untitled)');
    cy.wait(5000);
})
  
})
