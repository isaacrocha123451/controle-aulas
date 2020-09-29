const express = require("express")
const nunjucks = require("nunjucks")
const routes = require("./routes")
const methodOverrid = require("method-override")

const server = express()

server.use(express.urlencoded({extended : true}))
server.use(express.static("public"))
server.use(methodOverrid("_method"))
server.use(routes)

server.set("view engine","njk")

nunjucks.configure("src/app/views",{
    express:server,
    autoescape:false,
    noCache:true
})



server.listen("1000",function(){
    console.log("server is running")
})