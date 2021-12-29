const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
router.post('/',function(req,res,next){

    var sql="INSERT  INTO workexperience (user_account_id,Companyname,designation,yearsworked,current_salary) VALUES ('"+req.body.user_account_id+"','"+req.body.Companyname+"','"+req.body.designation+"','"+req.body.yearsworked+"','"+req.body.current_salary+"')";
    conne.query(sql,(err,rows)=>{
      if(!err){
       
       
        res.status(201).json({
      message:'workexperience added successfully',
      
        });
       
      }
    
      else{
        console.log(err)
      }
    })
  });
  router.get('/:user_account_id', function(req, res, next) {
    conne.query('select * from workexperience  where user_account_id=?',[req.params.user_account_id],(err,rows)=>{
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
    var Companyname=req.body.Companyname;
    var designation=req.body.designation;
    var yearsworked=req.body.yearsworked;
    var current_salary=req.body.current_salary;
    conne.query('update workexperience set Companyname=?,designation=?,yearsworked=?,current_salary=? where id=?',[Companyname,designation,yearsworked,current_salary,req.params.id], function (error, results, fields) {
	  if (!error)
	  res.status(201).json({
        message:'workexperience updated successfully',
        
          });
          else{
            console.log(error)
          }
	});
});
router.delete('/:id',function(req,res,next){
  conne.query('delete from workexperience where id=?',[req.params.id],(err,rows)=>{
    if(!err)
    res.status(201).json({
      message:'workexperience deleted successfully',
      
        });
    else{
      console.log(err)
    }
  })
});
module.exports = router;