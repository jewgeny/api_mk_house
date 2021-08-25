const fs = require('fs');

const deletePdf = (pdf) => {
    console.log('deletePdf', pdf);
    //if (fs.existsSync(pdf)) {
        fs.unlink(pdf, (err) => {

            if (err) {
                console.error(`The PDF could not be deleted!!! The possible error is: `, err)
                return;
            }
            console.log(`PDF successful deleted.`);
        });
    //}

}

module.exports = {deletePdf};