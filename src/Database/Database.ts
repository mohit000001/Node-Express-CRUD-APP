import Dotenv from 'dotenv';
import Mongoose from "mongoose";
// test
Dotenv.config();

 function intializeBD() {  
   Mongoose.connect(`mongodb://${process.env.DATABASE_HOSTNAME}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`)
   .then(()=> {
     console.log('connected to database')
   }).catch((error) => {
     console.error('Error while connecting to database, ', error)
   })
}

export {intializeBD};