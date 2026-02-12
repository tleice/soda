// export-utils.js

/**
 * Function to convert data to CSV format
 * @param {Array} data - Array of objects to be converted
 * @returns {string} - CSV formatted string
 */
function convertToCSV(data) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [headers, ...rows].join('\n');
}

/**
 * Function to convert data to Excel format (XLSX)
 * @param {Array} data - Array of objects to be converted
 * @returns {Blob} - Blob containing Excel file data
 */
function convertToExcel(data) {
    const xlsx = require('xlsx'); // Assuming xlsx library is available
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    return xlsx.writeFile(workbook, 'data.xlsx');
}

module.exports = { convertToCSV, convertToExcel };