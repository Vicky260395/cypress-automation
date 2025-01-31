import performLogin from '../support/LoginITWCRM';
describe("Assign Brands by BO", () => {
    let inventoryName = "Activations / Events";
    let eventName  = "CNTB vs OTG";
    let assignBrandData;
    let extractedEvent = [];
    before(() =>{
      performLogin();
      cy.get("#side__nav__Inventories").click();
      cy.fixture('assignBrand.json').then((data) => {
        assignBrandData = data;
      });
      cy.get(`a[aria-label="${inventoryName}"]`).should('be.visible').click({force : true});
      cy.get('div.flex.flex-row.items-center.gap-1 > a').each(($el) => {
        cy.wrap($el).invoke('text').then((event)=>{
          extractedEvent.push(event.trim());
        })
      }).then(() => {
        cy.log('Final event array:', JSON.stringify(extractedEvent));
        cy.log('Event Name:', `'${eventName}'`);
        const index = extractedEvent.indexOf(eventName); // Get index of extracted event in the array

         if (index !== -1)  {
          cy.get('td').contains('span', 'Your Brands Assigned') .scrollIntoView().should('be.visible').click();
         } else {
          cy.log("Event is not found", eventName);
         }
      cy.contains('div', 'Brand Owner').scrollIntoView().should('be.visible').click({force : true});
      })
    })
      //Assign Brand
      it("CardView Assign Brand", () => {
        cy.get('button').contains('div', "not assigned").click();
        cy.wait(5000); // Initial wait for page to load
    
        
          let extractedBrands = [];
          
          function extractBrands() {
            return cy.get('div.infinite-scroll-component__outerdiv').then(($cards) => {
              cy.log('Extracting brands from cards:', $cards);
        
              return cy.get($cards)
                .find('[class*="font-recoletaSemibold"]')
                .each(($el) => {
                  cy.wrap($el).invoke('text').then((brand) => {
                    if (!extractedBrands.includes(brand)) { // Avoid duplicate brands
                      extractedBrands.push(brand);
                    }
                  });
                });
            });
          }
        
          function scrollAndExtract() {
            return cy.get('div.infinite-scroll-component__outerdiv').then(($scrollDiv) => {

              console.log("scroliing...............................");
              
              cy.wrap($scrollDiv).scrollTo('bottom'); // Scroll to bottom
              cy.wait(3000); // Wait for new content to load
              
              return extractBrands().then(() => {
                cy.get($scrollDiv).then(($updatedScrollDiv) => {
                  // Compare previous brand count with new count
                  if (extractedBrands.length > 0 && extractedBrands.length !== extractedBrands.previousLength) {
                    extractedBrands.previousLength = extractedBrands.length; // Update count
                    return scrollAndExtract(); // Recursively scroll if new content loaded
                  } else {
                    cy.log("No more new brands found, stopping scroll.");
                    return;
                  }
                });
              });
            });
          }
        
          console.log("...............................");

          // Step 1 & Step 2: Extract brands and handle infinite scroll
          extractedBrands.previousLength = 0; // Track previous number of brands
          extractBrands().then(() => {
            scrollAndExtract().then(() => {
              console.log("extract brands");
              
              // Step 3: Assign brands after all brands are extracted
              cy.wrap(extractedBrands).then((brands) => {
                cy.log("Extracted Brands:", brands);
        
                Object.values(assignBrandData.assignbrand).forEach((brandName) => {
                  cy.log(`Checking for brand: ${brandName}`);
                  const index = brands.indexOf(brandName);
        
                  if (index !== -1) { // If match found
                    cy.log(`✅ Match found for brand: ${brandName}`);
                    cy.get('div.infinite-scroll-component__outerdiv')
                      .find('[class*="font-recoletaSemibold"]')
                      .eq(index)
                      .parents('div')
                      .find('button[aria-label="Assign the Brand"]')
                      .scrollIntoView()
                      .should('be.visible')
                      .click({ force: true });
        
                    cy.log(`✔️ Assigned brand: ${brandName}`);
                  } else {
                    cy.log(`❌ Brand has been assigned already: ${brandName}`);
                  }
                });
              });
            });
          });
      });
        
      
   
});
      
      

      // it("CardView NotFit Brand", ()=>{
      //   cy.get('button').contains('div', "not assigned").click();
      //   cy.wait(5000)
      //   cy.get('div.infinite-scroll-component__outerdiv').wait(5000).then(($cards) => {
      //   cy.log($cards,'cards')
      //   let extractedBrands = []; 

      //    // Step 1: Extract all brand names
      //    cy.get($cards).find('[class*="font-recoletaSemibold"]').each(($el) => {
      //    cy.wrap($el).invoke('text').then((brand) => {
      //    extractedBrands.push(brand) })
      //    }).then(() => {
      //    cy.log('Final brands array:', extractedBrands)
      //    })

      //   // Step 2: Wait until all brands are extracted
      //   cy.wrap(null).then(() => {
      //   cy.log("Extracted Brands:", extractedBrands); // Debugging
      //   Object.values(assignBrandData.notfitbrand).forEach((brandName) => {
      //      cy.log(`Checking for brand: ${brandName}`);
      //      const index = extractedBrands.indexOf(brandName);
      //      console.log(index,'index');
      //      if (index !== -1) { // If match found
      //      cy.log(`✅ Match found for brand: ${brandName}`);
      //      cy.get($cards).find('[class*="font-recoletaSemibold"]').get('button[aria-label="Move to Not fit"]').eq(index).scrollIntoView().should('be.visible').click({force : true});
      //      cy.log(`✔️ Assigned brand: ${brandName}`);
      //     }
      //     else{
      //     cy.log(`❌ Brand has been moved to NotFit already: ${brandName}`);
      //     }
      //     });
      //     });
      //   });       
      // })

