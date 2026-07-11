const Click = require('../models/click.model');
const Url = require('../models/url.model');


async function recordClick(urlId, meta) {
  await Click.create({
    url: urlId,
    device: meta.device,
    browser: meta.browser,
    os: meta.os,
    country: meta.country,
    referrer: meta.referrer,
  });
}


async function getAnalyticsForUrl(shortCode, userId) {

  const url = await Url.findOne({ shortCode });

  if (!url) {
    const error = new Error('Short URL not found');
    error.statusCode = 404;
    throw error;
  }


  if (url.owner && url.owner.toString() !== userId) {
    const error = new Error('Not authorized to view this analytics');
    error.statusCode = 403;
    throw error;
  }


  const clicks = await Click.find({
    url: url._id
  });


  return {
    shortCode: url.shortCode,
    totalClicks: url.clickCount,

    deviceBreakdown: groupBy(clicks,'device'),

    browserBreakdown: groupBy(clicks,'browser'),

    countryBreakdown: groupBy(clicks,'country'),

    dailyClicks: groupByDay(clicks)
  };
}



function groupBy(clicks, field){

  return clicks.reduce((acc,click)=>{

    const key = click[field];

    acc[key] = (acc[key] || 0)+1;

    return acc;

  },{});
}



function groupByDay(clicks){

  return clicks.reduce((acc,click)=>{

    const day =
      click.createdAt
      .toISOString()
      .split('T')[0];


    acc[day]=(acc[day]||0)+1;


    return acc;

  },{});
}



module.exports={
  recordClick,
  getAnalyticsForUrl
};