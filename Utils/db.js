const mongoose=require('mongoose')
const url='mongodb+srv://Piyu1cbz:Piyu1cbz@mydatabase.bvhet.mongodb.net/Blogify?retryWrites=true&w=majority&appName=MyDatabase'
const db=mongoose.connect(url)
.catch((err)=>{console.log(err);
})