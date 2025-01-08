export const selectDate = (date) => {
    const [year, month, day] = date.split('-').map(Number);
    const targetYear = year;
    const targetMonth = month - 1; // Month is 0-indexed
    const targetDay = day;
  
    const navigateToMonth = () => {
      cy.get('div[class="MuiPickersFadeTransitionGroup-root css-1bx5ylf"]').then(($monthYear) => {
        const currentMonthYearText = $monthYear.text();
        const [currentMonthName, currentYear] = currentMonthYearText.split(' ');
        const currentMonth = new Date(Date.parse(`${currentMonthName} 1, 2025`)).getMonth(); // Convert to month index
        const currentYearNumber = parseInt(currentYear, 10);
  
        if (targetYear > currentYearNumber || (targetYear === currentYearNumber && targetMonth > currentMonth)) {
          // Click "Next month" button
          cy.get('button[title="Next month"]').click();
  
          // Call the function recursively until the desired month and year are reached
          navigateToMonth();
        } else {
          // Select the target day
          cy.get('button[type="button"]').contains(targetDay).click();
        }
      });
    };
  
    // Start navigation
    navigateToMonth();
  };
  