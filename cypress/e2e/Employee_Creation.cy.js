import performLogin from '../support/LoginITWCRM';
describe('Employee Creation', () => {
    let employeeData;
    before(() =>{
    performLogin();
    cy.get("#side__nav__Employees").click()
      cy.fixture('employeeList.json').then((data) => {
        employeeData = data;
      });
    })
  
  //Single employee creation
  it('Single Employee Creation',() =>{
    const empOne = employeeData.employee1;
    cy.contains("button", "ADD EMPLOYEE").click();
    cy.get('input[name="firstName"]').type(empOne.firstname);
    cy.get('input[name="lastName"]').type(empOne.lastname);
    cy.get('input[name="emailId"]').type(empOne.email);
    cy.get('button[aria-label="Country selector"]').click();
    cy.get('ul[role="listbox"]').contains('span', empOne.countryname).scrollIntoView().should('be.visible').click(); 
    cy.get('input[name="phoneNumber"]').type(empOne.phonenumber);
    cy.contains("label", "City*").parent().find('input[type="text"]').type(empOne.city).wait(5000).type("{enter}");
    cy.get("button span").contains('FEMALE').click({ force: true });
    cy.contains("label", "Department*").parent().find('input[type="text"]').type(empOne.department).wait(5000).type("{enter}");
    cy.contains("label", "Vertical*").parent().find('input[type="text"]').type(empOne.vertical).wait(5000).type("{enter}");
    cy.get('button[id="save-user"]').click()
    cy.wait(5000)
    cy.contains("button", "DO LATER!").click();
    cy.wait(5000)
    cy.get('[aria-label="Search users..."]').click();
    cy.get('input[placeholder="Search users..."]').type(empOne.firstname).wait(5000).type("{enter}");
    cy.get('input[placeholder="Search users..."]').clear();
  })

  //Duplicate employee creation
  it('Duplicate Employee Creation', () =>{
    const empTwo = employeeData.employee2;
    cy.contains("button", "ADD EMPLOYEE").click();
    cy.get('input[name="firstName"]').type(empTwo.firstname);
    cy.get('input[name="lastName"]').type(empTwo.lastname);
    cy.get('input[name="emailId"]').type(empTwo.email);
    cy.get('button[aria-label="Country selector"]').click();
    cy.get('ul[role="listbox"]').contains('span', empTwo.countryname).scrollIntoView().should('be.visible').click(); 
    cy.get('input[name="phoneNumber"]').type(empTwo.phonenumber);
    cy.contains("label", "City*").parent().find('input[type="text"]').type(empTwo.city).wait(5000).type("{enter}");
    cy.get("button span").contains('FEMALE').click({ force: true });
    cy.contains("label", "Department*").parent().find('input[type="text"]').type(empTwo.department).wait(5000).type("{enter}");
    cy.contains("label", "Vertical*").parent().find('input[type="text"]').type(empTwo.vertical).wait(5000).type("{enter}");
    cy.get('button[id="save-user"]').click()
    cy.get("div > span").should("contain.text", "Email already exists");
    cy.get('img[alt="close"]').click();
    cy.wait(5000)
    cy.contains("button", "YES, CLOSE").click().wait(5000)
  })

  //Mandatory fileds employee creation
  it('Mandatory fileds employee creation',() =>{
    const empThree = employeeData.employee3;
    cy.contains("button", "ADD EMPLOYEE").click();
    cy.get('input[name="firstName"]').type(empThree.firstname);
    cy.get('input[name="lastName"]').type(empThree.lastname);
    cy.get('input[name="emailId"]').type(empThree.email);
    cy.get('button[aria-label="Country selector"]').click();
    cy.get('ul[role="listbox"]').contains('span', empThree.countryname).scrollIntoView().should('be.visible').click(); 
    cy.get('input[name="phoneNumber"]').type(empThree.phonenumber);
    cy.contains("label", "City*").parent().find('input[type="text"]').type(empThree.city).wait(5000).type("{enter}");
    cy.get("button span").contains('FEMALE').click({ force: true });
    cy.contains("label", "Department*").parent().find('input[type="text"]').type(empThree.department).wait(5000).type("{enter}");
    cy.contains("label", "Vertical*").parent().find('input[type="text"]').type(empThree.vertical).wait(5000).type("{enter}");
    cy.get('button[id="save-user"]').click()
    cy.wait(5000)
    cy.contains("button", "DO LATER!").click();
    cy.wait(5000)
    cy.get('input[placeholder="Search users..."]').type(empThree.firstname).wait(5000).type("{enter}");
    cy.get('input[placeholder="Search users..."]').clear();
  })

  //All fileds employee creation
  it('All fileds employee creation',() =>{
    const empFour = employeeData.employee4;
    cy.contains("button", "ADD EMPLOYEE").click();
    cy.get('input[name="firstName"]').type(empFour.firstname);
    cy.get('input[name="lastName"]').type(empFour.lastname);
    cy.get('input[name="middleName"]').type(empFour.middlename)
    cy.get('input[name="emailId"]').type(empFour.email);
    cy.get('button[aria-label="Country selector"]').click();
    cy.get('ul[role="listbox"]').contains('span', empFour.countryname).scrollIntoView().should('be.visible').click(); 
    cy.get('input[name="phoneNumber"]').type(empFour.phonenumber);
    cy.contains("label", "City*").parent().find('input[type="text"]').type(empFour.city).wait(5000).type("{enter}");
    cy.get("button span").contains('FEMALE').click({ force: true });
    cy.contains("label", "Department*").parent().find('input[type="text"]').type(empFour.department).wait(5000).type("{enter}");
    cy.contains("label", "Vertical*").parent().find('input[type="text"]').type(empFour.vertical).wait(5000).type("{enter}");
    cy.contains("label", "Designation").parent().find('input[type="text"]').type(empFour.designation).wait(5000).type("{enter}");
    cy.contains("label", "Expertise").parent().find('input[type="text"]').type(empFour.expertise).wait(5000).type("{enter}");
    cy.contains("label", "Team Owner").parent().find('input[type="text"]').type(empFour.teamowner).wait(5000).type("{enter}");
    cy.get('#employeeCode').type(empFour.empcode).wait(5000).type("{enter}");
    cy.get('button[id="save-user"]').click()
    cy.wait(5000)
    cy.contains("button", "DO LATER!").click();
    cy.wait(5000)
    cy.get('input[placeholder="Search users..."]').type(empFour.firstname).wait(5000).type("{enter}");
    cy.get('input[placeholder="Search users..."]').clear();
  })

  //Multiple Employee Creation
  it('Multiple Employee Creation', () => {
    cy.contains("button", "ADD EMPLOYEE").click();
    const employeeDetails = Object.keys(employeeData).slice(4).map((key) => employeeData[key]); 
    employeeDetails.forEach((employee) => {
    cy.get('input[name="firstName"]').type(employee.firstname);
    cy.get('input[name="lastName"]').type(employee.lastname);
    cy.get('input[name="emailId"]').type(employee.email);
    cy.get('button[aria-label="Country selector"]').click();
    cy.get('ul[role="listbox"]').contains('span', employee.countryname).scrollIntoView().should('be.visible').click(); 
    cy.get('input[name="phoneNumber"]').type(employee.phonenumber);
    cy.contains("label", "City*").parent().find('input[type="text"]').type(employee.city).wait(5000).type("{enter}");
    cy.get("button span").contains('FEMALE').click({ force: true });
    cy.contains("label", "Department*").parent().find('input[type="text"]').type(employee.department).wait(5000).type("{enter}");
    cy.contains("label", "Vertical*").parent().find('input[type="text"]').type(employee.vertical).wait(5000).type("{enter}");
    cy.get('button[id="save-and-add-another-user"]').click()
    cy.wait(5000)
    })
  })
  
})

