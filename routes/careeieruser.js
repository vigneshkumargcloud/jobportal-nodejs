const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
app.use(express.json()) ;
router.get('/employeer', function(req, res, next) {
    conne.query('select * from user_account where user_type_id=2',(err,rows)=>{
      if(!err)
      res.send(rows);
     
      else{
        console.log(err)
      }
    })
   });



   router.get('/jobseeker', function(req, res, next) {
    conne.query('select * from user_account where user_type_id=3',(err,rows)=>{
      if(!err)
      res.send(rows);
     
      else{
        console.log(err)
      }
    })
   });
   router.get('/company', function(req, res, next) {
    conne.query('select * from company',(err,rows)=>{
      if(!err)
      res.send(rows);
     
      else{
        console.log(err)
      }
    })
   });











   
router.delete('/employeer/:id',function(req,res,next){
    conne.query('delete from user_account where id=?',[req.params.id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:'user deleted successfully',
        
          });
      else{
        console.log(err)
      }
    })
  });
  router.delete('/jobseeker/:id',function(req,res,next){
    conne.query('delete from user_account where id=?',[req.params.id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:'user deleted successfully',
        
          });
      else{
        console.log(err)
      }
    })
  });
   module.exports = router;