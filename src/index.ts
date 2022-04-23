import Express from "express";
import Dotenv from 'dotenv';
import StudentRoute from './Routes/Student';
import AuthRoutes from "./Routes/Auth";
import {intializeBD} from './Database/Database';
import Cros from 'cors';

Dotenv.config();
intializeBD();

const App = Express();
App.use(Express.json());
App.use(Cros())

App.all('/', (req, res) => {
    res.send('Welcome To Crud Application, use /student to make requests');
});

App.use("/student", StudentRoute);
App.use("/auth", AuthRoutes);

const Port: number = parseInt(<string>process.env.PORT, 10);
App.listen(9000, () => {
    console.log(`Server started, Listening on ${Port}`)
});


