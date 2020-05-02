//jshint esversion:6
//require
const express = require('express');
const bodyParser = require('body-parser');
const utils = require(__dirname+'/utils.js')
const app = express()
const mongoose = require('mongoose')

// mongo "mongodb+srv://cluster0-lpthl.mongodb.net/test"  --username admin_Raj_Kumar_Panda
// mongodb+srv://admin_Raj_Kumar_Panda:<password>@cluster0-lpthl.mongodb.net/test?retryWrites=true&w=majority
//mongo
mongoose.connect("mongodb+srv://admin_Raj_Kumar_Panda:Test1234@cluster0-lpthl.mongodb.net/toDoListDB",
                                                          { useNewUrlParser: true,
                                                           useCreateIndex: true})
                                                          .then(() => console.log( 'Database Connected' ))
                                                          .catch(err => console.log( err ));;
const taskSchema = mongoose.Schema({
    typeOfTask: {
      type: String,
      required: [true, "Which kind of task it is?"]
    },
    task: {
      type: String,
      required: [true, "but... whats the task"]
    }
});
const Task = new mongoose.model('Task', taskSchema);



//settings
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//handlers
app.get("/", function(req, res){
  req.body.list_type = "Personal";//default list shown in GUI
  utils.getLists(req, res, Task, utils.findTasks);
});

app.post('/', function(req, res){
  // res.send("home page");
  //  res.write("<h1>im scribling</h1>");
  // res.send();
  utils.saveTask(req, res, Task);
  console.log(req.body.list_type);
  res.redirect('/lists/'+req.body.list_type);
});

app.post('/lists/:list_types/delete', function(req, res){
  console.log("deleting: ", req.body.checkboxId, req.body.list_type);
  utils.getLists(req, res, Task, utils.deleteOne);
  res.redirect('/lists/'+req.body.list_type);
});

app.post("/new_list", function(req, res){
  console.log("in new list: "+req.body.list_type);
  res.redirect('/lists/'+req.body.list_type);
  // utils.getLists(req, res, Task, utils.findTasks);
});


app.get('/lists/:list_type', function(req, res){
  console.log("in get :list_type: ", req.params.list_type);
  req.body.list_type = req.params.list_type;
  utils.getLists(req, res, Task, utils.findTasks);
});
//port settings
let port = process.env.PORT;
app.listen(port||3000, function(){
  console.log("server started at port 3000");
});
