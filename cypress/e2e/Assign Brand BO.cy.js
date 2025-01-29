import performLogin from '../support/LoginITWCRM';
describe("Assign Brands by BO", () => {
    let inventoryName = "Activations / Events";
    let assignBrandData;
    before(() =>{
      performLogin();
      cy.get("#side__nav__Inventories").click();
      cy.fixture('assignBrand.json').then((data) => {
        assignBrandData = data;
      });
      cy.get(`a[aria-label="${inventoryName}"]`).should('be.visible').click({force : true});
      cy.get('td').contains('span', 'Your Brands Assigned').scrollIntoView().should('be.visible').click();
      cy.contains('div', 'Brand Owner').scrollIntoView().should('be.visible').click({force : true});
   })

      //Assign Brand
      it("CardView Assign Brand", ()=>{
        cy.get('button').contains('div', "not assigned").click();
        cy.wait(5000)
        cy.get('div.infinite-scroll-component__outerdiv > div') // Get all brand cards
  .then(($cards) => {
    cy.log($cards,'cards')
    let extractedBrands = []; // Array to store extracted brand names

    // Step 1: Extract all brand names
    cy.get($cards).find('[class*="font-recoletaSemibold"]').each(($el) => {
      cy.wrap($el).invoke('text').then((brand) => {
        extractedBrands.push(brand)
      })
  }).then(() => {
      cy.log('Final brands array:', extractedBrands)
  })
 

    // Step 2: Wait until all brands are extracted
    cy.wrap(null).then(() => {
      cy.log("Extracted Brands:", extractedBrands); // Debugging

      // Step 3: Loop through JSON brands and find matches
      Object.values(assignBrandData.assignbrand).forEach((brandName) => {
        cy.log(`Checking for brand: ${brandName}`);

        // Find index of the matching brand
        const index = extractedBrands.indexOf(brandName);
console.log(index,'index');

        if (index !== -1) { // If match found
          cy.log(`✅ Match found for brand: ${brandName}`);

          // Click the corresponding "Assign" button
          cy.get($cards).find('[class*="font-recoletaSemibold"]') // Get all brand cards again
            .get('button[aria-label="Assign the Brand"]')
            .eq(index) // Select matched card
            .should('be.visible')
            .click({multiple:false});

          cy.log(`✔️ Assigned brand: ${brandName}`);
        }
      });
    });
  });

        
        
      })
    

      //Move to Not Fit 
      // it("CardView NotFIt Brand", ()=>{
      //   cy.get('button').contains('div', "not assigned").click();
      //   Object.values(assignBrandData.notfitbrand).forEach((brandName) => {
      //   cy.contains('div', brandName).scrollIntoView().within(() => { 
      //   cy.get('button[aria-label="Move to Not fit"]', { timeout: 10000 }).should('be.visible').click();
      // //  cy.get('button[aria-label="Move to Not fit"]').click();
      //   })
      //  })
      // })

})