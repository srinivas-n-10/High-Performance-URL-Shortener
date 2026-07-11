const express=require('express');

const {
 getAnalytics
}=require('../controllers/analytics.controller');


const protect =
require('../middlewares/auth.middleware');


const router=express.Router();


router.get(
 '/:shortCode',
 protect,
 getAnalytics
);


module.exports=router;