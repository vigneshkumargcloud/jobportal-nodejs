const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
app.use(express.json());

router.post('/',function(req,res,next){

    var sql="INSERT  INTO message (message,userid,companyid,uid) VALUES ('"+req.body.message+"','"+req.body.userid+"','"+req.body.companyid+"','"+req.body.uid+"')";
    conne.query(sql,(err,rows)=>{
      if(!err){
       
       
        res.status(201).json({
      message:'message posted successfully',
      
        });
       
      }
    
      else{
      
        res.status(201).json({
            error:err
            
              });
      }
    })
  });
  
router.get('/', function(req, res, next) {
    conne.query('select * from message',(err,rows)=>{
      if(!err)
      res.send(rows);
     
      else{
        console.log(err)
      }
    })
   });
   router.get('/bycmp/:companyid', function(req, res, next) {
    conne.query('select * from message  where companyid=?',[req.params.companyid],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });
   router.get('/byuser/:userid', function(req, res, next) {
   
    conne.query('select message.message,message.id,company.company_name from message JOIN company on message.companyid=company.id and message.userid=? ',[req.params.userid],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });
   router.get('/foremp/:uid', function(req, res, next) {
   
    conne.query('select message.message,message.id,message.uid,user_account.username from message JOIN user_account on message.userid=user_account.id  and message.uid=?',[req.params.uid],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });

   router.get('/msglist/:id', function(req, res, next) {
   
    conne.query('select message.message,message.id,message.uid,user_account.username from message JOIN user_account on message.userid=user_account.id  and message.id=?',[req.params.id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });
   router.get('/formsg/:id', function(req, res, next) {
   
    conne.query('select message.message,message.id,message.companyid,company.company_name from message JOIN company on message.companyid=company.id and message.id=? ',[req.params.id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });

   
   router.get('/count/:userid', function(req, res, next) {
    conne.query('select count(*) AS totalmessages from message  where userid=?',[req.params.userid],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });
   router.delete('/:id',function(req,res,next){
    conne.query('delete from message where id=?',[req.params.id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:'message deleted successfully',
        
          });
      else{
        console.log(err)
      }
    })
  });



  router.put('/:id', function (req, res) {
    var message=req.body.message;
    var companyid=req.body.companyid;
    conne.query('update message set message=?,companyid=? where id=?',[message,companyid,req.params.id], function (error, results, fields) {
	  if (!error)
	  res.status(201).json({
        message:'message updated successfully',
        
          });
          else{
            console.log(error)
          }
	});
});
   

module.exports = router;