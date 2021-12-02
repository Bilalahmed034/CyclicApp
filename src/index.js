const server = require('./app');
// const { logger } = require('./utils/logger');

const PORT = process.env.PORT || 3000;

server.listen(PORT,() => {
    console.info(`Running on PORT ${PORT}`);
});
