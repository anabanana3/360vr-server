import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import cors from 'cors';
import { onStoreData } from './app.js';
import { connectToMongoDB } from './mongoDB.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT;
const sslport = process.env.SSL_PORT;
console.log(__dirname);
var options = {
    key: fs.readFileSync(__dirname.replace("/dist", "/src") + '/cert/domain.key'),
    cert: fs.readFileSync(__dirname.replace("/dist", "/src") + '/cert/domain.crt')
};
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
//var server = https.createServer(options);
http.createServer(app).listen(port, () => { return console.log(`Express is listening at http://localhost:${port}`); });
https.createServer(options, app).listen(sslport, () => { return console.log(`Express is listening at http://localhost:${sslport}`); });
app.use(express.json());
app.use(cors(corsOptions));
async function initApp() {
    await connectToMongoDB();
}
app.get('/', (req, res) => {
    res.send('Welcome to 360VR server!');
});
app.post('/storeMetrics', (req, res) => {
    let data = req.body.data;
    console.log(req.body);
    if (req.body !== undefined)
        onStoreData(data);
    res.send('Data Received: ' + JSON.stringify(data));
});
/*app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});*/
initApp();
//# sourceMappingURL=index.js.map