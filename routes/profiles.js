const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
app.use(express.json()) ;
const multer=require('multer');
const storage=multer.diskStorage({
    destination:'./public/images/',
    filename:(req,file,cb)=>{
        // return cb(null,`${file.fieldname}_${Date.now()}${file.originalname}`)
        cb(null,Date.now()+'.'+file.mimetype.split('/')[1])
    }
});
const upload=multer({
    storage:storage
});
router.post('/',upload.single('profileimg'),function(req,res,next){
    // var url='http://localhost:3000/images/'+req.file.filename;
  
      var sql="INSERT  INTO seeker_profile (user_account_id,first_name,last_name,current_salary,username,email,contactNumber,profileimg,address,nameofinst) VALUES ('"+req.body.user_account_id+"','"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.current_salary+"','"+req.body.username+"','"+req.body.email+"','"+req.body.contactNumber+"','"+"http://localhost:3000/images/"+req.file.filename+"','"+req.body.address+"','"+req.body.nameofinst+"')";
      conne.query(sql,(err,rows)=>{
        if(!err){
         
        //  console.log(rows.companyimage)
          res.status(201).json({
           
           
          //  result = [...rows, arraypr],
        message:'jobseeker_profile posted successfully',
       
      
        
          });
         
        }
      
        else{
          res.status(201).json({
            error:err,
            
              });
        }
      })
    });

      router.get('/:user_account_id', function(req, res, next) {
    conne.query('select * from seeker_profile  where user_account_id=?',[req.params.user_account_id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });
   router.get('/', function(req, res, next) {
    conne.query('select * from seeker_profile',(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });


   router.put('/:user_account_id',upload.single('profileimg'), function (req, res) {
    var first_name=req.body.first_name;
    var last_name=req.body.last_name;
    var current_salary=req.body.current_salary;
    var username=req.body.username;
    var email=req.body.email;
    var contactNumber=req.body.contactNumber;
    var profileimg=req.body.profileimg;
    var address=req.body.address;
    var profileimg="http://localhost:3000/images/"+req.file.filename;
    conne.query('update seeker_profile set first_name=?,last_name=?,current_salary=?,username=?,email=?,contactNumber=?,profileimg=?,address=?  where user_account_id=?',[first_name,last_name,current_salary,username,email,contactNumber,profileimg,address,req.params.user_account_id], function (error, results, fields) {
	  if (!error)
	  res.status(201).json({
        message:'seeker_profile updated successfully',
        
          });
          else{
            console.log(error)
          }
	});
});
    
module.exports = router;