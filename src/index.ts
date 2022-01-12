import Express from "express";
import Dotenv from 'dotenv';
import RecordRouter from './Routes/Records';
import {intializeBD} from './Database/Database';

Dotenv.config();
intializeBD();

const App = Express();

App.all('/', (req, res) => {
    res.send('Welcome To Crud Application');
});

App.use("/records", RecordRouter);

const Port: number = parseInt(<string>process.env.PORT, 10);
App.listen(Port, () => {
    console.log(`Server started, Listening on ${Port}`)
});


