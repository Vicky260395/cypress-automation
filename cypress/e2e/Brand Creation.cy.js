describe("Brand Creation", () => {
    it("Creating New Brand", () => {
    cy.visit("https://qa-automation.d49kd6luw1c4m.amplifyapp.com/")
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
        cy.contains("button", "ENTER ITW UNIVERSE").click({ force: true });  
      });
      cy.get('#side__nav__icons_Brands').click()
      cy.contains('button', "ADD BRAND").click()
      cy.get('input[name="image"]').click().attachFile("Huawei.jpg")
      cy.get('input[name="name"]').type('Prokennex')
      cy.get('#siteUrl').type('https://prokennex.com/')
      cy.get('#react-select-2-input').type('Prokennex{enter}')
      cy.get('#react-select-3-input').type('Sports Industry{enter}')
      cy.get('input[name="revenue"]').type(324)
      cy.get('#react-select-4-input').type('Vignesh SM462{enter}')
      cy.get('#react-select-5-input').type('Chennai').wait(5000).type('{enter}')
      cy.contains('button',"SAVE").click({ force: true })
    })
})