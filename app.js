//jshint esversion:6
//require
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+'/date.js')
const app = express()

//settings
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//variable
const personal_items = [];
const business_items = [];

//handlers
app.get("/", function(req, res){
  res.render('list', {list_type: 'personal', list_title: date.getDate(), tasks: personal_items});
});

app.post('/', function(req, res){
  // res.send("home page");
  //  res.write("<h1>im scribling</h1>");
  // res.send();
  if(req.body.list=="business"){
    business_items.push(req.body.task);
    res.render('list', {list_type: 'business', list_title: date.getDate()+" Business List", tasks: business_items});
  }else{
    personal_items.push(req.body.task);
    res.render('list', {list_type: 'personal', list_title: date.getDate()+" Personal List", tasks: personal_items});
  }
});

app.get('/business', function(req, res){
  res.render('list', {list_type: 'business', list_title: date.getDate()+" Business List", tasks: business_items});
});
app.get('/personal', function(req, res){
  res.render('list', {list_type: 'personal', list_title: date.getDate()+" Personal List", tasks: personal_items});
});
//port settings
app.listen(3000, function(){
  console.log("server started at port 3000");
});
