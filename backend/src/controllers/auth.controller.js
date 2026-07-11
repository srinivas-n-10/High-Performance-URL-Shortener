const {
registerUser,
loginUser
}=require('../services/auth.service');



async function register(req,res,next){

try{

const result =
await registerUser(req.body);


res.status(201).json({

success:true,
data:result

});


}catch(err){

next(err);

}

}



async function login(req,res,next){

try{


const result =
await loginUser(req.body);



res.status(200).json({

success:true,
data:result

});


}catch(err){

next(err);

}

}



module.exports={
register,
login
};