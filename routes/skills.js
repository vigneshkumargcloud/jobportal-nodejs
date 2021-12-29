const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
router.post('/',function(req,res,next){

    var sql="INSERT  INTO skills (user_account_id,skillname) VALUES ('"+req.body.user_account_id+"','"+req.body.skillname+"')";
    conne.query(sql,(err,rows)=>{
      if(!err){
       
       
        res.status(201).json({
      message:'skills added successfully',
      
        });
       
      }
    
      else{
        console.log(err)
      }
    })
  });
  router.get('/:user_account_id', function(req, res, next) {
    conne.query('select * from skills  where user_account_id=?',[req.params.user_account_id],(err,rows)=>{
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
    var skillname=req.body.skillname;
    
    conne.query('update skills set skillname=? where id=?',[skillname,req.params.id], function (error, results, fields) {
	  if (!error)
	  res.status(201).json({
        message:'skills updated successfully',
        
          });
          else{
            console.log(error)
          }
	});
});
router.delete('/:id',function(req,res,next){
  conne.query('delete from skills where id=?',[req.params.id],(err,rows)=>{
    if(!err)
    res.status(201).json({
      message:'skills deleted successfully',
      
        });
    else{
      console.log(err)
    }
  })
});
module.exports = router;