const express=require('express')
const app=express()

const AuthR=require('./routes/AuthR')
const bodyParser = require('body-parser')
const session=require('express-session')
const Blogs=require('./models/BlogSchema')
const db=require('./Utils/db')
const bw = require('./routes/blog');
const path=require('path')
require('dotenv').config();

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    secret:"Hi",
    resave:false,
    saveUninitialized:false
}))
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});
app.get('/',async(req,res,next)=>{
    const AllBlogs= await Blogs.find({})
    res.render('Display/Hp',{blog:AllBlogs});
})
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use('/blog', bw);

app.use(AuthR)
app.use(bw)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});