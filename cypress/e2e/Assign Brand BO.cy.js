import performLogin from '../support/LoginITWCRM';
describe("Assign Brands by BO", () => {
    let eventName = "Activations / Events";
    before(() =>{
      performLogin();
      cy.get("#side__nav__Inventories").click();
      cy.get(`a[aria-label="${eventName}"]`).should('be.visible').click({force : true});
      cy.get('td').contains('span', 'Your Brands Assigned').scrollIntoView().should('be.visible').click();
      
    
      })

      it("Assign Brand", ()=>{

      })

})