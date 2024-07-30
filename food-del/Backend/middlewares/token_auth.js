const jwt = require("jsonwebtoken");

const token_auth = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).send("No token provided");
    }
    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(token);
        req.body.userId=token_decode.id;
        console.log(req.body.userId);
        next()
    }
    catch(err){
        res.json({error:err});
    }

}

module.exports=token_auth
