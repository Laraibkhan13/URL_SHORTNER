
const { nanoid }=require('nanoid');

async function handleGeneratedShortURL(req,re){

    const body=req.body;

    if(!body.url)
    {
        return res.status(400).json({error:'url is required'});
    }
    const shortID=nanoid(8);

    await URL.createObjectURL({
        shortId:shortID,
        redirectedURl:body.url,
        createdAt: new Date()
    })

    return res.json({id:shortID});
}

moduel.exports={
    handleGeneratedShortURL
}
