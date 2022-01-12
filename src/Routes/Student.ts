import { error } from "console";
import Express from "express";
import Mongoose from "mongoose";
import url from 'url';
import StudentModel from '../Database/Models/Student'
import { Student, Response } from "../Types";
const StudentRoute = Express.Router();

StudentRoute.get('/', (req, res) => {
    const data = StudentModel.find((err: any, resp) => {
        let response: Response = {
            status : "successfull",
        };
        if(err) {
           response.status = "faild";
           response.message = err.message;
           res.send(response);
           return;
        }
        response.data = resp;
        res.send(response);
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
    studentData.save(function (err: any, resp: any) {
        let response: Response = {
            status : "successfull",
        };
        if(err) {
           response.status = "faild";
           response.message = err.message;
           res.send(response);
           return;
        }
        response.data = {
            id: resp.id,
            name: resp.name
        };
        res.send(response);
      });
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
        let response: Response = {
            status : "successfull",
        };
        if(err) {
           response.status = "faild";
           response.message = err.message;
           res.send(response);
           return;
        }
        response.message = `Record updated sucessfully`;
        res.send(response);
    })
})

StudentRoute.delete('/', (req, res) => {
    const requestBody = req.body;
    const StudentId = { id : requestBody.query.id };
    StudentModel.deleteMany(StudentId, (err: any) => {
        let response: Response = {
            status : "successfull",
        };
        if(err) {
           response.status = "faild";
           response.message = err.message;
           res.send(response);
           return;
        }
        response.message = `Record deleted sucessfully`;
        res.send(response);
    });
})

export default StudentRoute;