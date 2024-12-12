const { defineConfig } = require("cypress");
const path = require('path')

function getDataFromHtmlWatchlistIntoJson() {
  const XLSX = require("xlsx");
  // Pfad zur Excel-Datei
  const filePath = path.resolve(__dirname, "./cypress/fixtures/testFile.xlsx")
  // Lesen der Excel-Datei
  const workbook = XLSX.readFile(filePath);
  // Erste Arbeitsmappe auswählen
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  // Konvertieren der Arbeitsmappe in JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  // Setzen des Debug-Punkts
  // Ausgabe der Daten auf der Konsole
  console.log(jsonData);
  return jsonData
}

module.exports = defineConfig({
  e2e: {
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        readXlsxFile() {
          return getDataFromHtmlWatchlistIntoJson()
        },
      })
    },
  },
});
