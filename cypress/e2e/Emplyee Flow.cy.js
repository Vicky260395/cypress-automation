describe("Emplyee Flow", () => {
  it("tests Emplyee Flow", () => {
    cy.visit('https://qa-automation.d49kd6luw1c4m.amplifyapp.com/')
    cy.request({
      method: 'POST',
      url: "https://crm-prod-qa.altergame.click/user/impersonation/auth",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization-Token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjIsInVzZXJfaWQiOjYyLCJ1c2VyRW1haWwiOiJiZWFzdEB0aGVhbHRlcm9mZmljZS5jb20iLCJ1c2VyTmFtZSI6IkJlYXN0IEFrc2hheSIsImRldmljZUlkIjoiIiwicm9sZXMiOlsiQURNSU4iLCJQTyJdLCJpYXQiOjE3MzMzODE0NzZ9.OrdV21jTVfpT2Thdcmhl1Errh5SKauGe4PSfZ57hHGY",
      },
      body: {                  // Data sent in the request body
        "userEmail": "punith@thealteroffice.com"
      },
    }).then((response) => {
      cy.get("input").type(response.body.token);
      cy.contains('button', 'ENTER ITW UNIVERSE').click({ force: true });
      
    });
    cy.get("#side__nav__Employees").click()
    cy.wait(5000)
    cy.contains("button", "ADD EMPLOYEE").click();
    cy.get('input[name="firstName"]').click();
    cy.get('input[name="firstName"]').type("vicky");
    cy.get('input[name="lastName"]').click();
    cy.get('input[name="lastName"]').type("sm");
    cy.get('input[name="emailId"]').click();
    cy.get('input[name="emailId"]').type("vicky@gmail.com");
    cy.get("form > div > div:nth-of-type(2) div:nth-of-type(3) > div:nth-of-type(1) input").click();
    cy.get("form > div > div:nth-of-type(2) div:nth-of-type(3) > div:nth-of-type(1) input").type("+91 93455-50189");
    cy.get("form > div > div:nth-of-type(2) div.custom__select div.text-white").click();
    cy.get("#react-select-2-option-1").click();
    cy.get("div.MuiCollapse-root > div > div > div > div > div:nth-of-type(1) > div:nth-of-type(1) div.custom__select div.text-white").click();
    cy.get("#react-select-3-option-0").click();
    cy.get("div.MuiCollapse-root > div > div > div > div > div:nth-of-type(1) > div:nth-of-type(2) div.custom__select div.text-white").click();
    cy.get("#react-select-4-option-1").click();
    cy.get("button.\\!bg-\\[\\#0094ff\\]").click();
    cy.get("body > div.items-center button.MuiButton-sizeMedium").click();
  });
});
