const express = require("express");
const taskRouter = express.Router({ mergeParams: true }); 
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controller/task.controller");


taskRouter.post("/create", createTask);                    
taskRouter.post("/get", getTasks);                               
taskRouter.post("/update/:taskId", updateTask);                      
taskRouter.post("/delete/:taskId", deleteTask);                   
module.exports = taskRouter;
