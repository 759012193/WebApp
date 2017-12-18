var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1687',
  database : 'test'
});
var username='a';
connection.connect();
var  sql = "SELECT * FROM users where name='"+username+"'";
console.log(sql);
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       if(result[0].password=='c'){
         console.log('sucess!');
       }
       console.log('------------------------------------------------------------\n\n');  
});
 
connection.end();