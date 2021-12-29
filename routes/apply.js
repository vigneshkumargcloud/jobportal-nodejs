const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');

router.post('/',function(req,res,next){

    var sql="INSERT  INTO job_post_activity (user_acc_id,job_post_id,jobappliedfor,js,applstatus) VALUES ('"+req.body.user_acc_id+"','"+req.body.job_post_id+"','"+req.body.jobappliedfor+"','"+req.body.js+"','"+req.body.applstatus+"')";
    conne.query(sql,(err,rows)=>{
      if(!err){
       
       
        res.status(201).json({
      message:'Job Applied successfully',
      
        });
       
      }
    
      else{
        console.log(err)
      }
    })
  });


  router.put('/:id', function (req, res) {
    var js=req.body.js;
    conne.query('update job_post_activity set js=? where id=?',[js,req.params.id], function (error, results, fields) {
	  if (!error)
	  res.status(201).json({
        message:'status updated successfully',
        

        
          });
          else{
            console.log(error)
          }
	});
});





router.get('/:id', function(req, res, next) {
  conne.query('select * from job_post_activity  where id=?',[req.params.id],(err,rows)=>{
    if(!err)
    res.status(201).json({
        message:rows,
      
        });
   
    else{
      console.log(err)
    }
  })
 });
  
router.get('/', function(req, res, next) {
    conne.query('select * from job_post_activity',(err,rows)=>{
      if(!err)
      res.send(rows);
     
      else{
        console.log(err)
      }
    })
   });
   router.get('/byuserid/:user_acc_id', function(req, res, next) {
    conne.query('select * from job_post_activity  where user_acc_id=?',[req.params.user_acc_id],(err,rows)=>{
      if(!err)
      res.status(201).json({
          message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });
   router.get('/foremployee/:jobappliedfor', function(req, res, next) {
    conne.query('select * from job_post_activity  where jobappliedfor=?',[req.params.jobappliedfor],(err,rows)=>{
      if(!err)
      res.status(201).json({
          message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });

   router.get('/users/:user_acc_id', function(req, res, next) {
   console.log('user');
    conne.query('select job_post.description,job_post.city,job_post.jobtitle,job_post.maxsalary,job_post_activity.user_acc_id,job_post_activity.js from job_post JOIN job_post_activity ON job_post.id=job_post_activity.job_post_id where job_post_activity.user_acc_id=?',[req.params.user_acc_id],(err,rows)=>{
      if(!err){
      console.log("join"+rows);
      res.status(201).json({
        message:rows,
        
          });
     
    }
      else{
        console.log(err)
      }
    })
   });


  //  js


  // router.get('/jobsts/:user_acc_id/:job_post_id', function(req, res, next) {
  //   console.log('user');
  //    conne.query('select job_post_activity.js,job_post_activity.user_acc_id from job_post join job_post_activity on job_post.id= job_post_activity.job_post_id  where job_post_activity.user_acc_id=? and job_post_activity.job_post_id=?',[req.params.user_acc_id,req.params.job_post_id],(err,rows)=>{
  //      if(!err){
  //      console.log("join"+rows);
  //      res.status(201).json({
  //        message:rows,
         
  //          });
      
  //    }
  //      else{
  //        console.log(err)
  //      }
  //    })
  //   });

    router.get('/jobsts/:js/:jobappliedfor', function(req, res, next) {
      console.log('user');
              // var js=req.body.js;
       conne.query('select job_post.jobtitle,job_post_activity.js,job_post_activity.job_post_id,job_post.city,job_post_activity.id,job_post.description,job_post.maxsalary,user_account.username,job_post_activity.user_acc_id from job_post_activity join job_post on job_post_activity.job_post_id=job_post.id   join user_account on job_post_activity.user_acc_id=user_account.id where job_post_activity.applstatus=? and job_post_activity.jobappliedfor=? ',[req.params.js,req.params.jobappliedfor],(err,rows)=>{
         if(!err){
         console.log("join"+rows);
         res.status(201).json({
           message:rows,
           
             });
        
       }
         else{
           console.log(err)
         }
       })
      });
module.exports = router;