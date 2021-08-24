var pdf = require('html-pdf');
//var html = fs.readFileSync('./test/businesscard.html', 'utf8');
var options = { format: 'Letter' };

const createPdf = (html) => {
    //let today = new Date().toLocaleDateString();
    console.log('Create PDF');
    pdf.create(html, options).toFile('./Bestellungen.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
}


module.exports = {createPdf};

