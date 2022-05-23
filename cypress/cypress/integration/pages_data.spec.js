import { it } from 'mocha';
import { PagesPage, LoginPage } from './pages';

var gversion = '';
var data_source = '';
var pagesInfoPositive = [];

const { faker } = require('@faker-js/faker');

describe('2e2 ghost app pages', () => {

  before(() => {

    data_source = Cypress.env('data_source');

    switch(data_source) {
      case 'PRIORI':
        cy.fixture('pages_priori').then((page) => {
          pagesInfoPositive = page
        })
      break;
      case 'PSEUDO':
        faker.seed(1)
        pagesInfoPositive = Cypress._.range(1,20).map((_, k) => {
          return {
            pageTitle: faker.random.words(),
            pageBody: faker.lorem.paragraphs()
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

  it ('prueba', () => {
    console.log('MIS PAGINAS', pagesInfoPositive)
    console.log('PRIMERA PAGINA:', pagesInfoPositive[0])
    console.log('SEGUNDA PAGINA:', pagesInfoPositive[1])
  })
  
  // Borrar todas las paginas antes de ejecutar
  
  it('test create new page', () => {
    self.pagesPage.clickPageSectionButton()
    self.pagesPage.takeScreenshot('ghost-3-42-create-page-step-1')
    cy.wait(3000)
    self.pagesPage.clickNewPageButton()
    cy.wait(2000)
    self.pagesPage.typePageName(pagesInfoPositive[4].pageTitle)
    self.pagesPage.typePageText('This is a test page created by Cypress.')
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
  })

it('test create new page with emptu ttile', () => {
    self.pagesPage.clickPageSectionButton()
    self.pagesPage.takeScreenshot('ghost-3-42-create-page-step-1')
    cy.wait(3000)
    self.pagesPage.clickNewPageButton()
    cy.wait(2000)
    self.pagesPage.typePageName(pagesInfoPositive[0].pageTitle)
    self.pagesPage.typePageText('This is a test page created by Cypress.')
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
  })
  
  it('test create delete page', () => {
    self.pagesPage.clickPageSectionButton()
    self.pagesPage.takeScreenshot('ghost-3-42-delete-page-step-1')
    cy.wait(2000)
    self.pagesPage.clickNewPageButton()
    cy.wait(2000)
    self.pagesPage.typePageName('Deletable Page')
    self.pagesPage.typePageText('This is a deletable page created by Cypress.')
    self.pagesPage.takeScreenshot('ghost-3-42-delete-page-step-2')
    cy.wait(2000)
    self.pagesPage.clickPublishMenu()
    cy.wait(2000)
    self.pagesPage.clickPublishButton()
    cy.wait(2000)
    self.pagesPage.clickPageSectionButton()
    self.pagesPage.takeScreenshot('ghost-3-42-delete-page-step-3')
    cy.wait(2000)
    
    self.pagesPage.clickFirstPageItem()
    cy.wait(2000)
    gversion === '3.42' ? self.pagesPage.clickPageMenuOld() : self.pagesPage.clickPageMenuNew()
    self.pagesPage.takeScreenshot('ghost-3-42-delete-page-step-4')
    cy.wait(2000)
    self.pagesPage.clickPageDeleteButton()
    cy.wait(2000)
    self.pagesPage.clickConfirmDeleteButton()
    cy.wait(2000)
    self.pagesPage.takeScreenshot('ghost-3-42-delete-page-step-5')
    cy.wait(2000)
    self.pagesPage.visitPage('deletable-page')
    cy.wait(5000)
    self.pagesPage.assertPageNotExists()
    cy.wait(2000)
  })
  
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
