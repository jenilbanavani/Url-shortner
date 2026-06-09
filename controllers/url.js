const shortid = require('shortid');
const Url = require('../models/url');

async function shortenUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    const shortID = shortid.generate();
    await Url.create({
        originalUrl: req.body.url,
        shortUrl: shortID,
        visithistory: []
    });
    res.json({ shortUrl: shortID });

}
 module.exports = {
    shortenUrl
 }  