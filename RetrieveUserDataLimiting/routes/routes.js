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

     app.get('/user/:id', function(req, res) {
          res.send('user' + req.params.id);    
      });

     app.get('/datafetch/:sortname/:pageno',function(req,res){    
      var page = req.params.pageno;
      var sortname = req.params.sortname;
          function handleDisconnect() {
          var connection = msql.createConnection({
               host : 'mydbase.cwgnanpueibv.us-east-1.rds.amazonaws.com',
               user : 'indra',
               password : 'qqqqqqqq',
               port : '3306',
               database: "USER_MOCK_DATA"
          });
          connection.connect(function(err){
              if(err){
                  console.log('Error while connecting to database:',err);
                  setTimeout(handleDisconnect,2000);
              }else{
              connection.query('SELECT * FROM users order by '+ sortname+' LIMIT 50 OFFSET '.concat(page),function(err,rows){
                if(err) throw err;

                console.log('Data received from Db sorted:\n');
                //console.log(rows);
                res.json(rows);
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

     app.get('/datafetch/:pageno',function(req,res){    
      var page = req.params.pageno
          function handleDisconnect() {
          var connection = msql.createConnection({
               host : 'mydbase.cwgnanpueibv.us-east-1.rds.amazonaws.com',
               user : 'indra',
               password : 'qqqqqqqq',
               port : '3306',
               database: "USER_MOCK_DATA"
          });
          connection.connect(function(err){
              if(err){
                  console.log('Error while connecting to database:',err);
                  setTimeout(handleDisconnect,2000);
              }else{
              connection.query('SELECT * FROM users LIMIT 50 OFFSET '.concat(page),function(err,rows){
                if(err) throw err;

                console.log('Data received from Db:\n');
                //console.log(rows);
                res.json(rows);
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
