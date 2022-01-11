import Express  from "express";

const RecordRouter = Express.Router();

RecordRouter.get('/', (req, res) => {
    res.send('Welcome to Records Route');
})

export default RecordRouter;