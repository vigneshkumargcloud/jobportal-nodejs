const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
router.post('/',function(req,res,next){

    var sql="INSERT  INTO jobstatus (jobstatusname) VALUES ('"+req.body.jobstatusname+"')";
    conne.query(sql,(err,rows)=>{
      if(!err){
       
       
        res.status(201).json({
      message:'jobstatus added successfully',
      
        });
       
      }
    
      else{
        res.status(400).json({
            message:err
            
              });
             
      }
    })
  });


  router.get('/', function(req, res, next) {
    conne.query('select * from jobstatus',(err,rows)=>{
      if(!err)
      res.send(rows);
     
      else{
        console.log(err)
      }
    })
   });

   router.delete('/:jobstatusid',function(req,res,next){
    conne.query('delete from jobstatus where jobstatusid=?',[req.params.jobstatusid],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:'jobstatus deleted successfully',
        
          });
      else{
        console.log(err)
      }
    })
  });

  router.put('/:jobstatusid', function (req, res) {
    var jobstatusname=req.body.jobstatusname
    conne.query('update jobstatus set jobstatusname=? where jobstatusid=?',[jobstatusname,req.params.jobstatusid], function (error, results, fields) {
	  if (!error)
	  res.status(201).json({
        message:'business_stream updated successfully',
        
          });
          else{
            console.log(error)
          }
	});
});

module.exports = router;