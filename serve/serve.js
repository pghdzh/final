const express = require('express')
const app = express()
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

const cors = require('cors')
const router = require('./apiRouter')

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})

app.use(
    cors({
        origin: ['http://localhost:8080'],
        methods: ['get', 'post'],
        allowedHeaders: ['Content-Type', 'Authorization', 'enctype', 'token']
    })
)
app.use('/api', router)


io.on("connection", socket => {
    console.log("有客户端连进来了:" + socket.id);
    socket.on("chat", data=>{
        io.emit('chat',data)
    })
});

httpServer.listen(3000, () => {
    console.log("监听中...");
});

// let server = app.listen(3000, function () {
//     let host = server.address().address
//     let port = server.address().port
//     console.log(host, port)
// })