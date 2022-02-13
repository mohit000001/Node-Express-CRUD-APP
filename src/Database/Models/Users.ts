import Mongoose from "mongoose";

const UsersSchema = new Mongoose.Schema({
   userName: String,
   password: String,
});

const UsersModel = Mongoose.model('users', UsersSchema);

export default UsersModel;