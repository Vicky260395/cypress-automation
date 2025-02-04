import performLogin from '../support/LoginITWCRM';
describe("Assign Brands by BO", () => {
    let inventoryName = "Activations / Events";
    let eventName  = "CSK vs JSK";
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

    //TestCase 1: Assigning and Searching Brand
    it("CardView Assign Brand", () => {
      cy.get('button').contains('div', "not assigned").click();
      cy.wait(5000); // Initial wait for page to load
    
      let extractedBrands = [];
    
      function extractBrands() {
        return cy.get('div.infinite-scroll-component__outerdiv').then(($cards) => {
          cy.log('Extracting brands from cards:', $cards);
          return cy.wrap($cards).find('[class*="font-recoletaSemibold"]').each(($el) => {
            cy.wrap($el).invoke('text').then((brand) => {
              if (!extractedBrands.includes(brand.trim())) { // Avoid duplicate brands
                extractedBrands.push(brand.trim());
              }
            });
          });
        });
      }
      function scrollAndExtract() {
        return cy.get('div.infinite-scroll-component__outerdiv').then(($scrollDiv) => {
          console.log("scroliing...............................");
          cy.wrap($scrollDiv).scrollIntoView(); // Scroll to bottom
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
      
      // Step 1: Extract brands and handle pagination
      extractBrands().then(() => {
        scrollAndExtract().then(() => {
          cy.log("Final extracted brands:", JSON.stringify(extractedBrands));
    
          // Step 3: Assign brands after extraction
          cy.wrap(extractedBrands).then((brands) => {
            cy.log("Extracted Brands:", brands);
            Object.values(assignBrandData.assigncardbrand).forEach((brandName) => {
              cy.log(`Checking for brand: ${brandName}`);
              const index = brands.indexOf(brandName);
              if (index !== -1) {
                cy.log(`✅ Match found for brand: ${brandName}`);
                cy.get('div.infinite-scroll-component__outerdiv')
                  .find('[class*="font-recoletaSemibold"]')
                  .get('button[aria-label="Assign the Brand"]')
                  .eq(index).scrollIntoView().should('be.visible').click({ force: true });
                cy.log(`✔️ Assigned brand: ${brandName}`);
              } else {
                cy.log(`❌ Brand has been assigned already: ${brandName}`);
              }
            });
          });
    
          // Step 4: Verify Assigned Brands in Search
          cy.get('button').contains('div', "Assigned").click();
          cy.get('[aria-label="Search Brands..."]').click();
          Object.values(assignBrandData.assigncardbrand).forEach((brandName) => {
            cy.get('input[placeholder="Search Brands..."]').type(brandName).wait(5000).type("{enter}");
            cy.get('div.gap-1.w-full.flex > a').then(($results) => {
              if ($results.text().includes(brandName)) {
                cy.log(`✅ Successfully found brand: ${brandName}`);
              } else {
                cy.log(`❌ No match found for brand: ${brandName}`);
              }
            });
            cy.get('input[placeholder="Search Brands..."]').clear().wait(2000);
          });
        });
      });
    });
    
        
      //  //TestCase 2: NotFit Brand 
      //  it("CardView NotFit Brand", () => {
      //   cy.get('button').contains('div', "not assigned").click();
      //   cy.wait(5000); // Initial wait for page to load
      //     let extractedBrands = [];
          
      //     function extractBrands() {
      //       return cy.get('div.infinite-scroll-component__outerdiv').then(($cards) => {
      //         cy.log('Extracting brands from cards:', $cards);
      //         return cy.get($cards).find('[class*="font-recoletaSemibold"]').each(($el) => {
      //             cy.wrap($el).invoke('text').then((brand) => {
      //               if (!extractedBrands.includes(brand)) { // Avoid duplicate brands
      //                 extractedBrands.push(brand);
      //               }
      //             });
      //           });
      //       });
      //     }
        
      //     function scrollAndExtract() {
      //       return cy.get('div.infinite-scroll-component__outerdiv').then(($scrollDiv) => {
      //         console.log("scroliing...............................");
      //         cy.wrap($scrollDiv).scrollIntoView(); // Scroll to bottom
      //         cy.wait(3000); // Wait for new content to load
      //         return extractBrands().then(() => {
      //           cy.get($scrollDiv).then(($updatedScrollDiv) => {
      //             // Compare previous brand count with new count
      //             if (extractedBrands.length > 0 && extractedBrands.length !== extractedBrands.previousLength) {
      //               extractedBrands.previousLength = extractedBrands.length; // Update count
      //               return scrollAndExtract(); // Recursively scroll if new content loaded
      //             } else {
      //               cy.log("No more new brands found, stopping scroll.");
      //               return;
      //             }
      //           });
      //         });
      //       });
      //     }
      //     console.log("...............................");
      //     // Step 1 & Step 2: Extract brands and handle infinite scroll
      //     extractedBrands.previousLength = 0; // Track previous number of brands
      //     extractBrands().then(() => {
      //       scrollAndExtract().then(() => {
      //         console.log("extract brands");
      //         // Step 3: Assign brands after all brands are extracted
      //         cy.wrap(extractedBrands).then((brands) => {
      //           cy.log("Extracted Brands:", brands);
      //           Object.values(assignBrandData.notfitcardbrand).forEach((brandName) => {
      //             cy.log(`Checking for brand: ${brandName}`);
      //             const index = brands.indexOf(brandName);
      //             if (index !== -1) { // If match found
      //               cy.log(`✅ Match found for brand: ${brandName}`);
      //               cy.get('div.infinite-scroll-component__outerdiv')
      //                 .find('[class*="font-recoletaSemibold"]')
      //                 .get('button[aria-label="Move to Not fit"]')
      //                 .eq(index).scrollIntoView().should('be.visible').click({ force: true });
      //               cy.log(`✔️ NotFit brand: ${brandName}`);
      //             } else {
      //               cy.log(`❌ Brand has been moved to NotFit already: ${brandName}`);
      //             }
      //           });
      //         });
      //       });
      //     });
      // });
   

      // //TestCase 3: ListView Assign Brand 
      // it("ListView Assign Brand",()=>{
      //   cy.get('button').contains('div', "not assigned").click();
      //   cy.wait(5000); 
      //   cy.get('button[aria-label="favorite"]').click();
      //   let extractedBrands = [];
      //       cy.get('div.gap-1.w-full.flex > a').each(($el) => {
      //           cy.wrap($el).scrollIntoView().invoke('text').then((brand) => {
      //             if (!extractedBrands.includes(brand)) { 
      //               extractedBrands.push(brand.trim());
      //               cy.log("Extracted Brands", brand)
      //             }
      //           });
      //       });
      //   cy.wrap(null).then(() => {
      //     cy.log("Extracted Brands:", extractedBrands); 
      //     Object.values(assignBrandData.assignlistbrand).forEach((brandName) => {
      //       cy.log(`🔍 Searching for brand: ${brandName}`);
      //       const index = extractedBrands.indexOf(brandName);
      //       console.log(index, 'index');
      //       if (index !== -1) { 
      //         cy.log(`✅ Match found for brand: ${brandName}`);
      //         cy.get('div.gap-1.w-full.flex').get('button[aria-label="Assign the Brand"]').eq(index).scrollIntoView({ offset: { top: -50 } })
      //           .should('be.visible').click({ force: true });
      //         cy.log(`✔️ ListView Assigned brand: ${brandName}`);
      //       } else {
      //         cy.log(`❌ Brand has been assigned already: ${brandName}`);
      //       }
      //     });
      //   });    
      // }) 

      // //TestCase 4: ListView NotFit Brand 
      // it("ListView NotFit Brand",()=>{
      //   cy.get('button').contains('div', "not assigned").click();
      //   cy.wait(5000); 
      //   cy.get('button[aria-label="favorite"]').click();
      //   let extractedBrands = [];
      //       cy.get('div.gap-1.w-full.flex > a').each(($el) => {
      //           cy.wrap($el).scrollIntoView().invoke('text').then((brand) => {
      //             if (!extractedBrands.includes(brand)) {
      //               extractedBrands.push(brand.trim());
      //               cy.log("Extracted Brands", brand)
      //             }
      //           });
      //       });
      //   cy.wrap(null).then(() => {
      //     cy.log("Extracted Brands:", extractedBrands); 
      //     Object.values(assignBrandData.notfitlistbrand).forEach((brandName) => {
      //       cy.log(`🔍 Searching for brand: ${brandName}`);
      //       const index = extractedBrands.indexOf(brandName);
      //       console.log(index, 'index');
      //       if (index !== -1) { 
      //         cy.log(`✅ Match found for brand: ${brandName}`);
      //         cy.get('div.gap-1.w-full.flex').get('button[aria-label="Move to Not fit"]').eq(index).scrollIntoView({ offset: { top: -50 } })
      //           .should('be.visible').click({ force: true });
      //         cy.log(`✔️ ListView NotFit brand: ${brandName}`);
      //       } else {
      //         cy.log(`❌ Brand has been assigned already: ${brandName}`);
      //       }
      //     });
      //   });    
      // }) 

      // //TestCase 5: Assign NotFit Brand 
      // it("Assign NotFit Brand",()=>{
      //   cy.get('button').contains('div', "Not Fit").click();
      //   cy.wait(5000); 
      //   let extractedBrands = [];
      //       cy.get('div.gap-1.w-full.flex > a').each(($el) => {
      //           cy.wrap($el).scrollIntoView().invoke('text').then((brand) => {
      //             if (!extractedBrands.includes(brand)) { 
      //               extractedBrands.push(brand.trim());
      //               cy.log("Extracted Brands", brand)
      //             }
      //           });
      //       });
      //   cy.wrap(null).then(() => {
      //     cy.log("Extracted Brands:", extractedBrands); 
      //     Object.values(assignBrandData.assignnotfitbrand).forEach((brandName) => {
      //       cy.log(`🔍 Searching for brand: ${brandName}`);
      //       const index = extractedBrands.indexOf(brandName);
      //       console.log(index, 'index'); 
      //       if (index !== -1) { 
      //         cy.log(`✅ Match found for brand: ${brandName}`);
      //         cy.get('div.gap-1.w-full.flex').get('button[aria-label="Assign the Brand"]').eq(index).scrollIntoView({ offset: { top: -50 } })
      //           .should('be.visible').click({ force: true });
      //         cy.log(`✔️ Assigning NotFit brand: ${brandName}`);
      //       } else {
      //         cy.log(`❌ Brand has been assigned already: ${brandName}`);
      //       }
      //     });
      //   });    
      // })

      // //TestCase 6: Unassign NotFit Brand 
      // it("Unassign NotFit Brand",()=>{
      //   cy.get('button').contains('div', "Not Fit").click();
      //   cy.wait(5000); 
      //   let extractedBrands = [];
      //       cy.get('div.gap-1.w-full.flex > a').each(($el) => {
      //           cy.wrap($el).scrollIntoView().invoke('text').then((brand) => {
      //             if (!extractedBrands.includes(brand)) { 
      //               extractedBrands.push(brand.trim());
      //               cy.log("Extracted Brands", brand)
      //             }
      //           });
      //       });
      //   cy.wrap(null).then(() => {
      //     cy.log("Extracted Brands:", extractedBrands); 
      //     Object.values(assignBrandData.Unassignnotfitbrand).forEach((brandName) => {
      //       cy.log(`🔍 Searching for brand: ${brandName}`);
      //       const index = extractedBrands.indexOf(brandName);
      //       console.log(index, 'index');
      //       if (index !== -1) { 
      //         cy.log(`✅ Match found for brand: ${brandName}`);
      //         cy.get('div.gap-1.w-full.flex').get('button[aria-label="Unassign the Brand"]').eq(index).scrollIntoView({ offset: { top: -50 } })
      //           .should('be.visible').click({ force: true });
      //         cy.log(`✔️ Unassign NotFit brand: ${brandName}`);
      //       } else {
      //         cy.log(`❌ Brand has been assigned already: ${brandName}`);
      //       }
      //     });
      //   });    
      // })

      // //TestCase 7: MovetoNotFit Assign Brand 
      //  it("MovetoNotFit Assign Brand", () => {
      //    cy.get('button').contains('div', "Assigned").click();
      //    cy.wait(5000); // Wait for elements to load
      //    cy.get('div').contains('span', "Assigned").click();
      //    let extractedBrands = [];
      //    cy.get('div.gap-1.w-full.flex > a').each(($el) => {
      //      cy.wrap($el).scrollIntoView().invoke('text').then((brand) => {
      //         if (!extractedBrands.includes(brand.trim())) {
      //         extractedBrands.push(brand.trim());
      //         cy.log("✅ Extracted Brand:", brand.trim());
      //         }
      //      });
      //    }).then(() => {   
      //       cy.log("📌 Final Extracted Brands:", extractedBrands);
      //       Object.values(assignBrandData.movetonotfitAssignBrand).forEach((brandName) => {
      //         cy.log(`🔍 Searching for brand: ${brandName}`);
      //         const index = extractedBrands.indexOf(brandName);
      //         cy.log(`📌 Index for ${brandName}: ${index}`);
      //         if (index !== -1) {
      //           cy.log(`✅ Match found for brand: ${brandName}`);
      //           // Step 5: Recalculate the index and hover over the matching brand row
      //           cy.get('div.gap-1.w-full.flex > a') .each(($el, idx) => {
      //               if (idx === index) {
      //                 cy.wrap($el).scrollIntoView().trigger('mouseover').wait(1500);
      //                 cy.get('div[aria-label*="More"]', { timeout: 10000 }).should('be.visible').click({ force: true });
      //                 // Step 6: Click "Move to not fit" option
      //                 cy.contains('p', 'Move to not fit', { timeout: 5000 }).should('be.visible').click({ force: true });
      //                 // Step 7: Confirm move action
      //                 cy.contains('button', "YES, MOVE").click();
      //                 cy.log(`✔️ Moved ${brandName} to NotFit`);
      //               }
      //           });
      //         } else {
      //           cy.log(`❌ Brand already moved: ${brandName}`);
      //         }
      //       });
      //    });
      //  }); 
});
      
      

     