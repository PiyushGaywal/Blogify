const express=require('express')
const bw=express.Router()
const multer=require('multer')
const path =require('path')
const Blog=require('../models/BlogSchema')
const lmid=require('../middleware/loginm')
const isAdmin=require('../middleware/adminm')

bw.get('/write',(req,res,next)=>{
    res.render('Display/blog')
})

bw.get('/:id',lmid,async(req,res)=>{
    const blog= await Blog.findById(req.params.id)
    return res.render("Display/Dblog",{blog})
})



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads/'))
  },
  filename: function (req, file, cb) {
    const filename=`${Date.now()}-${file.originalname}`
    cb(null,filename)
  }
})
const upload = multer({ storage: storage })

bw.post('/write',upload.single("coverImage"),async(req,res,next)=>{
    const {title,body}=req.body
    const newBlog = await Blog.create({
            body,
            title,
            createdBy:req.session.user._id,
            coverImageUrl:`/uploads/${req.file.filename}`
    })
    return res.redirect('/')
    
})
bw.post('/blog/delete/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Failed to delete blog');
  }
});



module.exports=bw


