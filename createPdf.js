var pdf = require('html-pdf');
var fs = require('fs');
//var html = fs.readFileSync('./test/businesscard.html', 'utf8');
var options = { format: 'Letter' };
var pdfFile = './uploads/Bestellungen.pdf';
var {mailSender} = require(`${__dirname}/mailSender`);

const createPdfAndSendMail = (html, req, response) => {

        pdf.create(html, options).toFile(pdfFile, function(err, res) {
            if (err) {
                console.error(`The PDF could not be found!!! The possible error is: `, err);
                return;
            }
            console.log(res); // { filename: '/Bestellungen.pdf' }

            checkIfPdfExists(pdfFile, req, response);
        });

}

const checkIfPdfExists = (pdfFile, req, response) => {

    fs.access(pdfFile, fs.F_OK, (err) => {

        if (err) {
            console.error(`The PDF file could not be found!!! The possible error is: `, err);
            return;
        }

        console.log(`PDF file successfully found and it is ready to be sent.`);

        mailSender(pdfFile, req, response);
    });
}


module.exports = {createPdfAndSendMail};

