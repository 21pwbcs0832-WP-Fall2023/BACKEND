
const app = require('./app');
const connectdatabase = require('./config/database')

const dotenv = require('dotenv');

// handle uncaugth expections 
process.on('uncaughtException' , err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shuting down the Server due to uncaught expection')
    process.exit(1);

})

// Setting up config file
dotenv.config({path: 'config/config.env'})

// connect to database 
 connectdatabase();

app.get('/', (req, res) => {
    res.send("Welcome to my website");
});

const server = app.listen(process.env.PORT , () => {
    console.log(`Server is running on http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// handle uncatached error 
process.on('unhandledRejection' , err => {
    console.log(`EEROR: ${err.message}`)
    console.log('Shuting down the Server due to unhandled Promise rejecrion');
    server.close(() => {
        process.exit(1);
    })
});

