var express = require('express');
var router = express.Router();
var payController = require('../controllers/payController');


/* GET users listing. */
router.get('/', payController.index);

// Payment Status route
router.get('/status', payController.get);

// Pay route
router.post('/create', payController.create);

module.exports = router;
