const express = require('express');
const app = express();
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors')

// app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    
}))

app.get("/",(req,resp)=>{
    resp.send("lalalal")
})

app.use('/ai',aiRoutes)

module.exports = app;