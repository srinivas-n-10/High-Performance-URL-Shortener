const {
 getAnalyticsForUrl
}=require('../services/analytics.service');


async function getAnalytics(req,res,next){

 try{

   const {shortCode}=req.params;


   const data =
    await getAnalyticsForUrl(
      shortCode,
      req.userId
    );


   res.status(200).json({
    success:true,
    data
   });

 }

 catch(err){

   next(err);

 }

}


module.exports={
 getAnalytics
};