const express = require('express');
const cors = require('cors');

const { setError } = require('./src/utils/error/error');
const { connectDb } = require('./src/utils/db/db');
const MascotasRoutes = require("./src/api/mascotas/mascotas.routes"); 
const UserRoutes = require('./src/api/users/users.routes');
const cloudinary = require('cloudinary').v2

const PORT = process.env.PORT || 8080

const app = express();

connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json({
    limit: '5mb'
}))

app.use(express.urlencoded({ limit: '5mb', extended: true }))

app.use('/users', UserRoutes)
app.use('/mascotas', MascotasRoutes)

app.use('*', (req, res, next) => {
    return next(setError(404, 'Route not found'))
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error')
})

app.disable('x-powered-by')

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})