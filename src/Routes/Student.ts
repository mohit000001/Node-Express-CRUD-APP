import { fail } from "assert";
import { error } from "console";
import Express from "express";
import Mongoose from "mongoose";
import url from 'url';
import StudentModel from '../Database/Models/Student'
import { Student, Response } from "../Types";
import { ValidateAddOpt, ValidateEditOpt, ValidateDeleteOpt } from "../Utils/Validations";
const StudentRoute = Express.Router();

StudentRoute.get('/', (req, res) => {
    const data = StudentModel.find((err: any, resp) => {
        let response: Response = {
            status : "successfull",
        };
        if(err) {
           console.log('Database Error : ', err);
           response.status = "faild";
           response.message = err.message;
           res.send(response);
           return;
        }
        response.data = resp.map((data) => {
            return {
                id: data.id,
                name: data.name,
                age: data.age,
                class: data.class,
                section: data.section
            }
        });
        res.send(response);
    });
})

StudentRoute.post('/', (req, res) => {
    const requestBody = req.body;
    console.log('Executing Add record opt, Request Body : ', requestBody)
    const valiRes = ValidateAddOpt(requestBody);
    if(valiRes.status === false) {
        let response: Response = {
            status: "failed",
            message: valiRes.message
        };
        res.send(response);
        return;
    }
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
           console.log('Database Error : ', err);
           response.status = "faild";
           response.message = "Someting went wrong, please try later. errorCode #02";
           res.send(response);
           return;
        }
        response.message = "Added Successfully";
        response.data = {
            id: resp.id,
            name: resp.name
        };
        res.send(response);
      });
})

StudentRoute.put('/', (req, res) => {
    const requestBody = req.body;
    console.log('Executing Edit record opt, Request Body : ', requestBody)
    const valiRes = ValidateEditOpt(requestBody);
    if(valiRes.status === false) {
        let response: Response = {
            status: "failed",
            message: valiRes.message
        };
        res.send(response);
        return;
    }
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
            console.log('Database Error : ', err);
           response.status = "faild";
           response.message = "Someting went wrong, please try later. errorCode #02";;
           res.send(response);
           return;
        }
        response.message = `Record updated sucessfully`;
        res.send(response);
    })
})

StudentRoute.delete('/', (req, res) => {
    const requestBody = req.query;
    console.log('Executing Delete record opt, Request Body : ', req.query)
    const valiRes = ValidateDeleteOpt(requestBody);
    if(valiRes.status === false) {
        let response: Response = {
            status: "failed",
            message: valiRes.message
        };
        res.send(response);
        return;
    }
    const StudentId = { id : requestBody.id };
    StudentModel.deleteMany(StudentId, (err: any) => {
        console.log('Database Error : ', err);
        let response: Response = {
            status : "successfull",
        };
        if(err) {
           response.status = "faild";
           response.message = "Someting went wrong, please try later. errorCode #02";;
           res.send(response);
           return;
        }
        response.message = `Record deleted sucessfully`;
        res.send(response);
    });
})

export default StudentRoute;