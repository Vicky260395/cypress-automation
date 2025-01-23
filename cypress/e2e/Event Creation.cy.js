import performLogin from '../support/LoginITWCRM';
import {selectDate} from '../support/selectDate';

describe('Event Creation', () => {
  let eventData;
  before(() => {
    performLogin();
    cy.get("#side__nav__Inventories").click();
    cy.fixture('eventList.json').then((data) => {
      eventData = data;
    });
  });

  //Single Event Creation Test
  it('Single Event Creation', () => {
    const eventOne = eventData.event1;
    const eventstartDate = eventData.event1.startDate; 
    const eventendDate = eventData.event1.endDate; 
    const eventcloseDate = eventData.event1.closeDate
    cy.contains("button", "Add Event").click();
    cy.get('input[placeholder="Enter Event Name"]').type(eventOne.eventName);
    cy.get('#start_date').click();
    selectDate(eventstartDate);
    cy.get('#end_date').click();
    selectDate(eventendDate);
    cy.get('#close_date').click();
    selectDate(eventcloseDate);
    cy.get('input[placeholder="Add website URL"]').type(eventOne.websiteURL);
    cy.get('input[placeholder="Enter event description"]').type(eventOne.description);
    cy.contains("label", "Event Type*").parent().find('input[type="text"]').type(eventOne.eventType).wait(500).type("{enter}");
    cy.contains("label", "Inventory*").parent().find('input[type="text"]').type(eventOne.inventory).wait(500).type("{enter}");
    cy.contains("label", "Select Project owner(s)*").parent().click().find('input[type="search"]').type(eventOne.projectOwner).wait(5000).type("{enter}")
    cy.get('input[class="PrivateSwitchBase-input css-1m9pwf3"]').click();
    cy.contains("button", "SUBMIT").click();
  });

  //All Fields Event Creation
  it('All fields Event Creation', () => {
    const eventTwo = eventData.event2;
    const eventstartDate = eventData.event2.startDate; 
    const eventendDate = eventData.event2.endDate;     
    const eventcloseDate = eventData.event2.closeDate
    cy.contains("button", "Add Event").click();
    cy.get('input[placeholder="Enter Event Name"]').type(eventTwo.eventName);
    cy.get('#start_date').click();
    selectDate(eventstartDate);
    cy.get('#end_date').click();
    selectDate(eventendDate);
    cy.get('#close_date').click();
    selectDate(eventcloseDate);
    cy.get('input[placeholder="Add website URL"]').type(eventTwo.websiteURL);
    cy.get('input[placeholder="Enter event description"]').type(eventTwo.description);
    cy.contains("label", "Event Type*").parent().find('input[type="text"]').type(eventTwo.eventType).wait(500).type("{enter}");
    cy.contains("label", "Inventory*").parent().find('input[type="text"]').type(eventTwo.inventory).wait(500).type("{enter}");
    cy.contains("label", "Select Project owner(s)*").parent().click().find('input[type="search"]').type(eventTwo.projectOwner).wait(5000).type("{enter}")
    cy.get('input[class="PrivateSwitchBase-input css-1m9pwf3"]').click();
    cy.contains("label", "Category block").parent().click().find('input[type="search"]').type(eventTwo.categoryblock).wait(5000).type("{enter}")
    cy.get('input[class="PrivateSwitchBase-input css-1m9pwf3"]').click();
    cy.contains("button", "SUBMIT").click();
  });

  //Mandatory fields Event Creation
  it('Mandatory fields Event Creation', () => {
    const eventThree = eventData.event3;
    const eventstartDate = eventData.event3.startDate;
    const eventendDate = eventData.event3.endDate;    
    const eventcloseDate = eventData.event3.closeDate
    cy.contains("button", "Add Event").click();
    cy.get('input[placeholder="Enter Event Name"]').type(eventThree.eventName);
    cy.get('#start_date').click();
    selectDate(eventstartDate);
    cy.get('#end_date').click();
    selectDate(eventendDate);
    cy.get('#close_date').click();
    selectDate(eventcloseDate);
    cy.contains("label", "Event Type*").parent().find('input[type="text"]').type(eventThree.eventType).wait(500).type("{enter}");
    cy.contains("label", "Inventory*").parent().find('input[type="text"]').type(eventThree.inventory).wait(500).type("{enter}");
    cy.contains("label", "Select Project owner(s)*").parent().click().find('input[type="search"]').type(eventThree.projectOwner).wait(5000).type("{enter}")
    cy.get('input[class="PrivateSwitchBase-input css-1m9pwf3"]').click();
    cy.contains("button", "SUBMIT").click();
  });

  
  //Duplicate Event Creation
  it('Duplicate Event Creation', () => {
    const eventFour = eventData.event4;
    const eventstartDate = eventData.event4.startDate; 
    const eventendDate = eventData.event4.endDate;    
    const eventcloseDate = eventData.event4.closeDate
    cy.contains("button", "Add Event").click();
    cy.get('input[placeholder="Enter Event Name"]').type(eventFour.eventName);
    cy.get('#start_date').click();
    selectDate(eventstartDate);
    cy.get('#end_date').click();
    selectDate(eventendDate);
    cy.get('#close_date').click();
    selectDate(eventcloseDate);
    cy.contains("label", "Event Type*").parent().find('input[type="text"]').type(eventFour.eventType).wait(500).type("{enter}");
    cy.contains("label", "Inventory*").parent().find('input[type="text"]').type(eventFour.inventory).wait(500).type("{enter}");
    cy.contains("label", "Select Project owner(s)*").parent().click().find('input[type="search"]').type(eventFour.projectOwner).wait(5000).type("{enter}")
    cy.get('input[class="PrivateSwitchBase-input css-1m9pwf3"]').click();
    cy.contains("button", "SUBMIT").click();
  });

    //Multiple Inventory Event Creation
    it('Multiple Inventory Event Creation', () => {
        const eventFive = eventData.event5;
        const eventstartDate = eventData.event5.startDate; 
        const eventendDate = eventData.event5.endDate;    
        const eventcloseDate = eventData.event5.closeDate
        cy.contains("button", "Add Event").click();
        cy.get('input[placeholder="Enter Event Name"]').type(eventFive.eventName);
        cy.get('#start_date').click();
        selectDate(eventstartDate);
        cy.get('#end_date').click();
        selectDate(eventendDate);
        cy.get('#close_date').click();
        selectDate(eventcloseDate);
        cy.contains("label", "Event Type*").parent().find('input[type="text"]').type(eventFive.eventType).wait(500).type("{enter}");
        cy.contains("label", "Inventory*").parent().find('input[id="inventoryInput0"]').type(eventFive.inventory1).wait(5000).type("{enter}");
        cy.contains("label", "Select Project owner(s)*").eq(0).parent().click().find('input[type="search"]').type(eventFive.projectOwner1).wait(5000).type("{enter}")
        cy.get('input[class="PrivateSwitchBase-input css-1m9pwf3"]').click();
        cy.contains('h1', 'Inventories Details').click();
        cy.contains("button", "Add another Inventory").click()
        cy.get('#inventoryInput1').click().type(eventFive.inventory2).wait(5000).type("{enter}");
        cy.contains('span', 'Select Project owner(s)').click();
        cy.get('#default-search').should('be.visible').type(eventFive.projectOwner2).wait(5000).type('{enter}');
        cy.get('input[class="PrivateSwitchBase-input css-1m9pwf3"]').click();
        cy.contains("button", "SUBMIT").click();
      });
});
