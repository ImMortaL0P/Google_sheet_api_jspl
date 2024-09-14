const {google} = require('googleapis');

const Excel = require('exceljs');

const path = require('path');

// Resolve the path to the keys.json file
const keysPath = "C:\\Users\\kumar\\Desktop\\JSPL\\EXCEL DUMP PRODUCTION FILES\\Google_sheet_api\\keys.json";

// Load the service account key file
const keys = require(keysPath);


//https://nodejs.org
//https://developers.google.com/sheets/api/quickstart/nodejs

const client = new google.auth.JWT(
    keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets'] 
);

client.authorize(function(err,tokens){

if(err){
    console.log(err);
    return;
} else{
    console.log('Connected!');
    gsrun(client);
}

});

async function gsrun(cl){
const gsapi = google.sheets({version:'v4', auth: cl});

const wb = new Excel.Workbook();

let excelFile = await wb.xlsx.readFile('SQL Linked Excel File.xlsx');
let ws = excelFile.getWorksheet('Data');

let data = ws.getSheetValues();

//console.log(data);

// data.map(function(r){
    
//     return [r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15], r[16], r[17], r[18], r[19], r[20]];

// });


//data.shift() to drop 1 empty item and table header row

data.shift();
data.shift();

// Modify each row to remove the first element (empty cell)
data.forEach(row => row.shift());

//console.log(data);

// const opt = {

//     spreadsheetId: '1PIPZhXgjO1eewAFk9JXR8tHxrVT23-_jO-GBt0V3txg',
//     range: 'Data!A1:B7'

// };

// let data = await gsapi.spreadsheets.values.get(opt);
// let dataArray = (data.data.values);

// console.log(dataArray);

// dataArray.map(function(r){

//     while(r.length< 2){
//         r.push('');
//     }

//     return r;

    
// });



// let newDataArray = dataArray.map(function(r){
//     r.push(r[0]+ '-' + r[1]);
//     return r;
// });

const updateOptions = {
    spreadsheetId: '1PIPZhXgjO1eewAFk9JXR8tHxrVT23-_jO-GBt0V3txg',
    range: 'Excel Data!A2', 
    valueInputOption: 'USER_ENTERED',
    resource: { values: data}
};

let res = await gsapi.spreadsheets.values.update(updateOptions);

console.log(res);

//console.log(newDataArray);

}