
const { nanoid }=require('nanoid');
const URL=require('../models/url');

async function handleGeneratedShortURL(req,res){

    const body=req.body;

    if(!body.url)
    {
        return res.status(400).json({error:'url is required'});
    }
    const shortID=nanoid(8);

    await URL.create({
        shortURL:shortID,
        originalURL:body.url,
        createdAt: new Date(),
        createdBy:req.user._id // Assuming req.user is set by authentication middleware
    });
    const allurls= await URL.find({});

    return res.render('home',{
        id:shortID,
        urls:allurls,

    })
    // return res.json({id:shortID});
}


async function handleGetShortURL(req, res) {
    const shortID = req.params.shortID;

    if (!shortID) {
        return res.status(400).json({ error: 'shortID is required' });
    }

    try {
        // Find and update in one step
        const record = await URL.findOneAndUpdate(
            { shortURL: shortID },
            { $push: { visitedHistory: new Date() } },
            { new: true }
        );

        if (!record) {
            return res.status(404).json({ error: 'URL not found' });
        }

        // Redirect to the original URL
        return res.redirect(record.originalURL);
    } catch (err) {
        console.error('Error finding short URL:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function getAnalytics(req,res){
    const shortID = req.params.shortID;
    if (!shortID) {
        return res.status(400).json({ error: 'shortID is required' });
    }

    const record=await URL.findOne({ shortURL: shortID });
    if (!record) {
        return res.status(404).json({ error: 'URL not found' });
    }

    return res.json({
        totalhits:record.visitedHistory.length,
    })



}



module.exports={
    handleGeneratedShortURL,
    handleGetShortURL,
    getAnalytics
}
