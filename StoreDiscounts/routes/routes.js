module.exports = require('mysql')

var express = require('express');
var app = express();
var bodyParse = require('body-parser');
var msql = require('mysql');


app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());


module.exports = function(app) {      


     app.get('/', function(req, res) {       

          res.end("Welcome to our API");    
     });

     app.get('/datafetch',function(req,res){    
     var msg = ''; 
          function handleDisconnect() {
          var connection = msql.createConnection({
               host : 'localhost',
               user : 'user',
               password : 'password',
               port : '3306',
               database: "databasename"
          });
          connection.connect(function(err){
              if(err){
                  console.log('Error while connecting to database:',err);
                  setTimeout(handleDisconnect,2000);
              }else{
              
 
              //   connection.query(queryString, function(err, rows, fields) {
              //     if (err) throw err;
               
              //     for (var i in rows) {
              //         console.log('Post Titles: ', rows[i].discount);
              //     }
              // });

              
              connection.query('SELECT * FROM data',function(err,rows){
                if(err) throw err;

                console.log('Data received from Db:\n');
                console.log(rows);
                res.json({discounts: rows});


                      });
              }
          });
          connection.on('error', function(err) {
              console.log('db error', err);
              if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
                   handleDisconnect();
              } else {                                      
                throw err;                                  
              }
            });
          }
          handleDisconnect();
     });     
};
