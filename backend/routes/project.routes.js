const express = require("express");
const projectRouter=express.Router();

const { userAuth } = require("../middlewares/auth");

const { createproject, getAllProjects, deleteProject, updateProject } = require("../controller/projects");


projectRouter.post("/create",userAuth,createproject)
projectRouter.post("/get",userAuth,getAllProjects)
projectRouter.post("/update",userAuth,updateProject)
projectRouter.post("/delete",userAuth,deleteProject)

module.exports = projectRouter;