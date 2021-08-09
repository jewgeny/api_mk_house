const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
// const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(cors({origin: PORT}));

app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.json( {limit: '50mb', extended: true}));

app.get('/', function(req, res) {
    //res.sendFile(path.join(__dirname+'/index.html'));
    res.sendFile('index.html');
});

app.post('/', (req, res) => {
    //console.log('Result of body',req.body);

    const smtpTransporter = nodemailer.createTransport({
        host: 'w00e15db.kasserver.com',
        port: 587,
        secure: false,
        auth: {
          user: 'info@jewgeny.com',
          pass: 'wtn13041985'
        }
    });

      let emailData =
            `
            <p style="text-align:left; font-weight:bold">Infoformation von Interessenten</p>
                  <ul>
                    <li>Vorname: ${req.body.firstName}</li>
                    <li>Nachname: ${req.body.lastName}</li>
                    <li>Email: ${req.body.email}</li>
                    <li>Telefon: ${req.body.phone}</li>
                    <li>Strasse: ${req.body.street} ${req.body.street_number}</li>
                    <li>PLZ: ${req.body.plz}</li>
                    <li>Ort: ${req.body.place}</li>
                  </ul>
            ${req.body.yourMessage !== 'null'?
                `
                <div>
                    <p style="font-weight:bold">Nachricht von Interessenten</p>
                    <p>${req.body.yourMessage}</p>
                </div>
                `
                :''
            }
            <p style="font-weight:bold">Interessierte Produkte</p>
           <p>${req.body.products}</p>
           `
      ;

      console.log('emailData', emailData);

        attachments = [];
        if (req.body.fileNameZaun !== 'null') {
            attachments.push({
                filename: req.body.fileNameZaun,
                path: req.body.formDataZaun
            })
        }
        if (req.body.fileNameFluegeltor !== 'null') {
            attachments.push({
                filename: req.body.fileNameFluegeltor,
                path: req.body.formDataFluegeltor
            })
        }
        if (req.body.fileNameSchiebetor !== 'null') {
            attachments.push({
                filename: req.body.fileNameSchiebetor,
                path: req.body.formDataSchiebetor
            })
        }
        if (req.body.fileNamePforte !== 'null') {
            attachments.push({
                filename: req.body.fileNamePforte,
                path: req.body.formDataPforte
            })
        }
        if (req.body.fileNameStahlGelaender !== 'null') {
            attachments.push({
                filename: req.body.fileNameStahlGelaender,
                path: req.body.formDataStahlGelaender
            })
        }
        if (req.body.fileNameEdelstahlGelaender !== 'null') {
            attachments.push({
                filename: req.body.fileNameEdelstahlGelaender,
                path: req.body.formDataEdelstahlGelaender
            })
        }
        if (req.body.fileNameGelaenderMitGlas !== 'null') {
            attachments.push({
                filename: req.body.fileNameGelaenderMitGlas,
                path: req.body.formDataGelaenderMitGlas
            })
        }
        if (req.body.fileNameTreppenHandlaufEdelstahl !== 'null') {
            attachments.push({
                filename: req.body.fileNameTreppenHandlaufEdelstahl,
                path: req.body.formDataTreppenHandlaufEdelstahl
            })
        }
        if (req.body.fileNameGlasvordachFreitragend !== 'null') {
            attachments.push({
                filename: req.body.fileNameGlasvordachFreitragend,
                path: req.body.formDataGlasvordachFreitragend
            })
        }
        if (req.body.fileNameGlasvordachTrave !== 'null') {
            attachments.push({
                filename: req.body.fileNameGlasvordachTrave,
                path: req.body.formDataGlasvordachTrave
            })
        }
        if (req.body.fileNameGlasvordachZugstangen !== 'null') {
            attachments.push({
                filename: req.body.fileNameGlasvordachZugstangen,
                path: req.body.formDataGlasvordachZugstangen
            })
        }
        if (req.body.fileNameGlasvordachPfosten !== 'null') {
            attachments.push({
                filename: req.body.fileNameGlasvordachPfosten,
                path: req.body.formDataGlasvordachPfosten
            })
        }
        if (req.body.fileNameStahltreppe !== 'null') {
            attachments.push({
                filename: req.body.fileNameStahltreppe,
                path: req.body.formDataStahltreppe
            })
        }

      const mailOptions = {
          from: '"Anfrage von Konfigurator" <info@jewgeny.com>',
          to: 'info@jewgeny.com',
          subject: 'Anfrage von Konfigurator',
          //text: 'Hello world',
          html: emailData,
          attachments: attachments
      }

      smtpTransporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          res.render('Anfrage', {msg: 'Anfrage wurde erfolgreich gesendet'});
      })

});

//to start the server: npm run dev

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})