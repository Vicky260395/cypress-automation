export const selectDate = (date) => {
  // Validate the input date
  const isValidDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const parsedDate = new Date(year, month - 1, day);
    return (
      parsedDate.getFullYear() === year &&
      parsedDate.getMonth() === month - 1 &&
      parsedDate.getDate() === day
    );
  };

  if (!isValidDate(date)) {
    throw new Error(`Invalid date: ${date}. Please provide a valid date in YYYY-MM-DD format.`);
  }

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
