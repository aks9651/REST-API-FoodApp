const JWT = require('jsonwebtoken');

module.exports = async(req,res,next)=>{
    try {
    //get token
    const token = req.headers['authorization'].split(' ')[1];

    //verify token
    JWT.verify(token, process.env.SECRET, (err,decode)=>{
        if(err){
            return res.status(400).send({
                success:false,
                message:'Invalid Authorization',
                err,
            })
        }
        else {
            console.log('1111');
            req.body.id = decode.id;
            next();
        }
    })
}
    catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:'Internal Server become Error',
            err,
        })
    }
}