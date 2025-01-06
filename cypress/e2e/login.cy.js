import performLogin from '../support/LoginITWCRM';
describe('Login', () => {
  //it('Login',() =>{
    before(()=> {
      performLogin();
    })
   it('login',()=>{
    cy.visit('https://qa-automation.d49kd6luw1c4m.amplifyapp.com/')
   })
  
})

