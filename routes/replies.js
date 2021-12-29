const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
const checkauth=require("../middleware/authcheck");

router.post('/',function(req,res,next){

    var sql="INSERT  INTO replies (msgid,seekerreply,employeerreply) VALUES ('"+req.body.msgid+"','"+req.body.seekerreply+"','"+req.body.employeerreply+"')";
    conne.query(sql,(err,rows)=>{
      if(!err){
       
       
        res.status(201).json({
      message:'your message  sent successfully',
      
        });
       
      }
    
      else{
        console.log(err)
      }
    })
  });
  router.get('/:msgid', function(req, res, next) {
    conne.query('select * from replies  where msgid=?',[req.params.msgid],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });
   router.put('/:msgid', function (req, res) {
    var seekerreply=req.body.seekerreply;
    // var employeerreply=req.body.employeerreply;
    conne.query('update replies set seekerreply=? where msgid=?',[seekerreply,req.params.msgid], function (error, results, fields) {
	  if (!error)
	  res.status(201).json({
        message:'replies updated successfully',
        
          });
          else{
            console.log(error)
          }
	});
});

module.exports = router;