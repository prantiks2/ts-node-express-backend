import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file as early as possible
import { client as MongoClient } from './config/mongo';
import bodyParser from 'body-parser';
import { routes } from './routes/routes';

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

for (const route of routes) {
    app.use(route.path, route.router);
}

app.use(function (req, res, next) {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("Not Found\n");
    res.end();
});

async function startApp() {
    try {
        console.log('Connecting to Mongodb');
        await MongoClient.connect();
        console.log('Connected to Mongodb');
        app.listen(port, () => {
            console.log(`server started on the port ${port}`);
        });
    } catch (err) {
        console.log('App startup error', err);
    } finally {

    }
}

startApp();
  
const cleanup = () => { // SIGINT is sent for example when you Ctrl+C a running process from the command line.
    MongoClient.close(); // Close MongodDB Connection when Process ends
    console.log('Connection to Mongodb closed');
    console.log('Cleanup done, exiting now.');
    process.exit(); // Exit with default success-code '0'.
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);