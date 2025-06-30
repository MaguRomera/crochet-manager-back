const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(cors())

const routes = {
    stock: require('../express/routes/stock'),
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
//endpoints cuentavueltas

module.exports = app;