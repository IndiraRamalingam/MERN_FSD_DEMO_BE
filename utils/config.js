const dotenv=require('dotenv');
dotenv.config();

const MONGO_URI=process.env.MONGO_URI;
const PORT=process.env.PORT;
const SECRET_KEY=process.env.SECRET_KEY;
const USER=process.env.USER;
const PASSWORD = process.env.PASSWORD;

console.log(USER,PASSWORD)
module.exports={
    MONGO_URI,
    PORT,
    SECRET_KEY,
    USER,
    PASSWORD,
}