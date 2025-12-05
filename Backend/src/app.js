const express = require('express');
const app = express();
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors')

// app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin: "https://a-i-code-reviewer-frontend.onrender.com",
    
}))

app.get("/",(req,resp)=>{
    resp.send("lalalal")
})

app.use('/ai',aiRoutes)

module.exports = app;