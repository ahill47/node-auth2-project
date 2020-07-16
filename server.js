const express=require("express")
const cors= require ("cors")
const helmet= require("helmet")
const jwt= require("jsonwebtoken")


const server=express();


server.use(cors())
server.use(helmet())
server.use(express.json())


server.get("/", (req,res,next)=>{
    res.json({
        message:"Welcome Alexis to your API"
    })
})

server.use((err,req,res,next)=>{
    res.status(500).json({
        message:"Something went wrong. In server.js"
    })
})

module.exports=server;