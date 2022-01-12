import Express from "express";
import Mongoose from "mongoose";
import StudentModel from '../Database/Models/Student'
const RecordRouter = Express.Router();

RecordRouter.all('/', (req, res) => {
    res.send('ss');
})

RecordRouter.get('/s', (req, res) => {
    const studentData = new StudentModel({
        id: 1254,
        name: 'Mohit',
        age: 25,
        class: '10th',
    })
    studentData.save(function (err: any) {
        if (err) {
            console.log(err)
        }
    });
    res.send('');
})
export default RecordRouter;