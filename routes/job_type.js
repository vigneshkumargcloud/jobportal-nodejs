const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
app.use(express.json()) ;
router.get('/', function(req, res, next) {
    conne.query('select * from job_types',(err,rows)=>{
      if(!err)
      res.send(rows);
     
      else{
        console.log(err)
      }
    })
   });

//    id

router.get('/:id', function(req, res, next) {
    conne.query('select * from job_types  where id=?',[req.params.id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });
   router.post('/',function(req,res,next){

    var sql="INSERT  INTO job_types (jobtype) VALUES ('"+req.body.jobtype+"')";
    conne.query(sql,(err,rows)=>{
      if(!err){
       
       
        res.status(201).json({
      message:'job type posted successfully',
      
        });
       
      }
    
      else{
        console.log(err)
      }
    })
  });
  router.put('/:id', function (req, res) {
    var jobtype=req.body.jobtype
    conne.query('update job_types set jobtype=? where id=?',[jobtype,req.params.id], function (error, results, fields) {
	  if (!error)
	  res.status(201).json({
        message:'jobtype updated successfully',
        
          });
          else{
            console.log(error)
          }
	});
});

router.delete('/:id',function(req,res,next){
    conne.query('delete from job_types where id=?',[req.params.id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:'job type deleted successfully',
        
          });
      else{
        console.log(err)
      }
    })
  });
   module.exports = router;