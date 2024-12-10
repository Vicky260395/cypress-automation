describe("Brand Creation", () => {

  const siteURL = "https://www.otto.com/";

  beforeEach(() => {
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

  it("Creating One New Brand", () => {
    const brandName = "OTTO23";
    cy.contains("button", "ADD BRAND").click();
    cy.get('input[name="image"]').click().attachFile("Huawei.jpg");
    cy.get('input[name="name"]').type(brandName);
    cy.get("#siteUrl").type(siteURL);
    cy.get("#react-select-2-input").type(`${brandName}{enter}`);
    cy.get("#react-select-3-input").type("Sports Industry{enter}");
    cy.get('input[name="revenue"]').type(324);
    cy.get("#react-select-4-input").type("Vignesh Lenny{enter}");
    cy.get("#react-select-5-input").type("Chennai").wait(5000).type("{enter}");
    cy.get("button span").last().click({ force: true });
    cy.wait(5000);
  });

  it("should display an error when creating a duplicate brand", () => {
    const brandName = "OTTO24";
    // cy.on('window:before:unload', (e) => {
    //   e.preventDefault(); // Stop the page from navigating away or unloading
    // });
    // cy.wait(5000);
    cy.contains("button", "ADD BRAND").click();
    cy.get('input[name="name"]').type(brandName);
    cy.get("div > span").should("contain.text", "Brand name already exists");
  });  
});