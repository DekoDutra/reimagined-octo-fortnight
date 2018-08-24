const express = require('express');
const morgan = require('morgan');
const path = require('path');
const serveStatic = require('serve-static');
const localStorage = require('localStorage');

app = express();

app.use(serveStatic(__dirname + "/dist"));
app.use(morgan('dev'));

const port = 8058;
app.listen(port);

localStorage.setItem("STATUS_LEMBRETE", false);


app.route('/servidor/lembrete')
  .get(function(req, res) {
    if(localStorage.getItem("STATUS_LEMBRETE")){
      localStorage.setItem("STATUS_LEMBRETE", false);
    }
    res.send(localStorage.getItem("STATUS_LEMBRETE"));
    console.log(localStorage.getItem("STATUS_LEMBRETE"));
  })
  .post(function(req, res) {
    localStorage.setItem("STATUS_LEMBRETE", true);
    res.send(true);
  });

console.log('Servidor iniciado na porta: '+ port);