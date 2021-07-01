/*jshint esversion: 6 */

//importar modulos 
const { render } = require('ejs');
const express = require('express');
const path = require('path');

//Creamos un objeto de Router Express
const router = express.Router();

//Exportar nuestro modulo ROUTES
module.exports = router;

//Variables
var dolar = 100;
var pesos = 1000;
var tipocambio = 20;
var pesosadar = 0;
var dolarvender  = 0;
var dolarcomprar  = 0;
var recibido  = 0;
var cambio = 0;
var voc;
var salir = false;

var letrero;
var letrero2;

var condiciones;


var compras =0;
var ventas =0;
var tcompras =0;
var tventas =0;

//vender
router.get('/', (req, res) =>{
    res.render('pages/home', {dolar, pesos, tipocambio});
});


router.post('/vender',(req, res) =>{
    dolarvender = 0 ;
    pesosadar = 0;
    dolarvender = req.body.dolares;
    pesosadar = pesosdolar(dolarvender); 
    condiciones = true;
    voc = venderocomprar(condiciones);
    if(salir){
        res.render('pages/Notfound', {dolar, pesos, tipocambio, pesosadar, dolarvender, voc, letrero, letrero2})        
    }
    res.render('pages/letrero', {dolar, pesos, tipocambio, pesosadar, dolarvender, voc, letrero, letrero2})
})

router.post('/tvender',(req,res) =>{
    recibido = 0;
    cambio = 0;
    recibido = req.body.pesosA;
    cambio = darcambio(recibido, condiciones, pesosadar, dolarvender);
    aumentardecrecer(condiciones, pesosadar, dolarvender);
    reportes(condiciones, dolarvender);
    res.render('pages/ticket', {dolar, pesos, tipocambio, pesosadar, dolarvender, voc, recibido, cambio})
})



//COMPRAR

router.get('/comprar', (req, res) =>{
    res.render('pages/comprard', {dolar, pesos, tipocambio})
});

router.post('/comprard', (req,res) =>{
    dolarcomprar = 0;
    pesosadar = 0;
    dolarcomprar = req.body.dolares;
    pesosadar =  pesosdolar(dolarcomprar); 
    condiciones = false;
    voc = venderocomprar(condiciones);
    if(salir){
        res.render('pages/Notfound', {dolar, pesos, tipocambio, pesosadar, dolarvender, voc, letrero, letrero2})        
    }

    res.render('pages/letreroc', {dolar, pesos, tipocambio, pesosadar, dolarcomprar, voc, letrero, letrero2})
});


router.post('/comprart',(req,res) =>{
    recibido = 0;
    cambio = 0;
    var dolarr = dolarcomprar;
    recibido = req.body.dolaresR;
    cambio = darcambio(recibido, condiciones, pesosadar, dolarcomprar);
    aumentardecrecer(condiciones, pesosadar, dolarr);
    reportes(condiciones, compras, ventas, tcompras, tventas, dolarcomprar);
    res.render('pages/ticketc', {dolar, pesos, tipocambio, pesosadar, dolarcomprar, voc, recibido, cambio})
})

router.get('/reporte', (req, res) =>{
    res.render('pages/reportes', {dolar, pesos, tipocambio, ventas, tventas, compras,tcompras})
});



function venderocomprar(w) {
        if(w){
            console.log(dolarvender + "/" + dolar);
            if(dolarvender > dolar){
                salir = true;
            }
            else{
                letrero = 'Pesos a recibir';
                letrero2 = 'Pesos recibidos'
                return 'vender dolar';
            }
        }
        else{
            console.log(pesosadar +"/" +pesos);
            if( pesosadar > pesos)
            {
                salir = true;
            }
            else{
                letrero = 'Dolares a recibir';
                letrero2 = 'Pesos entregados';
                return'comprar dolar'
            }
        }
}



function dolarpesos(numero) {
    return numero / tipocambio;
}

function pesosdolar(numero) {
     return numero * tipocambio;
}

function darcambio(recibido, w, pesosadarF, dolarvenderF){
    if(w){
        if((recibido - pesosadarF) != 0){
            return recibido - pesosadarF
        }
        else{
            cambio = 0;
        }
    }
    else{
        if((recibido - dolarvenderF) != 0){
            return recibido - dolarvenderF;
        }
        else{
            cambio = 0;
        }
    } 
}

function aumentardecrecer(w, pesosadarF, dolarvenderF){
    if(w){
        dolar = dolar - dolarvenderF;
        console.log(dolar  + " - " + dolarvenderF);
        pesos = pesos + pesosadarF;
    }
    else{
        pesos = pesos - pesosadarF;
        dolar = dolar + dolarvenderF;
        console.log(dolar  + " - " + dolarvenderF);

    }
    
}

function reportes(w, ventarealizada){
    if(w){
        console.log(tcompras + "/" + compras +"/"+ventarealizada);
        ventas = ventas + 1;
        tventas = tventas + ventarealizada;
        console.log(tcompras + "/" + compras +"/"+ventarealizada);
    }
    else{
        compras = compras + 1;
        tcompras = tcompras + ventarealizada;
        console.log(tcompras + "/" + compras +"/"+ventarealizada);
    }
}

