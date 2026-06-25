const express = require('express');

const marketController = require('../Controller/marketController');

const router = express.Router();

router.get('/', marketController.getMarkets);
router.get('/search', marketController.searchStocks);

module.exports = router;
