module.exports = function (app) {

  const path = require('path');

  app.post('/pdf', function (req, res) {

    const body      = req.body.data;
  
    return res.send(body);

  

    const fontsPath = path.join(__dirname, '../../fonts');

    var fonts = {
      Roboto: {
        normal: path.join(fontsPath, 'Roboto-Regular.ttf'),
        bold: path.join(fontsPath, 'Roboto-Medium.ttf'),
        italics: path.join(fontsPath, 'Roboto-Italic.ttf'),
        bolditalics: path.join(fontsPath, 'Roboto-MediumItalic.ttf')
      }
    };

    var PdfPrinter = require('pdfmake');
    var printer = new PdfPrinter(fonts);

    var docDefinition = {
      content: [
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
      ]
    };

    var options = {
      // ... (other options if needed)
    };

    var pdfDoc = printer.createPdfKitDocument(docDefinition, options);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');

    pdfDoc.pipe(res);
    pdfDoc.end();

  });

}