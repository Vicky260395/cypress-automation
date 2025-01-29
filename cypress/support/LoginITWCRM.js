export default function performLogin(){
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
        "userEmail": "vigneshs@thealteroffice.com"
      },
    }).then((response) => {
      cy.get("input").type(response.body.token);
      cy.contains("button", "ENTER ITW UNIVERSE").click()
      
    })
}