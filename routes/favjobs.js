const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
router.post('/',function(req,res,next){

    var sql="INSERT  INTO favjobs (jobid,userid) VALUES ('"+req.body.jobid+"','"+req.body.userid+"')";
    conne.query(sql,(err,rows)=>{
      if(!err){
       
       
        res.status(201).json({
      message:'this job is saved for future use',
      
        });
       
      }
    
      else{
        console.log(err)
      }
    })
  });
  router.get('/:userid', function(req, res, next) {
    conne.query('select job_post.id,job_post.jobtitle,job_post.city,job_post.maxsalary,job_post.jobcategory_id,favjobs.id from job_post JOIN favjobs ON job_post.id=favjobs.jobid AND favjobs.userid=?',[req.params.userid],(err,rows)=>{
      if(!err)
      res.status(201).json({
        rows
        
          });
     
      else{
        res.status(500).json({
            message:err,
            
              });
      }
    })
   });

   router.delete('/:id',function(req,res,next){
    conne.query('delete from favjobs where id=?',[req.params.id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:'Saved Jobs deleted successfully',
        
          });
      else{
        console.log(err)
      }
    })
  });
module.exports = router;