import jsPDF from 'jspdf';
import { useEffect } from 'react';

const exportToPDF = (data, fileName = 'payout-report.pdf') => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Payout Report', 14, 16);

    // Add table headers
    doc.setFontSize(12);
    const headers = Object.keys(data[0]);
    doc.text(headers.join(' | '), 14, 30);

    // Add table rows
    let yPosition = 40;
    data.forEach(row => {
        doc.text(Object.values(row).join(' | '), 14, yPosition);
        yPosition += 10;
    });

    // Save PDF
    doc.save(fileName);
};

const exportToCSV = (data, fileName = 'payout-report.csv') => {
    const csvRows = [];

    // Get headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    // Get data rows
    data.forEach(row => {
        csvRows.push(Object.values(row).join(','));
    });

    // Create a blob from CSV rows and initiate the download
    const csvFile = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(csvFile);
    downloadLink.download = fileName;
    downloadLink.click();
};

// const exportToGoogleSheets = (data) => {
//     // Authenticate with Google
//     const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
//     const API_KEY = 'YOUR_GOOGLE_API_KEY';
//     const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

//     const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your spreadsheet ID

//     const authorize = (callback) => {
//         window.gapi.auth2.init({
//             client_id: CLIENT_ID,
//             apiKey: API_KEY,
//             scope: SCOPE,
//         }).then(() => {
//             window.gapi.auth2.getAuthInstance().signIn().then(callback);
//         });
//     };

//     const updateSheet = (authResult) => {
//         const sheets = window.gapi.client.sheets.spreadsheets.values;
//         const range = 'Sheet1!A1'; // Start range of where to insert data

//         const values = data.map(row => Object.values(row));

//         const request = {
//             spreadsheetId: SPREADSHEET_ID,
//             range: range,
//             valueInputOption: 'RAW',
//             resource: {
//                 values: values,
//             },
//         };

//         sheets.update(request).then((response) => {
//             console.log('Data successfully updated:', response);
//         }).catch((error) => {
//             console.error('Error updating Google Sheets:', error);
//         });
//     };

//     // Initialize the Google API client
//     useEffect(() => {
//         window.gapi.load('client:auth2', () => {
//             window.gapi.client.init({
//                 apiKey: API_KEY,
//                 clientId: CLIENT_ID,
//                 discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
//                 scope: SCOPE,
//             }).then(() => {
//                 authorize(updateSheet);
//             });
//         });
//     }, []);

// };

const ExportOptions = ({ data }) => {
    return (
        <div className="export-options">
            <button onClick={() => exportToCSV(data)}>Export as CSV</button>
            <button onClick={() => exportToPDF(data)}>Export as PDF</button>
            {/* <button onClick={() => exportToGoogleSheets(data)}>Export to Google Sheets</button> */}
        </div>
    );
};

export default ExportOptions;
