const express = require('express');
const { shortenUrl } = require('../controllers/url');
const router = express.Router();

router.post('/', shortenUrl);

module.exports = router;