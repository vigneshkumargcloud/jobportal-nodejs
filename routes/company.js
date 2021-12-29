const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
app.use(express.json());
const multer=require('multer');


app.use(express.json()) ;
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

router.post('/',upload.single('companyimage'),function(req,res,next){
  // var url='http://localhost:3000/images/'+req.file.filename;

    var sql="INSERT  INTO company (company_name,profile_desc,business_sid,company_website,companyimage,uid) VALUES ('"+req.body.company_name+"','"+req.body.profile_desc+"','"+req.body.business_sid+"','"+req.body.company_website+"','"+"http://localhost:3000/images/"+req.file.filename+"','"+req.body.uid+"')";
    conne.query(sql,(err,rows)=>{
      if(!err){
       
      //  console.log(rows.companyimage)
        res.status(201).json({  
      message:'Company posted successfully',
      rows:rows
    
      
        });
       
      }
    
      else{
        res.status(201).json({
          error:err,
          
            });
      }
    })
  });
// router.post("/",upload.single('companyimage'),(req,res)=>{
//   image=req.file;
  
//   company_name=req.body.company_name;
//   profile_desc=req.body.profile_desc;
//   establishment_date=req.body.establishment_date;
//   company_website=req.body.company_website;
  
//   console.log(image);
    

// })


// get
router.get('/', function(req, res, next) {
    conne.query('select * from company',(err,rows)=>{
      if(!err){
        res.send(rows);
        console.log(upload.storage.destination);
      }

     
      else{
        console.log(err);
       
      }
    })
   });

  //  router.get('/images/:id', function(req, res, next) {
  //   conne.query('select * from company  where id=?',[req.params.id],(err,rows)=>{
  //     if(!err)
  //     res.status(201).json({
  //       message:rows,
        
  //         });
     
  //     else{
  //       console.log(err)
  //     }
  //   })
  //  });

   
   router.get('/:id', function(req, res, next) {
    conne.query('select * from company  where id=?',[req.params.id],(err,rows)=>{
      if(!err){
        // var url="src/images/"+rows[0].companyimage+"";
        // console.log(rows[0].companyimage);
        // console.log(url);
        res.status(201).json({
          rows,
          // url:url
         
          
            });
      }
    
     
      else{
        console.log(err)
      }
    })
   });
   router.get('/user/:uid', function(req, res, next) {
    conne.query('select * from company  where uid=?',[req.params.uid],(err,rows)=>{
      if(!err){
        // var url="src/images/"+rows[0].companyimage+"";
        // console.log(rows[0].companyimage);
        // console.log(url);
        res.status(201).json({
          rows,
          // url:url
         
          
            });
      }
    
     
      else{
        console.log(err)
      }
    })
   });
   router.delete('/:id',function(req,res,next){
    conne.query('delete from company where id=?',[req.params.id],(err,rows)=>{
      if(!err)
      res.status(201).json({
        message:'company deleted successfully',
        
          });
      else{
        console.log(err)
      }
    })
  });

  
  router.put('/:id', function (req, res) {
    var company_name=req.body.company_name;
    var profile_desc=req.body.profile_desc;
    var business_sid=req.body.business_sid;
    var company_website=req.body.company_website;
    conne.query('update company set company_name=?,profile_desc=?,business_sid=?,company_website=? where id=?',[company_name,profile_desc,business_sid,company_website,req.params.id], function (error, results, fields) {
	  if (!error)
	  res.status(201).json({
        message:'company updated successfully',
        
          });
          else{
            console.log(error)
          }
	});
});

module.exports = router;
