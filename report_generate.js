const { PDFDocument } = require('pdf-lib');
const { google } = require('googleapis');
const fs = require('fs');

// Google Sheets API credentials and authentication
const auth = new google.auth.GoogleAuth({
  keyFile: 'keys.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

// Fetch data from Google Sheets
async function fetchData() {
  const sheets = google.sheets({ version: 'v4', auth });
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1PIPZhXgjO1eewAFk9JXR8tHxrVT23-_jO-GBt0V3txg',
      range: 'Excel Data!A2', // Replace 'SecondTabName' with the name of the second tab (sheet)
    });
    return response.data.values || [];
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error.message);
    return [];
  }
}

// Generate PDF document from data
async function generatePDF() {
  try {
    const data = await fetchData();
    if (!data || data.length === 0) {
      console.log('No data found in Google Sheets');
      return;
    }

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    // Add data to PDF document
    const fontSize = 12;
    const lineHeight = fontSize * 1.2;
    const startY = height - 50;
    let y = startY;
    data.forEach(row => {
      const text = row.join('\t'); // Join row elements with tab
      page.drawText(text, { x: 50, y, size: fontSize });
      y -= lineHeight;
    });

    // Save PDF document to file
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('BINOD.pdf', pdfBytes);
    console.log('PDF generated successfully');
  } catch (error) {
    console.error('Error generating PDF:', error.message);
  }
}

generatePDF();
