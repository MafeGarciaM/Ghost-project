export default class PostPage {

    constructor() {
    }

    getCreatePostButton() {
        return cy.get('a[title="New post"]')
    }

    clickCreatePostButton() {
        return this.getCreatePostButton().click()
    }

    getPostTitleInput() {
        return cy.get('textarea[placeholder="Post title"]')
    }

    typePostTitle(postTitle) {
        return this.getPostTitleInput().type(`{selectAll}${postTitle}`)
    }
    getPostBodyInput() {
        return cy.get('div[data-placeholder="Begin writing your post..."]')
    }

    typePostBody(postBody) {
        return this.getPostBodyInput().type(`{selectAll}${postBody}`)
    }    
    getPublishPostOptionButton() {
        return cy.get('.gh-publishmenu-trigger')
    }
    clickPublishPostOptionButton() {
        return this.getPublishPostOptionButton().click()
    }
    getPublishPostButton() {
        return cy.get('.gh-publishmenu-button')
    }
    clickPublishPostButton() {
        return this.getPublishPostButton().click()
    }
    getConfirmPublishPostButton() {
        return cy.get('.gh-btn-black')
    }
    clickConfirmPublishPostButton() {
        return this.getConfirmPublishPostButton().click()
    }
    getBackToPostsButton() {
        return cy.get('.gh-editor-back-button')
    }
    clickBackToPostsButton() {
        return this.getBackToPostsButton().click()
    }
    getPostTitleButton() {
        return cy.get('.gh-post-list-title').first({ log: true })
    }
    clickPostTitleButton() {
        return this.getPostTitleButton().click()
    }
    getPostSettingsButton() {
        return cy.get('.settings-menu-toggle')
    }
    clickPostSettingsButton() {
        return this.getPostSettingsButton().click()
    }
    getDeletePostButton() {
        return cy.get('.settings-menu-delete-button')
    }
    clickDeletePostButton() {
        return this.getDeletePostButton().click()
    }
    getConfirmDeletePostButton() {
        return cy.get('.gh-btn-red')
    }
    clickConfirmDeletePostButton() {
        return this.getConfirmDeletePostButton().click()
    }
    getCalendarButton() {
        return cy.get('.gh-date-time-picker-date ')
    }
    clickCalendarButton() {
        return this.getCalendarButton().click()
    }
    getDateCalendar() {
        return cy.get('button[data-date="2022-06-20"]')
    }
    clickDateCalendar() {
        return this.getDateCalendar().click()
    }
    getShedulePost() {
        return cy.get('a[href="#/posts/?type=scheduled"]')
    }
    clickShedulePost() {
        return this.getShedulePost().click()
    }
    getPost(){
        return cy.get('.gh-content-entry-title')
    }
    assertPostExists(postTitle){
        expect(this.getPost().contains(postTitle)).to.exist  
    }
    getAlert(){
        return cy.get('.gh-alert-content')
    }
    assertAlertMessage(alert){
        expect(this.getAlert().contains(alert)).to.exist   
    }
    getDateLabel() {
        return cy.get('input[placeholder="YYYY-MM-DD"]')
    }
    typePostDate(date) {
        return this.getDateLabel().type(`{selectAll}${date}`)
    }
    getHourLabel() {
        return cy.get('.gh-date-time-picker-time input')
    }
    typePostHour(date) {
        return this.getHourLabel().type(`{selectAll}${date}`)
    }
    getDateError(){
        return cy.get('.gh-date-time-picker-error')
    }
    assertAlertDateMessage(alert){
        expect(this.getDateError().contains(alert)).to.exist   
    }


}
  
