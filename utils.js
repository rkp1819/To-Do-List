
//get Date
exports.getDate = function(){
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-IN',options);
}
//getDay
exports.getDay = function(){
  const options = { weekday: 'long'};
  return new Date().toLocaleDateString('en-IN',options);
}


//save task to db
exports.saveTask = function(req, res, Task){
  task = new Task({
    typeOfTask: req.body.list_type,
    task: req.body.task
  });
  task.save();
}
//find task of specific type from the db

exports.findTasks = function(req, res, Task, list_types){
  Task.find({ typeOfTask: req.body.list_type }, 'task' ,function(err, tasks){
      if (err) {
        console.log("ERROR: "+err);
      } else {
        task_list = [];
        tasks.forEach(function(val, key, array){
          task_list.push(val);
        });
        console.log(list_types, req.body.list_type);
        res.render('list', {list_type: req.body.list_type,
          list_types: list_types,
          list_title: exports.getDate()+" "+req.body.list_type+" List",
          tasks: task_list});
      }
    });
}

//delete from DB

exports.deleteOne = function(req, res, Task, list_types){
  Task.deleteOne({_id: req.body.checkboxId}, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log("deleted: "+req.body.checkboxId);
    }
  })
}

//getLists

exports.getLists = function(req, res, Task, callback){
  Task.find().distinct('typeOfTask', function(err, list_types){
    if (err) {
      console.log(err);
    } else {
      list_types.push(req.body.list_type);
      console.log("in get lists: list_type: ", req.body.list_type)
      console.log("all good");
      console.log("in get lists: "+[...new Set(list_types)]);
      callback(req, res, Task, [...new Set(list_types)]);
    }
  });
}
