import Express from "express";
const AuthRoutes = Express.Router();
import { User } from "../Utils/Types";
import UsersModel from '../Database/Models/Users';
import JWT from 'jsonwebtoken';
import { verifyUser, generateToken } from '../Utils/Common';

AuthRoutes.post('/register', async (req: any, res) => {
    const requestBody = req.body;
    const user: User = {
        userName: requestBody.userName,
        password: requestBody.password
    }
    const userData = new UsersModel(user);
    try {
        await userData.save();
        res.send({
            status: "successfull",
            message:"User Added Successfully"
        });

    } catch(err: any) {
        console.log(err)
        res.send({
            status: "faild",
            message: err.message ||  'Database Error'
        });
    }  
})
AuthRoutes.post('/login', async (req: any, res) => {
    const requestBody = req.body;
    const user: User = {
        userName: requestBody.userName,
        password: requestBody.password
    }
    
    try {
         const users: User[] = await UsersModel.find({userName: user.userName});
         if(users.length > 0) {
            if(users[0].password === user.password){

               const token = await generateToken(user.userName);
               res.send({
                status: "Successfull",
                message: 'LogIN Success',
                token
            });  
            }
            else{
                res.send({
                    status: "Login Faild",
                    message: 'Wrong Password',
                });   
            }
         } else {
            res.send({
                status: "Login Faild",
                message: 'User Not Found',
            });   
         }
         res.send('')
         console.log(users); 
    }
    catch(err:any) {
        console.log(err)
        res.send({
            status: "Login Faild",
            message: err.message ||  'Database Error'
        });  
    }
})

AuthRoutes.post('/authverify', async (req: any, res) => {
  const token = req.header('Auth');
  if(token) {
    const response = await verifyUser(token);
    if(!response){
        res.send({
            status: "Faild",
            message: 'Token not matching'
        });  
    } else {
        res.send({
            status: "Sucessfull",
            data: response,
        }); 
    }
  } else {
    res.send({
        status: "Faild",
        message: 'Token not found'
    });
  }

})
export default AuthRoutes;