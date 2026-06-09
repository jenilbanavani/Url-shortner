const express = require('express');
const urlRoutes = require('./routes/url');
const connectDB = require('./connect');
const Url = require('./models/url');

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use('/api', urlRoutes);

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const entry = await Url.findOneAndUpdate(
        { shortUrl },
        { $push: { visithistory: { timestamp: Date.now() } } },
        { new: true }
    );
    res.redirect(entry.originalUrl);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});