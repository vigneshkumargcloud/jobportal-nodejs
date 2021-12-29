const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
var bycrpt=require('bcrypt');
const saltrounds=10;
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const nodemailer = require("nodemailer");
const jwt= require("jsonwebtoken");
app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST",],
    credentials:true
}));
app.use(cookieParser());
app.use(express.urlencoded());
app.use(session({
key:"userId",
secret:"subscribe",
resave:false,
saveUninitialized:false,
cookie:{
    expires:60 *60*24,

}
}));


let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
      user: 'vigneshkumarangu94@gmail.com',
      pass: 'vicky27c.s.e'
  }
});

// register
router.post("/register",(req,res)=>{
  
    bycrpt.hash(req.body.password,saltrounds,(err,hash)=>{
        if(err){
            console.log(err);
        }
        var sql="INSERT  INTO  user_account(user_type_id,email,password,date_of_birth,gender,isactive,contactNumber,userimage,reg_date,username,companyname) VALUES('"+req.body.user_type_id+"','"+req.body.email+"','"+hash+"','"+req.body.date_of_birth+"','"+req.body.gender+"','"+req.body.isactive+"','"+req.body.contactNumber+"','"+req.body.userimage+"','"+req.body.reg_date+"','"+req.body.username+"','"+req.body.companyname+"')";
        conne.query(sql,(err,rows)=>{
          if(!err){
           
            res.status(201).json({
          message:'posted successfully',
         
            });
           
          }
        
          else{
            console.log(err)
          }
        })
    })
   
});

 

router.post("/login",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const user_type_id=req.body.user_type_id;

    conne.query("select * from user_account where username=? and user_type_id=?",[username,user_type_id],(err,result)=>{
        if(err){
          res.send({err:err});
        }
        if(result.length > 0){
            bycrpt.compare(password,result[0].password,(error,response)=>{
                if(response){
                  session.Session=result;
                  session.username=req.body.username;
                  session.user_type_id=req.body.user_type_id;
                  const token=jwt.sign({username:req.body.username,user_type_id:req.body.user_type_id},'secret_this_is_longer',{expiresIn:"1h"})
                   console.log(session.username);
                    res.status(201).json({
                        message:result,
                        username:session.username,
                        user_type_id:session.user_type_id,
                        token:token,
                       
                          });
                }
                else{
                    res.status(400).json({
                        message:'wrong user name or password',
                       
                          });
                }
            })
           
                 
        }
        else{
            res.status(400).json({
                message:'user doesnt exits',
               
                  });
        }
    });
});

// employeer

router.post("/employeerLogin",(req,res)=>{
  const companyname=req.body.companyname;
  const password=req.body.password;
  const user_type_id=req.body.user_type_id;

  conne.query("select * from user_account where companyname=? and user_type_id=?",[companyname,user_type_id],(err,result)=>{
      if(err){
        res.send({err:err});
      }
      if(result.length > 0){
          bycrpt.compare(password,result[0].password,(error,response)=>{
              if(response){
                session.Session=result;
                session.companyname=req.body.companyname;
                session.user_type_id=req.body.user_type_id;
               
                const token=jwt.sign({username:req.body.username,user_type_id:req.body.user_type_id},'secret_this_is_longer',{expiresIn:"1h"})
                
                 console.log(session.username);
                  res.status(201).json({
                      message:result,
                      companyname:session.companyname,
                      user_type_id:session.user_type_id,
                      
                      token:token,
                        });
              }
              else{
                  res.status(400).json({
                      message:'wrong user name or password',
                     
                        });
              }
          })
         
               
      }
      else{
          res.status(400).json({
              message:'user doesnt exits',
             
                });
      }
  });
});

router.put('/changepassword',function(req,res){
  const email=req.body.email;
  conne.query("select * from user_account where email=?",[email],(err,result)=>{
    if(err){
      res.send({err:err});
    }
    if(!result){
      res.json({
        success:false,
        message:'email not found'
      })
    }
    // if(email!=req.body.email){
    //   res.json({
    //     success:false,
    //     message:'email not found'
    //   })

    // }
    
    else{
      console.log(result);
      const resettoken=jwt.sign({username:req.body.username,user_type_id:req.body.user_type_id},'secret_this_is_longer',{expiresIn:"1h"});
        var email={
          from:'vigneshkumarangu94@gmail.com',
          to:req.body.email,
          subject:'password reset link',
          text:'hello'+result.username+',you recently requested for a password reset link.please check the below link:<br><br><a href="http://localhost:4200/forgot">http://localhost:4200/home'+resettoken+'/</a>',
          html:'hello'+result.username+',you recently requested for a password reset link.please check the below link:<br><br><a href="http://localhost:4200/forgot">http://localhost:4200/home/'+resettoken+'</a>'
        }
        transporter.sendMail(email,function(err,info){
          if(err) console.log(err);
          else{
            console.log("mail sent");
          }
        })

       res.json({success:true,message:'check your email for the password link',result});
    }

  })

})


router.put('/register/:id', function (req, res) {

  
  bycrpt.hash(req.body.password,saltrounds,(err,hash)=>{
    if(err){
        console.log(err);
    }
   
    conne.query('update user_account set password=? where id=?',[hash,req.params.id], function (error, results, fields) {
      if(!err){
       
        res.status(201).json({
      message:'posted successfully',
     
        });
       
      }
    
      else{
        console.log(err)
      }
    })
})


 
});

router.get('/:id', function(req, res, next) {
  conne.query('select * from user_account  where id=?',[req.params.id],(err,rows)=>{
    if(!err)
    res.status(201).json({
      message:rows,
      
        });
   
    else{
      console.log(err)
    }
  })
 });


module.exports = router;


