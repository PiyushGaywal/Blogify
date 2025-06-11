const mongoose=require('mongoose')
require('dotenv').config();
const url=process.env.mongoUrl
const db=mongoose.connect(url)
.catch((err)=>{console.log(err);
})