const express = require("express");
const hbs = require('hbs');
require('dotenv').config();

const app = express();
const port = process.env.port;

// Handlebar
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


// Servir contenido estático
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render('home', {
    nombre: 'Chamarro Maxi',
    titulo:'Aprendiendo Node'
  });
});

// app.get('/', (req, res) => {
//   res.send('Home Page')
// })

app.get("/generic", (req, res) => {
  res.render('generic', {
    nombre: 'Chamarro Maxi',
    titulo: 'Aprendiendo Node'
  });
});

app.get("/elements", (req, res) => {
  res.render('elements',{
    nombre: 'Chamarro Maxi',
    titulo: 'Aprendiendo Node'
  });
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/404.html");
  //__dirname trae todo el Path donde estoy parado
});

app.listen(port, () => {
  console.log(`Escuchando puerto http://localhost:${port}`);
});
