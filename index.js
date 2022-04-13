const http = require('http');

const excel = require("exceljs");
let workbook = new excel.Workbook();
let worksheet = workbook.addWorksheet("Test 1");

const records = {
    A1: "2022-04-01",
    A2: 10,
    B1: 5.5,
    B2: "Some Text"
}

worksheet.addRows([[records.A1, records.B1], [records.A2, records.B2]]);

http.createServer(function (req, res) {
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "task1-excel.xlsx"
    );
    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  }).listen(8080);