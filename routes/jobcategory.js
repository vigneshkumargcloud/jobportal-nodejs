const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
app.use(express.json()) ;
// app.use(cors({
//     origin:["http://localhost:3000"],
//     methods:["GET, POST, OPTIONS, PUT, DELETE"],
//     credentials:true
// }));


// get
router.get('/', function(req, res, next) {
    conne.query('select * from jobcate',(err,rows)=>{
      if(!err)
      res.send(rows);
     
      else{
        console.log(err)
      }
    })
   });

//    get by id

router.get('/:id', function(req, res, next) {
    conne.query('select * from jobcate  where id=?',[req.params.id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:rows,
        
          });
     
      else{
        console.log(err)
      }
    })
   });

//    post

router.post('/',function(req,res,next){

    var sql="INSERT  INTO jobcate (jobcate) VALUES ('"+req.body.jobcate+"')";
    conne.query(sql,(err,rows)=>{
      if(!err){
       
       
        res.status(201).json({
      message:'job category posted successfully',
      
        });
       
      }
    
      else{
        console.log(err)
      }
    })
  });
  router.delete('/:id',function(req,res,next){
    conne.query('delete from jobcate where id=?',[req.params.id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:'job category deleted successfully',
        
          });
      else{
        console.log(err)
      }
    })
  });

//   router.put('/:id',function(req,res,next){
//     conne.query('delete from jobcate where id=?',[req.params.id],(err,rows)=>{
//       if(!err)
//       res.status(201).json({
//         message:'job category deleted successfully',
        
//           });
//       else{
//         console.log(err)
//       }
//     })
//   });


//rest api to update record into mysql database
router.put('/:id', function (req, res) {
    var jobcate=req.body.jobcate;
    conne.query('update jobcate set jobcate=? where id=?',[jobcate,req.params.id], function (error, results, fields) {
	  if (!error)
	  res.status(201).json({
        message:'job category updated successfully',
        
          });
          else{
            console.log(error)
          }
	});
});

   
module.exports = router;