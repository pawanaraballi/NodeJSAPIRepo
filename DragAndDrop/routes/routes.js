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

     app.post('/user', function(req, res) {
      var id = req.body.id;
        var newx = req.body.xvalue;
        var newy = req.body.yvalue;
          console.log(id + " " + newx + " " + newy );
      });

     app.get('/update/:id/:xvalue/:yvalue',function(req,res){
        var id = req.params.id;
        var newx = req.params.xvalue;
        var newy = req.params.yvalue;

        function handleDisconnect() {
          var connection = msql.createConnection({
               host : 'localhost',
                user : 'user',
                password : 'password',
                port : '3306',
               database: "DragAndDrop"
          });
          connection.connect(function(err){
              if(err){
                  console.log('Error while connecting to database:',err);
                  setTimeout(handleDisconnect,2000);
              }else{
                var q = 'UPDATE data SET cost= '+ "'" + newx + "'" +', sales= '+ "'" + newy + "'" + ' WHERE id = ' + id;
                console.log(q);
              connection.query(q,function(err,rows){
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

     })

     app.get('/datafetch/:sortname/:pageno',function(req,res){    
      var page = req.params.pageno;
      var sortname = req.params.sortname;
          function handleDisconnect() {
          var connection = msql.createConnection({
               host : 'localhost',
                user : 'user',
                password : 'password',
                port : '3306',
               database: "DragAndDrop"
          });
          connection.connect(function(err){
              if(err){
                  console.log('Error while connecting to database:',err);
                  setTimeout(handleDisconnect,2000);
              }else{
              connection.query('SELECT * FROM data order by '+ sortname+' LIMIT 50 OFFSET '.concat(page),function(err,rows){
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

     app.get('/datafetch',function(req,res){    
      var page = req.params.pageno
          function handleDisconnect() {
          var connection = msql.createConnection({
                host : 'mydbase.cwgnanpueibv.us-east-1.rds.amazonaws.com',
                user : 'indra',
                password : 'qqqqqqqq',
                port : '3306',
                database: "DragAndDrop"
          });
          connection.connect(function(err){
              if(err){
                  console.log('Error while connecting to database:',err);
                  setTimeout(handleDisconnect,2000);
              }else{
              connection.query('SELECT * FROM data',function(err,rows){
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
