const generateContent = require('../services/ai.service')

const aiController = async(req,resp)=>{
    const code = await req.body.code;

    if(!code){
        return resp.status(400).send("code is required");
    }
    const response = await generateContent(code)
    resp.status(200).send(response)
}

module.exports = aiController;