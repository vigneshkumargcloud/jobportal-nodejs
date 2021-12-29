const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
const checkauth=require("../middleware/authcheck");

router.get('/', function(req, res, next) {
    conne.query('select * from business_stream',(err,rows)=>{
      if(!err)
      res.send(rows);
     
      else{
        console.log(err)
      }
    })
   });



   router.get('/:id', function(req, res, next) {
    conne.query('select * from business_stream  where id=?',[req.params.id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });

   router.post('/',checkauth,function(req,res,next){

    var sql="INSERT  INTO business_stream (business_stream_name) VALUES ('"+req.body.business_stream_name+"')";
    conne.query(sql,(err,rows)=>{
      if(!err){
       
       
        res.status(201).json({
      message:'business_stream_name posted successfully',
      
        });
       
      }
    
      else{
        console.log(err)
      }
    })
  });

  router.delete('/:id',function(req,res,next){
    conne.query('delete from business_stream where id=?',[req.params.id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:'business_stream deleted successfully',
        
          });
      else{
        console.log(err)
      }
    })
  });

  router.put('/:id', function (req, res) {
    var business_stream_name=req.body.business_stream_name
    conne.query('update business_stream set business_stream_name=? where id=?',[business_stream_name,req.params.id], function (error, results, fields) {
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