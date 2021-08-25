const nodemailer = require('nodemailer');
const {deletePdf} = require(`${__dirname}/deletePdf`);

const mailSender = (pdfFile, req, res) => {
    let today = new Date().toLocaleDateString();

    const smtpTransporter = nodemailer.createTransport({
        host: process.env.HOST_SERVER,
        port: process.env.EMAIL_PORT,
        tls: {
            ciphers:'SSLv3',
            rejectUnauthorized: false
        },
        //secure: false,
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.USER_PASSWORT
        }

    });

      let emailData_owner =
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

           ${req.body.briefkasten == 'ja'? 'Der Interessente ist an einem Briefkasten interessiert':''}
           `
      ;

        let emailData_user =
            `
              Sehr ${req.body.gender === 'Frau'? 'geehrte' : 'geehrter'} ${req.body.gender} ${req.body.lastName},</br>
              vielen Dank für Ihre Anfrage.</br></br>
              Nach Durchsicht der Unterlagen werden wir uns bei Ihnen melden.</br>
              Im Anhang dieser E-Mail finden Sie Ihre angefragten Produkte.</br></br>
              Viele Grüße</br></br>

              Metalltechnik Kuhn</br>
              Waldemar Kuhn</br>
              Kronskamp 127</br>
              22880 Wedel</br>
              </br>
              Telefon: 04103 / 80 85 326</br>
              Mobil: 0176 / 21 183 725</br>
              Telefax: 04103 / 18 04 190</br>
              E-Mail: metalltechnik-kuhn@gmx.de</br>
              Web: <a href="http://www.metalltechnik-hamburg.de/">www.metalltechnik-hamburg.de</a>
            `
        ;

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

        attachments.push({
            path: pdfFile
        })


      const mailOptions_owner = {
          from: "Anfrage von Metalltechnik Kuhn - Konfigurator <jewgeny@gmx.net>",
          to: process.env.USER_MAIL,
          subject: `Anfrage von ${req.body.firstName}`,
          html: emailData_owner,
          attachments: attachments
      }

      const mailOptions_user = {
        from: "Anfrage von Metalltechnik Kuhn - Konfigurator <jewgeny@gmx.net>",
        to: req.body.email,
        subject: `Ihre Anfrage vom ${today}`,
        html: emailData_user,
        attachments: [
            {
                path: pdfFile
            }

        ]
    }

    let mailOptions = [mailOptions_owner, mailOptions_user];

    for (let i = 0; i < mailOptions.length; i++) {
        smtpTransporter.sendMail(mailOptions[i], (error, info) => {
            if (error){
                res.status(500).send('Sorry, es ist ein Fehler aufgetreten! Bitte versuchen sie es erneut.')
                return console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
                res.status(200).send('Alles gut gelaufen.');
                deletePdf(pdfFile);
            };

            return res.end();
        })
    }
}

module.exports = {mailSender};