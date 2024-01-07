const express = require('express')
const productsRouter = require('./src/routes/products.router.js')
const cartsRouter = require('./src/routes/carts.router.js')
const viewsRouter = require('./src/routes/views.router.js')
const { Server: ServerIO } = require('socket.io');


//Entrega 5 Websockets + Handlebars
const handlebars = require('express-handlebars')

const app = express()

app.use(express.static(__dirname+'/public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Entrega 5 Websockets + Handlebars
app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')
app.use('/static', express.static(__dirname+'/public'))


//Las rutas de mi server
app.use('/', viewsRouter);
app.use('/api/products',productsRouter )
app.use('/api/carts', cartsRouter )

const httpServer = app.listen(8080, ()=>{
    console.log('Server con Socket en el puerto 8080')
})

const socketServer = new ServerIO(httpServer)


 socketServer.on('connection', socket => {
     console.log("Nuevo cliente conectado")   
     socket.on('message', data=>{ 
        console.log(data)
     })
 
   
 })



//console.log(socketServer)
