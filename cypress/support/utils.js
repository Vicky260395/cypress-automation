import * as XLSX from 'xlsx';

// Function to read Excel data
export const readExcel = (filePath) => {
  const workbook = XLSX.readFile(filePath); // Read the Excel file
  const sheetName = workbook.SheetNames[0]; // Get the first sheet
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet); // Convert the sheet to JSON
};