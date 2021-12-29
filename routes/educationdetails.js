const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
router.post('/',function(req,res,next){

    var sql="INSERT  INTO educationdetails (user_account_id,instutename,degreename,percentage) VALUES ('"+req.body.user_account_id+"','"+req.body.instutename+"','"+req.body.degreename+"','"+req.body.percentage+"')";
    conne.query(sql,(err,rows)=>{
      if(!err){
       
       
        res.status(201).json({
      message:'educationdetails added successfully',
      
        });
       
      }
    
      else{
        console.log(err)
      }
    })
  });
  router.get('/:user_account_id', function(req, res, next) {
    conne.query('select * from educationdetails  where user_account_id=?',[req.params.user_account_id],(err,rows)=>{
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
    var instutename=req.body.instutename;
    var degreename=req.body.degreename;
    var percentage=req.body.percentage;
    conne.query('update educationdetails set instutename=?,degreename=?,percentage=? where id=?',[instutename,degreename,percentage,req.params.id], function (error, results, fields) {
	  if (!error)
	  res.status(201).json({
        message:'educationdetails updated successfully',
        
          });
          else{
            console.log(error)
          }
	});
});
router.delete('/:id',function(req,res,next){
  conne.query('delete from educationdetails where id=?',[req.params.id],(err,rows)=>{
    if(!err)
    res.status(201).json({
      message:'educationdetails deleted successfully',
      
        });
    else{
      console.log(err)
    }
  })
});
module.exports = router;