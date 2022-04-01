const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')
require('dotenv/config')

app.use(cors())
app.options('*', cors())

//Middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler)

//Routes
const categoriesRoutes = require('./routes/categories')
const productsRoutes = require('./routes/products')
const usersRoutes = require('./routes/users')
const ordersRoutes = require('./routes/orders')
const cepRoutes = require('./routes/cep')
const freteRoutes = require('./routes/frete')

const api = process.env.API_URL

app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/orders`, ordersRoutes)
app.use(`${api}/cep`, cepRoutes)
app.use(`${api}/frete`, freteRoutes)

//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
}).then(() => {
    console.log('We are using ' + process.env.DB_NAME)
    console.log('Database Connection is ready...')
})
.catch((err) => {
    console.log(err)
})

const PORT = process.env.PORT || 3000

//SERVER
app.listen(PORT, () => {
    console.log('server is running http://localhost:3000')
})