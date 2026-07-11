const jwt=require('jsonwebtoken');
const config=require('../config');


function protect(req,res,next){


const authHeader=req.headers.authorization;



if(!authHeader ||
!authHeader.startsWith("Bearer ")){

const error=new Error(
"Not authorized, no token provided"
);

error.statusCode=401;

return next(error);

}



const token=authHeader.split(" ")[1];



try{


const decoded=
jwt.verify(token,config.jwtSecret);


req.userId=decoded.id;


next();



}catch(err){


const error=new Error(
"Not authorized, token invalid or expired"
);


error.statusCode=401;


next(error);


}


}



module.exports=protect;