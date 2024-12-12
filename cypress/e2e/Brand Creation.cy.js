describe("Brand Creation", () => {
  
  const siteURL = "https://www.Cocomelon.com/";
  const brands = [
    { name: 'Aquascutum', websiteURL: 'https://www.aquascutu.com/', company: 'Aquascutum', category:'Sports Industry', revenue: '300', brandOwner:'Vignesh Lenny', brandLocation:'‘Aiea' },
    {name: 'Altryn', websiteURL: 'https://www.altryn-sport.com/', company: 'Altryn', category:'Sports Industry', revenue: '5000', brandOwner:'Vignesh Lenny', brandLocation:'Thoothukudi'}
  ];


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
    });
  });

  //Creating New Brand
  it("Creating One New Brand", () => {
    const brandName = "Cocomelon";
    cy.contains("button", "ADD BRAND").click();
    //cy.get('input[name="image"]').click().attachFile("Kangol.png");
    cy.get('input[name="image"]').selectFile("C:\\Users\\vigne\\OneDrive\\Desktop\\abibas.jpg");
    cy.get('input[name="name"]').type(brandName);
    cy.get("#siteUrl").type(siteURL);
    cy.contains("label", "Company Name*").parent().find('input[type="text"]').type(`${brandName}{enter}`);
    cy.contains("label", "Industry/ Category*").parent().find('input[type="text"]').type("Sports Industry{enter}");
    cy.get('input[name="revenue"]').type(654);
    cy.contains("label", "Brand Owner(s)").parent().find('input[type="text"]').type("Vignesh Lenny{enter}");
    cy.contains("label", "Head Quarters*").parent().find('input[type="text"]').type("Chennai").wait(5000).type("{enter}");
    cy.get("button span").last().click({ force: true });
    cy.wait(5000);
    cy.get('[aria-label="Search Brands..."]').click()
    cy.get('input[placeholder="Search Brands..."]').type(brandName).wait(5000).type("{enter}");
    cy.get('input[placeholder="Search Brands..."]').clear()
  });

  //Duplicate Brand eixst
  it("should display an error when creating a duplicate brand", () => {
    const brandName = "Cimac";
    cy.contains("button", "ADD BRAND").click();
    cy.get('input[name="name"]').type(brandName);
    cy.get("div > span").should("contain.text", "Brand name already exists");
    cy.get('img[alt="close"]').click();
    cy.wait(5000)
    cy.contains("button", "YES, PROCEED").click().wait(5000)
  });  


  //Brand Creation without Brand Owner
  it('Brand Creation without Brand Owner',() =>{
    const brandName = "Chintamani";
    cy.contains("button", "ADD BRAND").click();
    cy.get('input[name="image"]').click().attachFile("Kangol.png");
    cy.get('input[name="name"]').type(brandName);
    cy.get("#siteUrl").type(siteURL);
    cy.wait(5000)
    cy.contains("label", "Company Name*").parent().find('input[type="text"]').type(`${brandName}{enter}`);
    cy.contains("label", "Industry/ Category*").parent().find('input[type="text"]').type("technology{enter}");
    cy.get('input[name="revenue"]').type(450);
    cy.contains("label", "Head Quarters*").parent().find('input[type="text"]').type("Coimbatore").wait(5000).type("{enter}");
    cy.get("button span").last().click({ force: true });
    cy.wait(5000);
    //cy.get('[aria-label="Search Brands..."]').click()
    cy.get('input[placeholder="Search Brands..."]').type(brandName).wait(5000).type("{enter}");
    cy.get('input[placeholder="Search Brands..."]').clear()
  })
  
  //Brand creation with only Mandatory fields
  it('Brand creation with only Mandatory fields',() =>{
    const brandName = "Clementoni";
    cy.contains("button", "ADD BRAND").click();
    cy.get('input[name="name"]').type(brandName);
    cy.get("#siteUrl").type(siteURL);
    cy.contains("label", "Company Name*").parent().find('input[type="text"]').type(`${brandName}{enter}`);
    cy.contains("label", "Industry/ Category*").parent().find('input[type="text"]').type("agriculture{enter}");
    cy.contains("label", "Head Quarters*").parent().find('input[type="text"]').type("Madurai").wait(5000).type("{enter}");
    cy.get("button span").last().click({ force: true });
    cy.wait(5000);
    //cy.get('[aria-label="Search Brands..."]').click()
    cy.get('input[placeholder="Search Brands..."]').type(brandName).wait(5000).type("{enter}");
    cy.get('input[placeholder="Search Brands..."]').clear()
  })

    //Multiple Brand Creation
    it('Creating Multiple Brands', () => {
      cy.contains("button", "ADD BRAND").click();
      brands.forEach((brand) => {
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

