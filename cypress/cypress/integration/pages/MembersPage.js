export default class MembersPage {

    constructor() {
    }

    membersButton_Click() {
        return cy.get(".relative>a[href='#/members/'].ember-view").click()
    }

    newMembersButton_Click() {
        return cy.get("a[href='#/members/new/'].ember-view.gh-btn.gh-btn-primary").click()
    }

    membersName_Click() {
        return cy.get("#member-name").click()
    }

    membersEmail_Click() {
        return cy.get("#member-email").click()
    }

    membersNote_Click() {
        return cy.get("#member-note").click()
    }

    membersName_type(text) {
        if(text !=''){
            return cy.get("#member-name").type(text, {force: true})
        }
    }

    membersName_clear() {
        return cy.get("#member-name").clear({force: true})
    }

    membersNote_type(text) {
        if(text !=''){
            return cy.get("#member-note").type(text, {force: true})
        }
    }

    membersNote_clear() {
        return cy.get("#member-note").clear({force: true})
    }

    membersEmail_type(text) {
        if(text !=''){
            return cy.get("#member-email").type(text, {force: true})
        }
    }

    membersEmail_clear() {
        return cy.get("#member-email").clear({force: true})
    }

    membersLabel_clear() {
        return cy.get(".ember-power-select-multiple-options>.ember-power-select-trigger-multiple-input").clear({force: true})
    }

    membersLabel_type(text) {
        if(text !=''){
            return cy.get(".ember-power-select-multiple-options>.ember-power-select-trigger-multiple-input").type(text, {force: true})
        }
    }

    buttonLabel_Click() {
        return cy.get(".ember-power-select-multiple-options>.ember-power-select-trigger-multiple-input").click()
    }

    buttonAddLabel_Click() {
        return cy.get(".ember-power-select-option").click()
    }

    buttonSave_Click() {
        return cy.get("button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view").click()
    }

    members_takeScreenshot(text) {
        return cy.screenshot(text, {overwrite: false}) 
    }
    
}