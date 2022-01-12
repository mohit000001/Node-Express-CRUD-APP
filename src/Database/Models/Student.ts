import Mongoose from "mongoose";

const StudentSchema = new Mongoose.Schema({
    id: Number,
    name: String,
    age: Number,
    class: String,
    section: String
});

const StudentModel = Mongoose.model('student', StudentSchema);

export default StudentModel;