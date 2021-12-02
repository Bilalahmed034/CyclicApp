const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const http = require('http')
const socketIO = require('socket.io')
require('./models')
const authRoute = require('./routes/auth.route');

const { httpLogStream } = require('./utils/logger');
const authenticateToken = require('./middlewares/authenticate');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
app.use(cors());


global.__basedir = path.resolve() + "/..";
console.log(path.resolve());
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "API working fine",
        }
    });
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    //authenticateToken(next)

});
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*"
    }
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (message) => {
        console.log('message From Mobile Apppp=>>>>>:', message);
        io.emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});
module.exports = server;