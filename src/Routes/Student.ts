import { error } from "console";
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

StudentRoute.get('/', (req, res) => {
    const data = StudentModel.find((err: any, resp) => {
        res.send(resp);
    });
})

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
    res.send('Added');
})

StudentRoute.put('/', (req, res) => {
    const requestBody = req.body;
    const StudentId = { id : requestBody.query.id };
    const inputData  = {
        name: requestBody.data.name,
        age: requestBody.data.age,
        class: requestBody.data.class,
        section: requestBody.data.section
    }
    StudentModel.updateMany(StudentId, inputData,(err : any, resp: any) => {
        console.log(resp);
    })
    res.send('Updated');
})

StudentRoute.delete('/', (req, res) => {
    const requestBody = req.body;
    const StudentId = { id : requestBody.query.id };
    StudentModel.remove(StudentId);
    res.send('Deleted');
})

export default StudentRoute;