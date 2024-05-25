module.exports = function (app) {

  const path = require('path');

  app.get('/pdf', function (req, res) {

    const fontsPath = path.join(__dirname, '../../fonts'); // Adjust path as needed

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

    // Generate PDF document
    var pdfDoc = printer.createPdfKitDocument(docDefinition, options);

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');

    // Pipe the PDF document to the response stream
    pdfDoc.pipe(res);
    pdfDoc.end();

  });

}