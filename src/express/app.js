const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(cors())

const routes = {
    stock: require('../express/routes/stock'),
    proyectos: require('../express/routes/proyectos'),
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//endpoints stock
app.get(`/stock`, routes.stock.getAll)
app.get(`/stock/:id`, routes.stock.getById)
app.put(`/stock/:id`, routes.stock.update)
app.post(`/stock`, routes.stock.create)
app.delete(`/stock/:id`, routes.stock.remove)
//endpoints proyecto 
app.get(`/proyectos`, routes.proyectos.getAll)
app.get(`/proyectos/:id`, routes.proyectos.getById)
app.put(`/proyectos/:id`, routes.proyectos.update)
app.post(`/proyectos`, routes.proyectos.create)
app.delete(`/proyectos/:id`, routes.proyectos.remove)       
//endpoints cuentavueltas

module.exports = app;