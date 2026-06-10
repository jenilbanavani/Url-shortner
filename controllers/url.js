const shortid = require('shortid');
const Url = require('../models/url');

async function shortenUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const originalUrl = body.url.startsWith('http://') || body.url.startsWith('https://')
        ? body.url
        : `https://${body.url}`;

    const shortID = shortid.generate();

    try {
        await Url.create({
            originalUrl,
            shortUrl: shortID,
            visithistory: []
        });
        res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortID}` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create short URL', details: err.message });
    }
}

module.exports = {
    shortenUrl
};  