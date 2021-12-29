const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");
const app =express();
var router = express.Router();
var conne=require('../db/db');
app.use(express.json());
router.get('/', function(req, res, next) {
   
        conne.query('select business_stream.business_stream_name,company.company_name,company.profile_desc,company.business_sid,company.company_website from company JOIN business_stream ON company.business_sid=business_stream.id',(err,rows)=>{
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
