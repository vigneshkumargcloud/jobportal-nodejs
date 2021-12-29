const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
app.use(express.json()) ;
router.get('/', function(req, res, next) {
    conne.query('select * from job_post',(err,rows)=>{
      if(!err)
      res.send(rows);
     
      else{
        console.log(err)
      }
    })
   });
   router.post('/',function(req,res,next){

    var sql="INSERT  INTO job_post (posted_by,jobtype_id,created_date,sarting_date,end_date,description,minsalary,maxsalary,salary_type_id,jobcategory_id,jobtitle,workinghours,state,city,pin,userid) VALUES ('"+req.body.posted_by+"','"+req.body.jobtype_id+"','"+req.body.created_date+"','"+req.body.sarting_date+"','"+req.body.end_date+"','"+req.body.description+"','"+req.body.minsalary+"','"+req.body.maxsalary+"','"+req.body.salary_type_id+"','"+req.body.jobcategory_id+"','"+req.body.jobtitle+"','"+req.body.workinghours+"','"+req.body.state+"','"+req.body.city+"','"+req.body.pin+"','"+req.body.userid+"')";
    conne.query(sql,(err,rows)=>{
      if(!err){
       
       
        res.status(201).json({
      message:'job  posted successfully',
      
        });
       
      }
    
      else{
        console.log(err)
      }
    })
  });
  
  router.get('/:id', function(req, res, next) {
    conne.query('select * from job_post  where id=?',[req.params.id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });
   router.get('/user/:userid', function(req, res, next) {
    conne.query('select * from job_post  where userid=?',[req.params.userid],(err,rows)=>{
      if(!err)
      res.status(201).json({
        rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });
   router.get('/byuserid/:userid', function(req, res, next) {
    conne.query('select count(*) AS totaljobs  from job_post  where userid=?',[req.params.userid],(err,rows)=>{
      if(!err)
      res.status(201).json({
          message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });

  
  router.get('/:posted_by', function(req, res, next) {
    conne.query('select * from job_post  where posted_by=?',[req.params.posted_by],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });
   router.put('/:id', function (req, res) {
    var sarting_date=req.body.sarting_date;
    var end_date=req.body.end_date;
    var description=req.body.description;
    var jobcategory_id=req.body.jobcategory_id;
    var jobtitle=req.body.jobtitle;
    var jobtype_id=req.body.jobtype_id;
    var workinghours=req.body.workinghours;
    var state=req.body.state;
    var city=req.body.city;
    var pin=req.body.pin;
    conne.query('update job_post set sarting_date=?,end_date=?,description=?,jobcategory_id=?,jobtitle=?,jobtype_id=?,workinghours=?,state=?,city=?,pin=? where id=?',[sarting_date,end_date,description,jobcategory_id,jobtitle,jobtype_id,workinghours,state,city,pin,req.params.id], function (error, results, fields) {
	  if (!error)
	  res.status(201).json({
        message:'job_post updated successfully',
        
          });
          else{
            console.log(error)
          }
	});
});

router.put('/:id', function (req, res) {
 
  var jobstatus=req.body.jobstatus;
  conne.query('update job_post set jobstatus=? where id=?',[jobstatus,req.params.id], function (error, results, fields) {
  if (!error)
  res.status(201).json({
      message:'job_post updated successfully',
      
        });
        else{
          console.log(error)
        }
});
});





// router.get('/userstatus/:jobappliedfor', function(req, res, next) {
//   conne.query('select from',[req.params.jobappliedfor],(err,rows)=>{
//     if(!err)
//     res.status(201).json({
//       rows,
      
//         });
   
//     else{
//       console.log(err)
//     }
//   })
//  });
 
  module.exports = router;