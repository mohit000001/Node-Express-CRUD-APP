import Express from "express";
import Mongoose from "mongoose";
import url from 'url';
import StudentModel from '../Database/Models/Student'

const StudentRoute = Express.Router();

interface Student {
    id: number,
    name: string,
    age: number,
    class: string,
    section: string
}

StudentRoute.post('/', (req, res) => {
    const requestBody = req.body;
    const inputData : Student = {
      id: requestBody.id,
      name: requestBody.name,
      age: requestBody.age,
      class: requestBody.class,
      section: requestBody.section
    }
    const studentData = new StudentModel(inputData)
    studentData.save(function (err: any) {
        if (err) {
            console.log(err)
        }
    });
    res.send('ddd');
})

StudentRoute.get('/', (req, res) => {
    StudentModel.find((err, res) => {
        console.log(res);
    })
    res.send('xxx');
})

export default StudentRoute;