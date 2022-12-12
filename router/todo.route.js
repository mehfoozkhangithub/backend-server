const { Router } = require("express");
const { TodoModel } = require(".././model/todo.model");

require("dotenv").config()


const todoController = Router();

//GET REQUEST;

todoController.get("/",async(req,res)=>{
    const todo = await TodoModel.find({userId: req.body.userId})
    res.send(todo)
})

//POST REQUEST 

todoController.post("/create",async(req,res)=>{
    const { taskName, status, tag, userId } = req.body;

    const todo = new TodoModel({
        taskName,
        tag,
        status,
        userId
    })
    try{
        await todo.save()
        res.send({"msg":"Task created"})
    }
    catch(err){
        res.send({"msg":"something went wrong try again later"})
        console.log(err)
    }
})


//DELETE REQUEST
todoController.delete("/delete/:todoId",async(req,res)=>{
    const { todoId } = req.params;

    const deleteTodo = await TodoModel.findOneAndDelete({_id:todoId, userId:req.body.userId});
    if(deleteTodo){
        res.send({"msg":"task Deleted"})
    }else{
        res.send({"msg":"couldn't delete"})
    }
})


//PATCH REQUEST

todoController.patch("/edit/:todoId",async(req,res)=>{
    const { todoId } = req.params;

    const updateTodo = await TodoModel.findOneAndUpdate({_id:todoId, userId: req.body.userId},req.body)
    if(updateTodo){
        res.send({"msg":"task updated"})
    }else{
        res.send({"msg":"Something went wrong"})
    }
})

module.exports = { todoController }