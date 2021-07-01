//Require modules
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 8081;

//Uso bodyPaser
app.use(express.urlencoded({extended: true}))

//Motor de Vistas EJS
app.set('view engine', 'ejs');
app.use(ejsLayouts);

//Cargar Modulo de ROUTES
const  router = require('./routes/routes');
app.use('/', router);

//Uso de static
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.listen(port, () =>{
     console.log("Servidor activo en puerto 8081");
});