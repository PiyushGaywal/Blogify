const express=require('express')
const Router=express.Router()
const Auth=require('../controller/AuthC')

Router.get('/signup',Auth.Showsignup)
Router.post('/signup',Auth.Signup)
Router.get('/login',Auth.Showlogin)
Router.post('/login',Auth.Login)


module.exports=Router
