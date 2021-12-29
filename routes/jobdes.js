const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
app.use(express.json());
router.get('/:id', function(req, res, next) {
  
        conne.query('select company.companyimage,company.company_name,job_post.description,job_post.jobtitle,job_post.minsalary,job_post.maxsalary from company JOIN job_post ON company.id=job_post.posted_by',[req.params.id],(err,rows)=>{
          if(!err){
          console.log("join"+rows);
          res.status(201).json({
            message:rows,
            
              });
         
        }
          else{
            console.log(err)
          }
        })
       });
module.exports = router;