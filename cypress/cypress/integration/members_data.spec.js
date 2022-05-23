import { LoginPage } from './pages'
var gversion = '';
var data_source = '';
var pagesInfo = [];

const { faker } = require('@faker-js/faker');

describe('e2e ghost app members', () => {

  before(() => {

    data_source = Cypress.env('data_source');

    switch(data_source) {
      case 'PRIORI':
        cy.fixture('members_priori').then((page) => {
          pagesInfo = page
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
    gversion = Cypress.env('ghost_version');
        cy.visit(Cypress.env('login_url'))
        self.loginPage = new LoginPage();
        loginPage.login(Cypress.env('username'), Cypress.env('password'));
        cy.wait(1000);
  })

  it ('prueba', () => {
    console.log('MIS PAGINAS', pagesInfo)
    console.log('PRIMERA PAGINA:', pagesInfo[0])
    console.log('SEGUNDA PAGINA:', pagesInfo[1])
  })

    //Every it element is the 'then' of the Given-then-when process

    // it('Test create member right data', () => {
    //     if (gversion == "3.42"){
    //         cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
    //         cy.wait(300)
    //         cy.get(".gh-setting-action.flex.items-center.midgrey").click()
    //         cy.wait(300)
    //         cy.get("#labs-members").click({force: true})
    //         cy.wait(300)
    //     }

    //         const selector1 = gversion == "4.42" ? ".relative>a[href='#/members/'].ember-view" : "li>a[href='#/members/'].ember-view";
    //         cy.get(selector1).click()
    //         cy.wait(500)
    //         cy.screenshot('create/list-member'+gversion, {overwrite: false})
    //         cy.wait(1000)
    //         const selector2 = gversion == "4.42" ? "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-primary" : "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-green";
    //         cy.get(selector2).click()
    //         cy.wait(3000)
    //         cy.get("#member-name").click()

    //         const uuid = () => Cypress._.random(0, 99)
    //         const id = uuid()
    //         cy.get("#member-name").type(pagesInfo[3].Name, {force: true})
    //         cy.wait(500)
    //         cy.screenshot('create/new-member'+gversion, {overwrite: false})
    //         cy.wait(1000)
    //         cy.get("#member-email").click()
    //         cy.get("#member-email").type(pagesInfo[3].Email, {force: true})
    //         cy.wait(1000)
    //         const selector3 = gversion == "4.42" ? ".ember-power-select-multiple-options>.ember-power-select-trigger-multiple-input" : ".ember-power-select-multiple-options.sortable-objects.ember-view>.ember-power-select-trigger-multiple-input";
    //         cy.get(selector3).click()
    //         cy.get(selector3).type(pagesInfo[3].Labels, {force: true})
    //         cy.wait(1000)
    //         cy.get("#member-note").click()
    //         cy.get("#member-note").type(pagesInfo[3].Note, {force: true})
    //         cy.wait(1000)
    //         const selector4 = gversion == "4.42" ? "button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view" : "button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view";
    //         cy.get(selector4).click()
    //         cy.wait(3000)
    //         if (gversion == "3.42"){
    //             cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
    //             cy.wait(300)
    //             cy.get(".gh-setting-action.flex.items-center.midgrey").click()
    //             cy.wait(300)
    //             cy.get("#labs-members").click({force: true})
    //         } else {
    //             cy.get(".relative>a[href='#/members/'].ember-view").click()
    //         }
    //         cy.wait(9000)
        
    // })

        it('Test create member name email', () => {
        if (gversion == "3.42"){
            cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
            cy.wait(300)
            cy.get(".gh-setting-action.flex.items-center.midgrey").click()
            cy.wait(300)
            cy.get("#labs-members").click({force: true})
            cy.wait(300)
        }

            const selector1 = gversion == "4.42" ? ".relative>a[href='#/members/'].ember-view" : "li>a[href='#/members/'].ember-view";
            cy.get(selector1).click()
            cy.wait(500)
            cy.screenshot('create/list-member'+gversion, {overwrite: false})
            cy.wait(1000)
            const selector2 = gversion == "4.42" ? "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-primary" : "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-green";
            cy.get(selector2).click()
            cy.wait(3000)
            cy.get("#member-name").click()

            const uuid = () => Cypress._.random(0, 99)
            const id = uuid()
            cy.get("#member-name").type(pagesInfo[5].Name, {force: true})
            cy.wait(500)
            cy.screenshot('create/new-member'+gversion, {overwrite: false})
            cy.wait(1000)
            cy.get("#member-email").click()
            cy.get("#member-email").type(pagesInfo[5].Email, {force: true})
            cy.wait(1000)
            const selector4 = gversion == "4.42" ? "button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view" : "button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view";
            cy.get(selector4).click()
            cy.wait(3000)
            if (gversion == "3.42"){
                cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
                cy.wait(300)
                cy.get(".gh-setting-action.flex.items-center.midgrey").click()
                cy.wait(300)
                cy.get("#labs-members").click({force: true})
            } else {
                cy.get(".relative>a[href='#/members/'].ember-view").click()
            }
            cy.wait(9000)
        
    })

        it('Test create member email note', () => {
        if (gversion == "3.42"){
            cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
            cy.wait(300)
            cy.get(".gh-setting-action.flex.items-center.midgrey").click()
            cy.wait(300)
            cy.get("#labs-members").click({force: true})
            cy.wait(300)
        }

            const selector1 = gversion == "4.42" ? ".relative>a[href='#/members/'].ember-view" : "li>a[href='#/members/'].ember-view";
            cy.get(selector1).click()
            cy.wait(500)
            cy.screenshot('create/list-member'+gversion, {overwrite: false})
            cy.wait(1000)
            const selector2 = gversion == "4.42" ? "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-primary" : "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-green";
            cy.get(selector2).click()
            cy.wait(3000)
            cy.get("#member-email").click()
            cy.get("#member-email").type(pagesInfo[6].Email, {force: true})
            cy.wait(1000)
            cy.get("#member-note").click()
            cy.get("#member-note").type(pagesInfo[6].Note, {force: true})
            cy.wait(1000)
            const selector4 = gversion == "4.42" ? "button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view" : "button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view";
            cy.get(selector4).click()
            cy.wait(3000)
            if (gversion == "3.42"){
                cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
                cy.wait(300)
                cy.get(".gh-setting-action.flex.items-center.midgrey").click()
                cy.wait(300)
                cy.get("#labs-members").click({force: true})
            } else {
                cy.get(".relative>a[href='#/members/'].ember-view").click()
            }
            cy.wait(9000)
        
    })

        it('Test create member name note', () => {
        if (gversion == "3.42"){
            cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
            cy.wait(300)
            cy.get(".gh-setting-action.flex.items-center.midgrey").click()
            cy.wait(300)
            cy.get("#labs-members").click({force: true})
            cy.wait(300)
        }

            const selector1 = gversion == "4.42" ? ".relative>a[href='#/members/'].ember-view" : "li>a[href='#/members/'].ember-view";
            cy.get(selector1).click()
            cy.wait(500)
            cy.screenshot('create/list-member'+gversion, {overwrite: false})
            cy.wait(1000)
            const selector2 = gversion == "4.42" ? "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-primary" : "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-green";
            cy.get(selector2).click()
            cy.wait(3000)
            cy.get("#member-name").click()

            const uuid = () => Cypress._.random(0, 99)
            const id = uuid()
            cy.get("#member-name").type(pagesInfo[7].Name, {force: true})
            cy.wait(500)
            cy.screenshot('create/new-member'+gversion, {overwrite: false})
            cy.wait(1000)
            cy.get("#member-note").click()
            cy.get("#member-note").type(pagesInfo[7].Note, {force: true})
            cy.wait(1000)
            const selector4 = gversion == "4.42" ? "button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view" : "button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view";
            cy.get(selector4).click()
            cy.wait(3000)
            if (gversion == "3.42"){
                cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
                cy.wait(300)
                cy.get(".gh-setting-action.flex.items-center.midgrey").click()
                cy.wait(300)
                cy.get("#labs-members").click({force: true})
            } else {
                cy.get(".relative>a[href='#/members/'].ember-view").click()
            }
            cy.wait(9000)
        
    })

    // it('Test create member empty', () => {
    //     if (gversion == "3.42"){
    //         cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
    //         cy.wait(300)
    //         cy.get(".gh-setting-action.flex.items-center.midgrey").click()
    //         cy.wait(300)
    //         cy.get("#labs-members").click({force: true})
    //         cy.wait(300)
    //     }

    //         const selector1 = gversion == "4.42" ? ".relative>a[href='#/members/'].ember-view" : "li>a[href='#/members/'].ember-view";
    //         cy.get(selector1).click()
    //         cy.wait(500)
    //         cy.screenshot('create/list-member'+gversion, {overwrite: false})
    //         cy.wait(1000)
    //         const selector2 = gversion == "4.42" ? "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-primary" : "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-green";
    //         cy.get(selector2).click()
    //         cy.wait(3000)
    //         const selector4 = gversion == "4.42" ? "button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view" : "button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view";
    //         cy.get(selector4).click()
    //         cy.wait(9000)
    //         if (gversion == "3.42"){
    //             cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
    //             cy.wait(300)
    //             cy.get(".gh-setting-action.flex.items-center.midgrey").click()
    //             cy.wait(300)
    //             cy.get("#labs-members").click({force: true})
    //         } else {
    //             cy.get(".relative>a[href='#/members/'].ember-view").click()
    //         }
    //         cy.wait(9000)
        
    // })

        it('Test create member only email', () => {
        if (gversion == "3.42"){
            cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
            cy.wait(300)
            cy.get(".gh-setting-action.flex.items-center.midgrey").click()
            cy.wait(300)
            cy.get("#labs-members").click({force: true})
            cy.wait(300)
        }

            const selector1 = gversion == "4.42" ? ".relative>a[href='#/members/'].ember-view" : "li>a[href='#/members/'].ember-view";
            cy.get(selector1).click()
            cy.wait(500)
            cy.screenshot('create/list-member'+gversion, {overwrite: false})
            cy.wait(1000)
            const selector2 = gversion == "4.42" ? "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-primary" : "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-green";
            cy.get(selector2).click()
            cy.wait(3000)
            cy.get("#member-name").click()

            const uuid = () => Cypress._.random(0, 99)
            const id = uuid()
            cy.get("#member-email").click()
            cy.get("#member-email").type(pagesInfo[4].Email, {force: true})
            cy.wait(1000)
            const selector4 = gversion == "4.42" ? "button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view" : "button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view";
            cy.get(selector4).click()
            cy.wait(3000)
            if (gversion == "3.42"){
                cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
                cy.wait(300)
                cy.get(".gh-setting-action.flex.items-center.midgrey").click()
                cy.wait(300)
                cy.get("#labs-members").click({force: true})
            } else {
                cy.get(".relative>a[href='#/members/'].ember-view").click()
            }
            cy.wait(9000)
        
    })

        it('Test create member only label', () => {
        if (gversion == "3.42"){
            cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
            cy.wait(300)
            cy.get(".gh-setting-action.flex.items-center.midgrey").click()
            cy.wait(300)
            cy.get("#labs-members").click({force: true})
            cy.wait(300)
        }

            const selector1 = gversion == "4.42" ? ".relative>a[href='#/members/'].ember-view" : "li>a[href='#/members/'].ember-view";
            cy.get(selector1).click()
            cy.wait(500)
            cy.screenshot('create/list-member'+gversion, {overwrite: false})
            cy.wait(1000)
            const selector2 = gversion == "4.42" ? "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-primary" : "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-green";
            cy.get(selector2).click()
            cy.wait(3000)
            const selector3 = gversion == "4.42" ? ".ember-power-select-multiple-options>.ember-power-select-trigger-multiple-input" : ".ember-power-select-multiple-options.sortable-objects.ember-view>.ember-power-select-trigger-multiple-input";
            cy.get(selector3).click()
            cy.get(selector3).type(pagesInfo[3].Labels, {force: true})
            cy.wait(1000)
            const selector4 = gversion == "4.42" ? "button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view" : "button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view";
            cy.get(selector4).click()
            cy.wait(3000)
            if (gversion == "3.42"){
                cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
                cy.wait(300)
                cy.get(".gh-setting-action.flex.items-center.midgrey").click()
                cy.wait(300)
                cy.get("#labs-members").click({force: true})
            } else {
                cy.get(".relative>a[href='#/members/'].ember-view").click()
            }
            cy.wait(9000)
        
    })

    it('Test create member only email', () => {
        if (gversion == "3.42"){
            cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
            cy.wait(300)
            cy.get(".gh-setting-action.flex.items-center.midgrey").click()
            cy.wait(300)
            cy.get("#labs-members").click({force: true})
            cy.wait(300)
        }

            const selector1 = gversion == "4.42" ? ".relative>a[href='#/members/'].ember-view" : "li>a[href='#/members/'].ember-view";
            cy.get(selector1).click()
            cy.wait(500)
            cy.screenshot('create/list-member'+gversion, {overwrite: false})
            cy.wait(1000)
            const selector2 = gversion == "4.42" ? "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-primary" : "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-green";
            cy.get(selector2).click()
            cy.wait(3000)
            cy.get("#member-name").click()

            const uuid = () => Cypress._.random(0, 99)
            const id = uuid()
            cy.get("#member-email").click()
            cy.get("#member-email").type(pagesInfo[4].Email, {force: true})
            cy.wait(1000)
            const selector4 = gversion == "4.42" ? "button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view" : "button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view";
            cy.get(selector4).click()
            cy.wait(3000)
            if (gversion == "3.42"){
                cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
                cy.wait(300)
                cy.get(".gh-setting-action.flex.items-center.midgrey").click()
                cy.wait(300)
                cy.get("#labs-members").click({force: true})
            } else {
                cy.get(".relative>a[href='#/members/'].ember-view").click()
            }
            cy.wait(9000)
        
    })

        it('Test create member only note', () => {
        if (gversion == "3.42"){
            cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
            cy.wait(300)
            cy.get(".gh-setting-action.flex.items-center.midgrey").click()
            cy.wait(300)
            cy.get("#labs-members").click({force: true})
            cy.wait(300)
        }

            const selector1 = gversion == "4.42" ? ".relative>a[href='#/members/'].ember-view" : "li>a[href='#/members/'].ember-view";
            cy.get(selector1).click()
            cy.wait(500)
            cy.screenshot('create/list-member'+gversion, {overwrite: false})
            cy.wait(1000)
            const selector2 = gversion == "4.42" ? "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-primary" : "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-green";
            cy.get(selector2).click()
            cy.wait(3000)
            cy.get("#member-note").click()
            cy.get("#member-note").type(pagesInfo[5].Note, {force: true})
            cy.wait(1000)
            const selector4 = gversion == "4.42" ? "button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view" : "button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view";
            cy.get(selector4).click()
            cy.wait(3000)
            if (gversion == "3.42"){
                cy.get(".relative>a[href='#/settings/labs/'].ember-view").click()
                cy.wait(300)
                cy.get(".gh-setting-action.flex.items-center.midgrey").click()
                cy.wait(300)
                cy.get("#labs-members").click({force: true})
            } else {
                cy.get(".relative>a[href='#/members/'].ember-view").click()
            }
            cy.wait(9000)
        
    })

    //editar

    // it('Test Edit Member right Data', () => {
    //     if (gversion == "3.42"){
    //         cy.get("li>a[href='#/settings/labs/'].ember-view").click()
    //         cy.wait(300)
    //         cy.get(".gh-setting-action.flex.items-center.midgrey").click()
    //         cy.wait(300)
    //         cy.get("#labs-members").click({force: true})
    //         cy.wait(300)
    //     }
    //     const selector1 = gversion == "4.42" ? ".relative>a[href='#/members/'].ember-view" : "li>a[href='#/members/'].ember-view";
    //     cy.get(selector1).click()
    //     cy.wait(1000)
    //     cy.screenshot('edit/list-member'+gversion, {overwrite: false})
    //     cy.wait(1000)
    //     const selector2 = gversion == "4.42" ? "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-primary" : "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-green";
    //     cy.get(selector2).click()
    //     cy.wait(3000)
    //     cy.get("#member-name").click()
        
    //     cy.get("#member-name").type(pagesInfo[7].Name, {force: true})
    //     cy.wait(1000)
    //     cy.screenshot('edit/new-member'+gversion, {overwrite: false})
    //     cy.wait(1000)
    //     cy.get("#member-email").click()
    //     cy.get("#member-email").type(pagesInfo[7].Email, {force: true})
    //     cy.wait(1000)
    //     const selector3 = gversion == "4.42" ? ".ember-power-select-multiple-options>.ember-power-select-trigger-multiple-input" : ".ember-power-select-multiple-options.sortable-objects.ember-view>.ember-power-select-trigger-multiple-input";
    //     cy.get(selector3).click()
    //     cy.get(selector3).type(pagesInfo[7].Labels, {force: true})
    //     cy.wait(1000)
    //     cy.get("#member-note").click()
    //     cy.get("#member-note").type(pagesInfo[7].Note, {force: true})
    //     cy.wait(1000)
    //     const selector4 = gversion == "4.42" ? "button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view" : "button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view";
    //     cy.get(selector4).click()
    //     cy.wait(3000)
    //     cy.get(selector1).click()
    //     cy.wait(2000)
    //     const selector5 = gversion == "4.42" ? ".ma0.pa0.gh-members-list-name:first-child" : ".ma0.pa0.gh-members-list-name:first-child";
    //     cy.contains('.ma0.pa0.gh-members-list-name:first-child', pagesInfo[7].Name).click()
    //     cy.wait(5000)
    //     cy.get("#member-note").click()
    //     cy.get("#member-note").type('Nota editada', {force: true})
    //     cy.wait(2000)
    //     cy.get(selector4).click()
    //     cy.wait(5000)
    //     cy.screenshot('edit/edited-member'+gversion, {overwrite: false})
    //     if (gversion == "3.42"){
    //         cy.get("li>a[href='#/settings/labs/'].ember-view").click()
    //         cy.wait(300)
    //         cy.get(".gh-setting-action.flex.items-center.midgrey").click()
    //         cy.wait(300)
    //         cy.get("#labs-members").click({force: true})
    //     } else {
    //         cy.get("li>a[href='#/members/'].ember-view").click()
    //     }
    //     cy.wait(9000)
    // })

    //     it('Test Edit Member empty', () => {
    //     if (gversion == "3.42"){
    //         cy.get("li>a[href='#/settings/labs/'].ember-view").click()
    //         cy.wait(300)
    //         cy.get(".gh-setting-action.flex.items-center.midgrey").click()
    //         cy.wait(300)
    //         cy.get("#labs-members").click({force: true})
    //         cy.wait(300)
    //     }
    //     const selector1 = gversion == "4.42" ? ".relative>a[href='#/members/'].ember-view" : "li>a[href='#/members/'].ember-view";
    //     cy.get(selector1).click()
    //     cy.wait(1000)
    //     cy.screenshot('edit/list-member'+gversion, {overwrite: false})
    //     cy.wait(1000)
    //     const selector2 = gversion == "4.42" ? "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-primary" : "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-green";
    //     cy.get(selector2).click()
    //     cy.wait(3000)
    //     cy.get("#member-name").click()
        
    //     const selector4 = gversion == "4.42" ? "button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view" : "button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view";
    //     cy.get(selector4).click()
    //     cy.wait(9000)
    //     cy.get(selector1).click()
    //     cy.wait(2000)
    //     const selector5 = gversion == "4.42" ? ".ma0.pa0.gh-members-list-name:first-child" : ".ma0.pa0.gh-members-list-name:first-child";
    //     cy.contains('.ma0.pa0.gh-members-list-name:first-child', pagesInfo[7].Name).click()
    //     cy.wait(5000)
    //     cy.get("#member-note").click()
    //     cy.get("#member-note").type('Nota editada', {force: true})
    //     cy.wait(2000)
    //     cy.get(selector4).click()
    //     cy.wait(5000)
    //     cy.screenshot('edit/edited-member'+gversion, {overwrite: false})
    //     if (gversion == "3.42"){
    //         cy.get("li>a[href='#/settings/labs/'].ember-view").click()
    //         cy.wait(300)
    //         cy.get(".gh-setting-action.flex.items-center.midgrey").click()
    //         cy.wait(300)
    //         cy.get("#labs-members").click({force: true})
    //     } else {
    //         cy.get("li>a[href='#/members/'].ember-view").click()
    //     }
    //     cy.wait(9000)
    // })


    // it('Test Show member', () => {
    //     if (gversion == "3.42"){
    //         cy.get("li>a[href='#/settings/labs/'].ember-view").click()
    //         cy.wait(300)
    //         cy.get(".gh-setting-action.flex.items-center.midgrey").click()
    //         cy.wait(300)
    //         cy.get("#labs-members").click({force: true})
    //         cy.wait(300)
    //     }
    //     const selector1 = gversion == "4.42" ? ".relative>a[href='#/members/'].ember-view" : "li>a[href='#/members/'].ember-view";
    //     cy.get(selector1).click()
    //     cy.wait(1000)
    //     cy.screenshot('show/list-member'+gversion, {overwrite: false})
    //     cy.wait(1000)
    //     const selector2 = gversion == "4.42" ? "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-primary" : "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-green";
    //     cy.get(selector2).click()
    //     cy.wait(3000)
    //     cy.get("#member-name").click()
    //     var text = "";
    //     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //     for (var i = 0; i < 10; i++)
    //         text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     cy.get("#member-name").type(text, {force: true})
    //     cy.wait(1000)
    //     cy.screenshot('show/new-member'+gversion, {overwrite: false})
    //     cy.wait(1000)
    //     cy.get("#member-email").click()
    //     cy.get("#member-email").type(text+'@pruebas.com', {force: true})
    //     cy.wait(1000)
    //     const selector3 = gversion == "4.42" ? ".ember-power-select-multiple-options>.ember-power-select-trigger-multiple-input" : ".ember-power-select-multiple-options.sortable-objects.ember-view>.ember-power-select-trigger-multiple-input";
    //     cy.get(selector3).click()
    //     cy.get(selector3).type('Label nueva', {force: true})
    //     cy.wait(1000)
    //     cy.get("#member-note").click()
    //     cy.get("#member-note").type('Nota nueva', {force: true})
    //     cy.wait(1000)
    //     const selector4 = gversion == "4.42" ? "button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view" : "button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view";
    //     cy.get(selector4).click()
    //     cy.wait(3000)
    //     cy.get(selector1).click()
    //     cy.wait(2000)
    //     const selector5 = gversion == "4.42" ? ".ma0.pa0.gh-members-list-name:first-child" : ".ma0.pa0.gh-members-list-name:first-child";
    //     cy.contains('.ma0.pa0.gh-members-list-name:first-child', text).click()
    //     cy.wait(5000)
    //     cy.screenshot('show/edited-member'+gversion, {overwrite: false})
    //     if (gversion == "3.42"){
    //         cy.get("li>a[href='#/settings/labs/'].ember-view").click()
    //         cy.wait(300)
    //         cy.get(".gh-setting-action.flex.items-center.midgrey").click()
    //         cy.wait(300)
    //         cy.get("#labs-members").click({force: true})
    //     } else {
    //         cy.get("li>a[href='#/members/'].ember-view").click()
    //     }
    //     cy.wait(7000)
    // })

    // it('Test delete member', () => {
    //     if (gversion == "3.42"){
    //         cy.get("li>a[href='#/settings/labs/'].ember-view").click()
    //         cy.wait(300)
    //         cy.get(".gh-setting-action.flex.items-center.midgrey").click()
    //         cy.wait(300)
    //         cy.get("#labs-members").click({force: true})
    //         cy.wait(300)
    //     }
    //     const selector1 = gversion == "4.42" ? ".relative>a[href='#/members/'].ember-view" : "li>a[href='#/members/'].ember-view";
    //     cy.get(selector1).click()
    //     cy.wait(1000)
    //     cy.screenshot('delete/list-member'+gversion, {overwrite: false})
    //     cy.wait(1000)
    //     const selector2 = gversion == "4.42" ? "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-primary" : "a[href='#/members/new/'].ember-view.gh-btn.gh-btn-green";
    //     cy.get(selector2).click()
    //     cy.wait(3000)
    //     cy.get("#member-name").click()
    //     var text = "";
    //     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    //     for (var i = 0; i < 10; i++)
    //         text += possible.charAt(Math.floor(Math.random() * possible.length));
    //     cy.get("#member-name").type(text, {force: true})
    //     cy.wait(1000)
    //     cy.screenshot('delete/new-member'+gversion, {overwrite: false})
    //     cy.wait(1000)
    //     cy.get("#member-email").click()
    //     cy.get("#member-email").type(text+'@pruebas.com', {force: true})
    //     cy.wait(1000)
    //     const selector3 = gversion == "4.42" ? ".ember-power-select-multiple-options>.ember-power-select-trigger-multiple-input" : ".ember-power-select-multiple-options.sortable-objects.ember-view>.ember-power-select-trigger-multiple-input";
    //     cy.get(selector3).click()
    //     cy.get(selector3).type('Label nueva', {force: true})
    //     cy.wait(1000)
    //     cy.get("#member-note").click()
    //     cy.get("#member-note").type('Nota nueva', {force: true})
    //     cy.wait(1000)
    //     const selector4 = gversion == "4.42" ? "button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view" : "button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view";
    //     cy.get(selector4).click()
    //     cy.wait(3000)
    //     cy.get(selector1).click()
    //     cy.wait(2000)
    //     const selector5 = gversion == "4.42" ? ".ma0.pa0.gh-members-list-name:first-child" : ".ma0.pa0.gh-members-list-name:first-child";
    //     cy.contains(selector5, text).click()
    //     cy.wait(3000)
    //     cy.screenshot('delete/edited-member'+gversion, {overwrite: false})

    //     const selector6 = gversion == "4.42" ? ".gh-btn.gh-btn-icon.icon-only.gh-btn-action-icon.closed.ember-view" : ".w-60>.gh-btn.gh-btn-red.gh-btn-icon.mt14";
    //     cy.get(selector6).click()
    //     cy.wait(1000)
    //     cy.screenshot('delete/delete-member'+gversion, {overwrite: false})
    //     cy.wait(2000)
        
    //     const selector7 = gversion == "4.42" ? "ul.dropdown.gh-member-actions-menu.dropdown-menu.dropdown-triangle-top-right.open.fade-in-scale.open.ember-view>li>button.mr2>span.red" : ".modal-footer>.gh-btn.gh-btn-red.gh-btn-icon.ember-view";
    //     cy.get(selector7).click()
    //     cy.wait(2000)
    //     if (gversion == "4.42"){
    //         cy.get("div.modal-footer>button.gh-btn.gh-btn-red.gh-btn-icon.ember-view").click()
    //         cy.wait(3000)
    //     }
    //     cy.screenshot('delete/list-new-member-after'+gversion, {overwrite: false})
    //     cy.wait(2000)
    //     cy.get('h3').contains(text).should('not.exist');
    //     cy.wait(5000)
    //     if (gversion == "3.42"){
    //         cy.get("li>a[href='#/settings/labs/'].ember-view").click()
    //         cy.wait(300)
    //         cy.get(".gh-setting-action.flex.items-center.midgrey").click()
    //         cy.wait(300)
    //         cy.get("#labs-members").click({force: true})
    //     } else {
    //         cy.get("li>a[href='#/members/'].ember-view").click()
    //     }
    //     cy.wait(7000)
    // })
})