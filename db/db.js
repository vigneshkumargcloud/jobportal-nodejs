var mysql=require('mysql2');

var conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"rootpassword",
    database:"carrierMaker"
});
conn.connect(function(err){
if(err) throw err;
});
module.exports=conn;