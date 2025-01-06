//const { readExcel } = require('cypress/support/readExcel');
describe("Brand Creation", () => {
    let brandData ;
    
    before(() => {
      cy.visit("https://qa-automation.d49kd6luw1c4m.amplifyapp.com/");
      cy.request({
        method: "POST",
        url: "https://crm-prod-qa.altergame.click/user/impersonation/auth",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization-Token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjIsInVzZXJfaWQiOjYyLCJ1c2VyRW1haWwiOiJiZWFzdEB0aGVhbHRlcm9mZmljZS5jb20iLCJ1c2VyTmFtZSI6IkJlYXN0IEFrc2hheSIsImRldmljZUlkIjoiIiwicm9sZXMiOlsiQURNSU4iLCJQTyJdLCJpYXQiOjE3MzMzODE0NzZ9.OrdV21jTVfpT2Thdcmhl1Errh5SKauGe4PSfZ57hHGY",
        },
        body: {
          userEmail: "beast@thealteroffice.com",
        },
      }).then((response) => {
        cy.get("input").type(response.body.token);
        cy.contains("button", "ENTER ITW UNIVERSE").click({ force: true });
        cy.get("#side__nav__icons_Brands").click();
        const filePath = 'cypress/fixtures/BrandsList.xlsx';
        brandData = readExcel(filePath);
        console.log(readExcel); 
        });
      });
    

    //Creating New Brand
    it("Creating One New Brand", () => {
      const firstData = brandData[0]
      cy.contains("button", "ADD BRAND").click();
      cy.get('input[name="image"]').selectFile("C:\\Users\\vigne\\OneDrive\\Desktop\\abibas.jpg");
      cy.get('input[name="name"]').type(firstData.name);
      cy.get("#siteUrl").type(firstData.websiteURL);
      cy.contains("label", "Company Name*").parent().find('input[type="text"]').type(firstData.company).wait(5000).type("{enter}");
      cy.contains("label", "Industry/ Category*").parent().find('input[type="text"]').type(firstData.category).wait(5000).type("{enter}");
      cy.get('input[name="revenue"]').type(firstData.revenue);
      cy.contains("label", "Brand Owner(s)").parent().find('input[type="text"]').type(firstData.brandOwner).wait(5000).type("{enter}");
      cy.contains("label", "Head Quarters*").parent().find('input[type="text"]').type(firstData.brandLocation).wait(5000).type("{enter}");
      cy.get("button span").last().click({ force: true });
      cy.wait(5000);
      cy.get('[aria-label="Search Brands..."]').click()
      cy.get('input[placeholder="Search Brands..."]').type(firstData.name).wait(5000).type("{enter}");
      cy.get('input[placeholder="Search Brands..."]').clear()
    });
  
    //Duplicate Brand eixst
    it("should display an error when creating a duplicate brand", () => {
      const secondData =  brandData[1]
      cy.contains("button", "ADD BRAND").click();
      cy.get('input[name="name"]').type(secondData.name);
      cy.get("div > span").should("contain.text", "Brand name already exists");
      cy.get('img[alt="close"]').click();
      cy.wait(5000)
      cy.contains("button", "YES, PROCEED").click().wait(5000)
    });  
  
  
    //Brand Creation without Brand Owner
    it('Brand Creation without Brand Owner',() =>{
      const thirdData =  brandData[2]
      cy.contains("button", "ADD BRAND").click();
      cy.get('input[name="image"]').click().attachFile("Kangol.png");
      cy.get('input[name="name"]').type(thirdData.name);
      cy.get("#siteUrl").type(thirdData.websiteURL);
      cy.wait(5000)
      cy.contains("label", "Company Name*").parent().find('input[type="text"]').type(thirdData.company).wait(5000).type("{enter}");
      cy.contains("label", "Industry/ Category*").parent().find('input[type="text"]').type(thirdData.category).wait(5000).type("{enter}");
      cy.get('input[name="revenue"]').type(thirdData.revenue);
      cy.contains("label", "Head Quarters*").parent().find('input[type="text"]').type(thirdData.brandLocation).wait(5000).type("{enter}");
      cy.get("button span").last().click({ force: true });
      cy.wait(5000);
      cy.get('input[placeholder="Search Brands..."]').type(thirdData.name).wait(5000).type("{enter}");
      cy.get('input[placeholder="Search Brands..."]').clear()
    })
    
    //Brand creation with only Mandatory fields
    it('Brand creation with only Mandatory fields',() =>{
      const fourthData =  brandData[3]
      cy.contains("button", "ADD BRAND").click();
      cy.get('input[name="name"]').type(fourthData.name);
      cy.get("#siteUrl").type(fourthData.websiteURL);
      cy.contains("label", "Company Name*").parent().find('input[type="text"]').type(fourthData.company).wait(5000).type("{enter}");
      cy.contains("label", "Industry/ Category*").parent().find('input[type="text"]').type(fourthData.category).wait(5000).type("{enter}");
      cy.contains("label", "Head Quarters*").parent().find('input[type="text"]').type(fourthData.brandLocation).wait(5000).type("{enter}");
      cy.get("button span").last().click({ force: true });
      cy.wait(5000)
      cy.get('input[placeholder="Search Brands..."]').type(fourthData.name).wait(5000).type("{enter}");
      cy.get('input[placeholder="Search Brands..."]').clear()
      
    })
  
      //Multiple Brand Creation
      it('Creating Multiple Brands', () => {
        cy.contains("button", "ADD BRAND").click();
        const remainingData = brandData.slice(4);
        remainingData.forEach((brand) => {
         cy.get('input[name="image"]').click().attachFile("Kangol.png");
         cy.get('input[name="name"]').type(brand.name);
         cy.get("#siteUrl").type(brand.websiteURL);
         cy.contains("label", "Company Name*").parent().find('input[type="text"]').type(brand.company).wait(5000).type("{enter}");
         cy.contains("label", "Industry/ Category*").parent().find('input[type="text"]').type(brand.category).wait(5000).type("{enter}");
         cy.get('input[name="revenue"]').type(brand.revenue);
         cy.contains("label", "Brand Owner(s)").parent().find('input[type="text"]').type(brand.brandOwner).wait(5000).type("{enter}");
         cy.contains("label", "Head Quarters*").parent().find('input[type="text"]').type(brand.brandLocation).wait(5000).type("{enter}");
         cy.get('#backend__user__form__submit__save__add__another__1').click({ force: true });
         cy.wait(5000)
       });
      });  
});
  