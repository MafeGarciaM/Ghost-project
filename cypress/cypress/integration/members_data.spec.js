import {  MembersPage, LoginPage } from './pages'
var gversion = '';
var data_source = '';
var pagesInfo = [];

const { faker } = require('@faker-js/faker');

describe('e2e ghost app members', () => {

  const { faker } = require('@faker-js/faker');
  var data_source = '';
  var PositiveData = [];
  var NegativeData = [];

  before(() => {
      data_source = Cypress.env('data_source');

      switch(data_source) {
        case 'PRIORI':
          cy.fixture('members_positive').then((post) => {
            PositiveData = post
          })
          cy.fixture('members_negative').then((post) => {
              NegativeData = post
            })
        break;
        case 'PSEUDO':
          faker.seed(1)
          PositiveData = Cypress._.range(1,20).map((_, k) => {
            return {
              Name: faker.name.findName(),
              Email: faker.internet.email(),
              Labels: faker.random.word(),
              Note: faker.lorem.paragraphs(2,false),
            }
          }),
          NegativeData = Cypress._.range(1,500).map((_, k) => {
              return {
                Name: faker.name.findName(),
                Email: faker.internet.email(),
                Labels: faker.random.word(),
                Note: faker.lorem.paragraphs(2,false),
              }
            })
        break; 
        case 'RUNTIME':
          PositiveData = Cypress._.range(1,20).map((_, k) => {
              return {
                Name: faker.name.findName(),
                Email: faker.internet.email(),
                Labels: faker.random.word(),
                Note: faker.lorem.paragraphs(2,false),
              }
            }),
            NegativeData = Cypress._.range(1,500).map((_, k) => {
                return {
                  Name: faker.name.findName(),
                  Email: faker.internet.email(),
                  Labels: faker.random.word(),
                  Note: faker.lorem.paragraphs(2,false),                }
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
        self.membersPage = new MembersPage();      
        loginPage.login(Cypress.env('username'), Cypress.env('password'));
        cy.wait(1000);
  })

//1
    it('Test crear miembro correcto', () => {
 
      self.membersPage.membersButton_Click();
      cy.wait(500)
      self.membersPage.members_takeScreenshot('create/list-member'+gversion);
      cy.wait(1000)
      self.membersPage.newMembersButton_Click();
      cy.wait(3000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_type(PositiveData[0].Name);
      cy.wait(200)
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_type(PositiveData[0].Email);
      cy.wait(200)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersLabel_type(PositiveData[0].Labels);
      cy.wait(100)
      self.membersPage.buttonAddLabel_Click()
      cy.wait(100)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersNote_Click();
      cy.wait(100)
      self.membersPage.membersNote_type(PositiveData[0].Note);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(1000)
      self.membersPage.membersButton_Click();
      cy.wait(9000)
        
    })
//2
it('Test crear miembro nombre repetido', () => {
 
  self.membersPage.membersButton_Click();
  cy.wait(500)
  self.membersPage.members_takeScreenshot('create/list-member'+gversion);
  cy.wait(1000)
  self.membersPage.newMembersButton_Click();
  cy.wait(3000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_type(PositiveData[1].Name);
  cy.wait(200)
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_type(PositiveData[1].Email);
  cy.wait(200)
  self.membersPage.buttonLabel_Click()
  cy.wait(100)
  self.membersPage.membersLabel_type(PositiveData[1].Labels);
  cy.wait(100)
  self.membersPage.buttonAddLabel_Click()
  cy.wait(100)
  self.membersPage.buttonLabel_Click()
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_type(PositiveData[1].Note);
  cy.wait(200)
  self.membersPage.buttonSave_Click()
  cy.wait(1000)
  self.membersPage.membersButton_Click();
  cy.wait(500)
  self.membersPage.members_takeScreenshot('create/list-member'+gversion);
  cy.wait(1000)
  self.membersPage.newMembersButton_Click();
  cy.wait(3000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_type(PositiveData[1].Name);
  cy.wait(200)
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_type(PositiveData[1].Email);
  cy.wait(200)
  self.membersPage.buttonLabel_Click()
  cy.wait(100)
  self.membersPage.membersLabel_type(PositiveData[1].Labels);
  cy.wait(100)
  self.membersPage.buttonAddLabel_Click()
  cy.wait(100)
  self.membersPage.buttonLabel_Click()
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_type(PositiveData[1].Note);
  cy.wait(200)
  self.membersPage.buttonSave_Click()
  cy.wait(1000)
  self.membersPage.membersButton_Click();
  cy.wait(9000)
    
})

//3
it('Test crear miembro solo nombre', () => {
 
  self.membersPage.membersButton_Click();
  cy.wait(500)
  self.membersPage.members_takeScreenshot('create/list-member'+gversion);
  cy.wait(1000)
  self.membersPage.newMembersButton_Click();
  cy.wait(3000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_type(PositiveData[2].Name);
  cy.wait(200)
  self.membersPage.buttonSave_Click()
  cy.wait(1000)
  self.membersPage.membersButton_Click();
  cy.wait(9000)
    
})

//4
it('Test crear miembro solo email', () => {
 
  self.membersPage.membersButton_Click();
  cy.wait(500)
  self.membersPage.members_takeScreenshot('create/list-member'+gversion);
  cy.wait(1000)
  self.membersPage.newMembersButton_Click();
  cy.wait(3000)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_type(PositiveData[3].Email);
  cy.wait(200)
  self.membersPage.buttonSave_Click()
  cy.wait(1000)
  self.membersPage.membersButton_Click();
  cy.wait(9000)
    
})

//5
it('Test crear miembro solo Label', () => {
 
  self.membersPage.membersButton_Click();
  cy.wait(500)
  self.membersPage.members_takeScreenshot('create/list-member'+gversion);
  cy.wait(1000)
  self.membersPage.newMembersButton_Click();
  cy.wait(3000)
  self.membersPage.buttonLabel_Click()
  cy.wait(100)
  self.membersPage.membersLabel_type(PositiveData[4].Labels);
  cy.wait(1000)
  self.membersPage.buttonAddLabel_Click()
  cy.wait(100)
  self.membersPage.buttonSave_Click()
  cy.wait(1000)
  self.membersPage.membersButton_Click();
  cy.wait(9000)
    
})

//6
it('Test crear miembro solo nota', () => {
 
  self.membersPage.membersButton_Click();
  cy.wait(500)
  self.membersPage.members_takeScreenshot('create/list-member'+gversion);
  cy.wait(1000)
  self.membersPage.newMembersButton_Click();
  cy.wait(2000)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_type(PositiveData[5].Labels);
  cy.wait(200)
  self.membersPage.buttonSave_Click()
  cy.wait(1000)
  self.membersPage.membersButton_Click();
  cy.wait(9000)
    
})

//7
it('Test crear miembro todo vacio', () => {
 
  self.membersPage.membersButton_Click();
  cy.wait(500)
  self.membersPage.members_takeScreenshot('create/list-member'+gversion);
  cy.wait(1000)
  self.membersPage.newMembersButton_Click();
  cy.wait(3000)
  self.membersPage.buttonSave_Click()
  cy.wait(1000)
  cy.wait(9000)
    
})

//8
    it('Test crear miembro nombre fuera de frontera', () => {
 
      self.membersPage.membersButton_Click();
      cy.wait(500)
      self.membersPage.members_takeScreenshot('create/list-member'+gversion);
      cy.wait(1000)
      self.membersPage.newMembersButton_Click();
      cy.wait(3000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_type(PositiveData[6].Note+PositiveData[7].Note+PositiveData[8].Note+PositiveData[9].Note+PositiveData[10].Note+PositiveData[11].Note+PositiveData[12].Note+PositiveData[13].Note+PositiveData[14].Note+PositiveData[15].Note);
      cy.wait(200)
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_type(PositiveData[6].Email);
      cy.wait(200)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersLabel_type(PositiveData[6].Labels);
      cy.wait(100)
      self.membersPage.buttonAddLabel_Click()
      cy.wait(100)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersNote_Click();
      cy.wait(100)
      self.membersPage.membersNote_type(PositiveData[6].Note);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(1000)
      self.membersPage.membersButton_Click();
      cy.wait(9000)
        
    })

  //9
  it('Test crear miembro nombre fuera de frontera', () => {
 
    self.membersPage.membersButton_Click();
    cy.wait(500)
    self.membersPage.members_takeScreenshot('create/list-member'+gversion);
    cy.wait(1000)
    self.membersPage.newMembersButton_Click();
    cy.wait(3000)
    self.membersPage.membersName_Click();
    cy.wait(100)
    self.membersPage.membersName_type(PositiveData[6].Name);
    cy.wait(200)
    cy.wait(100)
    self.membersPage.membersEmail_Click();
    cy.wait(100)
    self.membersPage.membersEmail_type(PositiveData[6].Note+PositiveData[7].Note+PositiveData[8].Note+PositiveData[9].Note+PositiveData[10].Note+PositiveData[11].Note+PositiveData[12].Note+PositiveData[13].Note+PositiveData[14].Note+PositiveData[15].Note+PositiveData[6].Email);
    cy.wait(200)
    self.membersPage.buttonLabel_Click()
    cy.wait(100)
    self.membersPage.membersLabel_type(PositiveData[6].Labels);
    cy.wait(100)
    self.membersPage.buttonAddLabel_Click()
    cy.wait(100)
    self.membersPage.buttonLabel_Click()
    cy.wait(100)
    self.membersPage.membersNote_Click();
    cy.wait(100)
    self.membersPage.membersNote_type(PositiveData[6].Note);
    cy.wait(200)
    self.membersPage.buttonSave_Click()
    cy.wait(1000)
    self.membersPage.membersButton_Click();
    cy.wait(9000)
      
  })

//10
it('Test crear miembro label fuera de frontera', () => {
 
    self.membersPage.membersButton_Click();
    cy.wait(500)
    self.membersPage.members_takeScreenshot('create/list-member'+gversion);
    cy.wait(1000)
    self.membersPage.newMembersButton_Click();
    cy.wait(3000)
    self.membersPage.membersName_Click();
    cy.wait(100)
    self.membersPage.membersName_type(PositiveData[7].Name);
    cy.wait(200)
    cy.wait(100)
    self.membersPage.membersEmail_Click();
    cy.wait(100)
    self.membersPage.membersEmail_type(PositiveData[7].Email);
    cy.wait(200)
    self.membersPage.buttonLabel_Click()
    cy.wait(100)
    self.membersPage.membersLabel_type(PositiveData[7].Note+PositiveData[7].Note+PositiveData[8].Note+PositiveData[9].Note+PositiveData[10].Note+PositiveData[11].Note+PositiveData[12].Note+PositiveData[13].Note+PositiveData[14].Note+PositiveData[15].Note+PositiveData[6].Email);
    cy.wait(100)
    self.membersPage.buttonAddLabel_Click()
    cy.wait(100)
    self.membersPage.buttonLabel_Click()
    cy.wait(100)
    self.membersPage.membersNote_Click();
    cy.wait(100)
    self.membersPage.membersNote_type(PositiveData[7].Note);
    cy.wait(200)
    self.membersPage.buttonSave_Click()
    cy.wait(1000)
    self.membersPage.membersButton_Click();
    cy.wait(9000)
      
  })

//11
  it('Test crear miembro note fuera de frontera', () => {
 
    self.membersPage.membersButton_Click();
    cy.wait(500)
    self.membersPage.members_takeScreenshot('create/list-member'+gversion);
    cy.wait(1000)
    self.membersPage.newMembersButton_Click();
    cy.wait(3000)
    self.membersPage.membersName_Click();
    cy.wait(100)
    self.membersPage.membersName_type(PositiveData[8].Name);
    cy.wait(200)
    cy.wait(100)
    self.membersPage.membersEmail_Click();
    cy.wait(100)
    self.membersPage.membersEmail_type(PositiveData[8].Email);
    cy.wait(200)
    self.membersPage.buttonLabel_Click()
    cy.wait(100)
    self.membersPage.membersLabel_type(PositiveData[8].Labels);
    cy.wait(100)
    self.membersPage.buttonAddLabel_Click()
    cy.wait(100)
    self.membersPage.buttonLabel_Click()
    cy.wait(100)
    self.membersPage.membersNote_Click();
    cy.wait(100)
    self.membersPage.membersNote_type(PositiveData[8].Note+PositiveData[7].Note+PositiveData[8].Note+PositiveData[9].Note+PositiveData[10].Note+PositiveData[11].Note+PositiveData[12].Note+PositiveData[13].Note+PositiveData[14].Note+PositiveData[15].Note+PositiveData[6].Email);
    cy.wait(200)
    self.membersPage.buttonSave_Click()
    cy.wait(1000)
    self.membersPage.membersButton_Click();
    cy.wait(9000)
      
  })

//12
    it('Test crear miembro nombre caracteres especiales', () => {
 
      self.membersPage.membersButton_Click();
      cy.wait(500)
      self.membersPage.members_takeScreenshot('create/list-member'+gversion);
      cy.wait(1000)
      self.membersPage.newMembersButton_Click();
      cy.wait(3000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_type(NegativeData[0].Name);
      cy.wait(200)
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_type(NegativeData[0].Email);
      cy.wait(200)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersLabel_type(NegativeData[0].Labels);
      cy.wait(100)
      self.membersPage.buttonAddLabel_Click()
      cy.wait(100)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersNote_Click();
      cy.wait(100)
      self.membersPage.membersNote_type(NegativeData[0].Note);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(1000)
      self.membersPage.membersButton_Click();
      cy.wait(9000)
        
    })

  //13
     it('Test crear miembro email caracteres especiales', () => {
 
      self.membersPage.membersButton_Click();
      cy.wait(500)
      self.membersPage.members_takeScreenshot('create/list-member'+gversion);
      cy.wait(1000)
      self.membersPage.newMembersButton_Click();
      cy.wait(3000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_type(NegativeData[71].Name);
      cy.wait(200)
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_type(NegativeData[71].Email);
      cy.wait(200)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersLabel_type(NegativeData[71].Labels);
      cy.wait(100)
      self.membersPage.buttonAddLabel_Click()
      cy.wait(100)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersNote_Click();
      cy.wait(100)
      self.membersPage.membersNote_type(NegativeData[71].Note);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(1000)
      self.membersPage.membersButton_Click();
      cy.wait(9000)
        
    })

//14
         it('Test crear miembro label caracteres especiales', () => {
 
          self.membersPage.membersButton_Click();
          cy.wait(500)
          self.membersPage.members_takeScreenshot('create/list-member'+gversion);
          cy.wait(1000)
          self.membersPage.newMembersButton_Click();
          cy.wait(3000)
          self.membersPage.membersName_Click();
          cy.wait(100)
          self.membersPage.membersName_type(NegativeData[161].Name);
          cy.wait(200)
          cy.wait(100)
          self.membersPage.membersEmail_Click();
          cy.wait(100)
          self.membersPage.membersEmail_type(NegativeData[161].Email);
          cy.wait(200)
          self.membersPage.buttonLabel_Click()
          cy.wait(100)
          self.membersPage.membersLabel_type(NegativeData[161].Labels);
          cy.wait(100)
          self.membersPage.buttonAddLabel_Click()
          cy.wait(100)
          self.membersPage.buttonLabel_Click()
          cy.wait(100)
          self.membersPage.membersNote_Click();
          cy.wait(100)
          self.membersPage.membersNote_type(NegativeData[161].Note);
          cy.wait(200)
          self.membersPage.buttonSave_Click()
          cy.wait(1000)
          self.membersPage.membersButton_Click();
          cy.wait(9000)
            
        })

//15
    it('Test crear miembro note caracteres especiales', () => {
 
      self.membersPage.membersButton_Click();
      cy.wait(500)
      self.membersPage.members_takeScreenshot('create/list-member'+gversion);
      cy.wait(1000)
      self.membersPage.newMembersButton_Click();
      cy.wait(3000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_type(NegativeData[242].Name);
      cy.wait(200)
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_type(NegativeData[242].Email);
      cy.wait(200)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersLabel_type(NegativeData[242].Labels);
      cy.wait(100)
      self.membersPage.buttonAddLabel_Click()
      cy.wait(100)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersNote_Click();
      cy.wait(100)
      self.membersPage.membersNote_type(NegativeData[242].Note);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(1000)
      self.membersPage.membersButton_Click();
      cy.wait(9000)      
    }) 

//16
    it('Test crear miembro todo numeros', () => {
 
      self.membersPage.membersButton_Click();
      cy.wait(500)
      self.membersPage.members_takeScreenshot('create/list-member'+gversion);
      cy.wait(1000)
      self.membersPage.newMembersButton_Click();
      cy.wait(3000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_type(NegativeData[333].Name);
      cy.wait(200)
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_type(NegativeData[333].Email);
      cy.wait(200)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersLabel_type(NegativeData[333].Labels);
      cy.wait(100)
      self.membersPage.buttonAddLabel_Click()
      cy.wait(100)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersNote_Click();
      cy.wait(100)
      self.membersPage.membersNote_type(NegativeData[333].Note);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(1000)
      self.membersPage.membersButton_Click();
      cy.wait(9000)      
    })
    
//17
    it('Test crear miembro todo numeros email normal', () => {
 
        self.membersPage.membersButton_Click();
        cy.wait(500)
         self.membersPage.members_takeScreenshot('create/list-member'+gversion);
        cy.wait(1000)
        self.membersPage.newMembersButton_Click();
        cy.wait(3000)
        self.membersPage.membersName_Click();
        cy.wait(100)
        self.membersPage.membersName_type(NegativeData[333].Name);
        cy.wait(200)
        cy.wait(100)
        self.membersPage.membersEmail_Click();
        cy.wait(100)
        self.membersPage.membersEmail_type(NegativeData[333].Email+"@prueba.com");
        cy.wait(200)
        self.membersPage.buttonLabel_Click()
        cy.wait(100)
        self.membersPage.membersLabel_type(NegativeData[333].Labels);
        cy.wait(100)
        self.membersPage.buttonAddLabel_Click()
        cy.wait(100)
        self.membersPage.buttonLabel_Click()
        cy.wait(100)
        self.membersPage.membersNote_Click();
        cy.wait(100)
        self.membersPage.membersNote_type(NegativeData[333].Note);
        cy.wait(200)
        self.membersPage.buttonSave_Click()
        cy.wait(1000)
        self.membersPage.membersButton_Click();
        cy.wait(9000)      
    })

//18
    it('Test editar miembro todo vacio', () => {
 
      self.membersPage.membersButton_Click();
      cy.wait(500)
      self.membersPage.members_takeScreenshot('create/list-member'+gversion);
      cy.wait(1000)
      self.membersPage.newMembersButton_Click();
      cy.wait(3000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_type(PositiveData[10].Name);
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_type(PositiveData[10].Email);
      cy.wait(100)
      self.membersPage.membersNote_Click();
      cy.wait(100)
      self.membersPage.membersNote_type(PositiveData[10].Note);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(3000)
      self.membersPage.membersButton_Click();
      cy.contains('.ma0.pa0.gh-members-list-name:first-child', PositiveData[10].Name).click()
      cy.wait(1000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_clear();
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_clear();
      cy.wait(100)
      self.membersPage.membersNote_Click();
      cy.wait(100)
      self.membersPage.membersNote_clear();
      cy.wait(100)
      self.membersPage.buttonSave_Click()
      cy.wait(9000)
        
    })

//19
it('Test editar miembro todo normal', () => {
 
  self.membersPage.membersButton_Click();
  cy.wait(500)
  self.membersPage.members_takeScreenshot('create/list-member'+gversion);
  cy.wait(1000)
  self.membersPage.newMembersButton_Click();
  cy.wait(3000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_type(PositiveData[11].Name);
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_type(PositiveData[11].Email);
  cy.wait(100)
  self.membersPage.buttonLabel_Click()
  cy.wait(100)
  self.membersPage.membersLabel_type(PositiveData[11].Labels);
  cy.wait(100)
  self.membersPage.buttonAddLabel_Click()
  cy.wait(100)
  self.membersPage.buttonLabel_Click()
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_type(PositiveData[11].Note);
  cy.wait(200)
  self.membersPage.buttonSave_Click()
  cy.wait(3000)
  self.membersPage.membersButton_Click();
  cy.contains('.ma0.pa0.gh-members-list-name:first-child', PositiveData[11].Name).click()
  cy.wait(1000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_clear();
  cy.wait(100)
  self.membersPage.membersName_type(PositiveData[12].Name);
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_clear();
  cy.wait(100)
  self.membersPage.membersEmail_type(PositiveData[12].Email);
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_clear();
  cy.wait(100)
  self.membersPage.membersNote_type(PositiveData[12].Note);
  cy.wait(100)
  self.membersPage.buttonSave_Click()
  cy.wait(200)
  self.membersPage.membersButton_Click();
  cy.wait(9000)
    
})

//20
it('Test editar miembro dejar solo label', () => {
 
  self.membersPage.membersButton_Click();
  cy.wait(500)
  self.membersPage.members_takeScreenshot('create/list-member'+gversion);
  cy.wait(1000)
  self.membersPage.newMembersButton_Click();
  cy.wait(3000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_type(PositiveData[13].Name);
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_type(PositiveData[13].Email);
  cy.wait(100)
  self.membersPage.buttonLabel_Click()
  cy.wait(100)
  self.membersPage.membersLabel_type(PositiveData[13].Labels);
  cy.wait(100)
  self.membersPage.buttonAddLabel_Click()
  cy.wait(100)
  self.membersPage.buttonLabel_Click()
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_type(PositiveData[13].Note);
  cy.wait(200)
  self.membersPage.buttonSave_Click()
  cy.wait(3000)
  self.membersPage.membersButton_Click();
  cy.contains('.ma0.pa0.gh-members-list-name:first-child', PositiveData[13].Name).click()
  cy.wait(1000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_clear();
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_clear();
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_clear();
  cy.wait(100)
  self.membersPage.buttonSave_Click()
  cy.wait(200)
  self.membersPage.membersButton_Click();
  cy.wait(9000)
    
})

//21
it('Test editar miembro dejar solo nombre', () => {
 
  self.membersPage.membersButton_Click();
  cy.wait(500)
  self.membersPage.members_takeScreenshot('create/list-member'+gversion);
  cy.wait(1000)
  self.membersPage.newMembersButton_Click();
  cy.wait(3000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_type(PositiveData[14].Name);
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_type(PositiveData[14].Email);
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_type(PositiveData[14].Note);
  cy.wait(200)
  self.membersPage.buttonSave_Click()
  cy.wait(3000)
  self.membersPage.membersButton_Click();
  cy.contains('.ma0.pa0.gh-members-list-name:first-child', PositiveData[14].Name).click()
  cy.wait(1000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_clear();
  cy.wait(100)
  self.membersPage.membersName_type(PositiveData[15].Name);
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_clear();
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_clear();
  cy.wait(100)
  self.membersPage.buttonSave_Click()
  cy.wait(200)
  self.membersPage.membersButton_Click();
  cy.wait(9000)
    
})

//22
it('Test editar miembro dejar solo email', () => {
 
  self.membersPage.membersButton_Click();
  cy.wait(500)
  self.membersPage.members_takeScreenshot('create/list-member'+gversion);
  cy.wait(1000)
  self.membersPage.newMembersButton_Click();
  cy.wait(3000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_type(PositiveData[16].Name);
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_type(PositiveData[16].Email);
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_type(PositiveData[16].Note);
  cy.wait(200)
  self.membersPage.buttonSave_Click()
  cy.wait(3000)
  self.membersPage.membersButton_Click();
  cy.contains('.ma0.pa0.gh-members-list-name:first-child', PositiveData[16].Name).click()
  cy.wait(1000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_clear();
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_clear();
  cy.wait(100)
  self.membersPage.membersEmail_type(PositiveData[17].Email);
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_clear();
  cy.wait(100)
  self.membersPage.buttonSave_Click()
  cy.wait(200)
  self.membersPage.membersButton_Click();
  cy.wait(9000)
    
})

//23
it('Test editar miembro dejar solo note', () => {
 
  self.membersPage.membersButton_Click();
  cy.wait(500)
  self.membersPage.members_takeScreenshot('create/list-member'+gversion);
  cy.wait(1000)
  self.membersPage.newMembersButton_Click();
  cy.wait(3000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_type(PositiveData[18].Name);
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_type(PositiveData[18].Email);
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_type(PositiveData[18].Note);
  cy.wait(200)
  self.membersPage.buttonSave_Click()
  cy.wait(3000)
  self.membersPage.membersButton_Click();
  cy.contains('.ma0.pa0.gh-members-list-name:first-child', PositiveData[18].Name).click()
  cy.wait(1000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_clear();
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_clear();
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_clear();
  cy.wait(100)
  self.membersPage.membersNote_type(PositiveData[19].Note);
  cy.wait(100)
  self.membersPage.buttonSave_Click()
  cy.wait(200)
  self.membersPage.membersButton_Click();
  cy.wait(9000)
    
})

//24
it('Test editar miembro todo números', () => {
 
  self.membersPage.membersButton_Click();
  cy.wait(500)
  self.membersPage.members_takeScreenshot('create/list-member'+gversion);
  cy.wait(1000)
  self.membersPage.newMembersButton_Click();
  cy.wait(3000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_type(PositiveData[20].Name);
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_type(PositiveData[20].Email);
  cy.wait(100)
  self.membersPage.buttonLabel_Click()
  cy.wait(100)
  self.membersPage.membersLabel_type(NegativeData[333].Labels);
  cy.wait(100)
  self.membersPage.buttonAddLabel_Click()
  cy.wait(100)
  self.membersPage.buttonLabel_Click()
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_type(PositiveData[20].Note);
  cy.wait(200)
  self.membersPage.buttonSave_Click()
  cy.wait(3000)
  self.membersPage.membersButton_Click();
  cy.contains('.ma0.pa0.gh-members-list-name:first-child', PositiveData[20].Name).click()
  cy.wait(1000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_clear();
  cy.wait(100)
  self.membersPage.membersName_type(NegativeData[333].Name);
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_clear();
  cy.wait(100)
  self.membersPage.membersEmail_type(NegativeData[333].Email);
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_clear();
  cy.wait(100)
  self.membersPage.membersNote_type(NegativeData[333].Note);
  cy.wait(100)
  self.membersPage.buttonSave_Click()
  cy.wait(200)
  self.membersPage.membersButton_Click();
  cy.wait(9000)
    
})

//25
it('Test editar miembro todo números email bien', () => {
 
  self.membersPage.membersButton_Click();
  cy.wait(500)
  self.membersPage.members_takeScreenshot('create/list-member'+gversion);
  cy.wait(1000)
  self.membersPage.newMembersButton_Click();
  cy.wait(3000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_type(PositiveData[21].Name);
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_type(PositiveData[21].Email);
  cy.wait(100)
  self.membersPage.buttonLabel_Click()
  cy.wait(100)
  self.membersPage.membersLabel_type(NegativeData[333].Labels);
  cy.wait(100)
  self.membersPage.buttonAddLabel_Click()
  cy.wait(100)
  self.membersPage.buttonLabel_Click()
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_type(PositiveData[21].Note);
  cy.wait(200)
  self.membersPage.buttonSave_Click()
  cy.wait(3000)
  self.membersPage.membersButton_Click();
  cy.contains('.ma0.pa0.gh-members-list-name:first-child', PositiveData[21].Name).click()
  cy.wait(1000)
  self.membersPage.membersName_Click();
  cy.wait(100)
  self.membersPage.membersName_clear();
  cy.wait(100)
  self.membersPage.membersName_type(NegativeData[333].Name);
  cy.wait(100)
  self.membersPage.membersEmail_Click();
  cy.wait(100)
  self.membersPage.membersEmail_clear();
  cy.wait(100)
  self.membersPage.membersEmail_type(PositiveData[21].Email);
  cy.wait(100)
  self.membersPage.membersNote_Click();
  cy.wait(100)
  self.membersPage.membersNote_clear();
  cy.wait(100)
  self.membersPage.membersNote_type(NegativeData[333].Note);
  cy.wait(100)
  self.membersPage.buttonSave_Click()
  cy.wait(200)
  self.membersPage.membersButton_Click();
  cy.wait(9000)
    
})

//26
    it('Test editar miembro nombre caracteres especiales', () => {
      self.membersPage.membersButton_Click();
      cy.wait(500)
      self.membersPage.members_takeScreenshot('create/list-member'+gversion);
      cy.wait(1000)
      self.membersPage.newMembersButton_Click();
      cy.wait(3000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_type(PositiveData[22].Name);
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_type(PositiveData[22].Email);
      cy.wait(100)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersLabel_type(PositiveData[23].Labels);
      cy.wait(100)
      self.membersPage.buttonAddLabel_Click()
      cy.wait(100)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersNote_Click();
      cy.wait(100)
      self.membersPage.membersNote_type(PositiveData[22].Note);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(3000)
      self.membersPage.membersButton_Click();
      cy.contains('.ma0.pa0.gh-members-list-name:first-child', PositiveData[22].Name).click()
      cy.wait(1000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_type(NegativeData[21].Name);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(1000)
      self.membersPage.membersButton_Click();
      cy.wait(9000)
        
    })

//27
     it('Test editar miembro email caracteres especiales', () => {
      self.membersPage.membersButton_Click();
      cy.wait(500)
      self.membersPage.members_takeScreenshot('create/list-member'+gversion);
      cy.wait(1000)
      self.membersPage.newMembersButton_Click();
      cy.wait(3000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_type(PositiveData[23].Name);
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_type(PositiveData[23].Email);
      cy.wait(100)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersLabel_type(PositiveData[23].Labels);
      cy.wait(100)
      self.membersPage.buttonAddLabel_Click()
      cy.wait(100)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersNote_Click();
      cy.wait(100)
      self.membersPage.membersNote_type(PositiveData[23].Note);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(3000)
      self.membersPage.membersButton_Click();
      cy.contains('.ma0.pa0.gh-members-list-name:first-child', PositiveData[23].Name).click()
      cy.wait(1000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_clear();
      cy.wait(200)
      self.membersPage.membersEmail_type(NegativeData[72].Email);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(1000)
      self.membersPage.membersButton_Click();
      cy.wait(9000)
        
    })

//28
    it('Test editar miembro label caracteres especiales', () => {
      self.membersPage.membersButton_Click();
      cy.wait(500)
      self.membersPage.members_takeScreenshot('create/list-member'+gversion);
      cy.wait(1000)
      self.membersPage.newMembersButton_Click();
      cy.wait(3000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_type(PositiveData[24].Name);
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_type(PositiveData[24].Email);
      cy.wait(100)
      self.membersPage.membersNote_Click();
      cy.wait(100)
      self.membersPage.membersNote_type(PositiveData[24].Note);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(3000)
      self.membersPage.membersButton_Click();
      cy.contains('.ma0.pa0.gh-members-list-name:first-child', PositiveData[24].Name).click()
      cy.wait(1000)
      self.membersPage.membersLabel_type(NegativeData[73].Email);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(1000)
      self.membersPage.membersButton_Click();
      cy.wait(9000)
        
    })

//29
    it('Test editar miembro note caracteres especiales', () => {
      self.membersPage.membersButton_Click();
      cy.wait(500)
      self.membersPage.members_takeScreenshot('create/list-member'+gversion);
      cy.wait(1000)
      self.membersPage.newMembersButton_Click();
      cy.wait(3000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_type(PositiveData[25].Name);
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_type(PositiveData[25].Email);
      cy.wait(100)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersLabel_type(PositiveData[25].Labels);
      cy.wait(100)
      self.membersPage.buttonAddLabel_Click()
      cy.wait(100)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersNote_Click();
      cy.wait(100)
      self.membersPage.membersNote_type(PositiveData[25].Note);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(3000)
      self.membersPage.membersButton_Click();
      cy.contains('.ma0.pa0.gh-members-list-name:first-child', PositiveData[25].Name).click()
      cy.wait(1000)
      self.membersPage.membersNote_clear();
      cy.wait(200)
      self.membersPage.membersNote_type(NegativeData[74].Email);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(1000)
      self.membersPage.membersButton_Click();
      cy.wait(9000)
        
    })

//30
    it('Test editar miembro todo caracteres especiales', () => {
      self.membersPage.membersButton_Click();
      cy.wait(500)
      self.membersPage.members_takeScreenshot('create/list-member'+gversion);
      cy.wait(1000)
      self.membersPage.newMembersButton_Click();
      cy.wait(3000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_type(PositiveData[26].Name);
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_type(PositiveData[26].Email);
      cy.wait(100)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersLabel_type(NegativeData[204].Labels);
      cy.wait(100)
      self.membersPage.buttonAddLabel_Click()
      cy.wait(100)
      self.membersPage.buttonLabel_Click()
      cy.wait(100)
      self.membersPage.membersNote_Click();
      cy.wait(100)
      self.membersPage.membersNote_type(PositiveData[26].Note);
      cy.wait(200)
      self.membersPage.buttonSave_Click()
      cy.wait(3000)
      self.membersPage.membersButton_Click();
      cy.contains('.ma0.pa0.gh-members-list-name:first-child', PositiveData[26].Name).click()
      cy.wait(1000)
      self.membersPage.membersName_Click();
      cy.wait(100)
      self.membersPage.membersName_clear();
      cy.wait(100)
      self.membersPage.membersName_type(NegativeData[394].Name);
      cy.wait(100)
      self.membersPage.membersEmail_Click();
      cy.wait(100)
      self.membersPage.membersEmail_clear();
      cy.wait(100)
      self.membersPage.membersEmail_type(NegativeData[394].Email);
      cy.wait(100)
      self.membersPage.membersNote_Click();
      cy.wait(100)
      self.membersPage.membersNote_clear();
      cy.wait(100)
      self.membersPage.membersNote_type(NegativeData[394].Note);
      cy.wait(100)
      self.membersPage.buttonSave_Click()
      cy.wait(1000)
      self.membersPage.membersButton_Click();
      cy.wait(9000)
        
    })
})