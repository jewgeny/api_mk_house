const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config();
//const bodyParser = require('body-parser');
var fs = require('fs');
const {createPdfAndSendMail} = require(`${__dirname}/createPdf`);


app.use(cors({origin: port}));

app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.json({limit: '50mb', extended: true}));

//Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://mk-hausservice.netlify.app");
    //res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });


app.get('/', function(req, res) {
    res.send({msg: 'Hello world!'});
    //res.sendFile('index.html');
});

app.post('/', (req, res) => {
    let html = req.body.products;
    createPdfAndSendMail(html, req, res);

});

//to start the server: npm run dev

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})