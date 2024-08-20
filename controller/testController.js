const testUserController =(req,res)=>{
    try {
        //res.send("<h1>Welcome to Test User</h1>")
        //json wala code 
        res.status(200).send({
            sucuess:true,
            messgae:'User API Working',
        })
    } catch(err){
        console.log('error:', err);
    }
    
}

module.exports = {testUserController}