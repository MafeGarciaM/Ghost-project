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
  
})
