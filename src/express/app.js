const express = require('express');
const bodyParser = require('body-parser');
const routes = {
    stock: require('../express/routes/stock'),
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//endpoints stock
app.get(`/stock`, routes.stock.getAll)
app.get(`/stock/:id`, routes.stock.getById)
app.put(`/stock/:id`, routes.stock.update)
app.post(`/stock`, routes.stock.create)
app.delete(`/stock/:id`, routes.stock.remove)

module.exports = app;