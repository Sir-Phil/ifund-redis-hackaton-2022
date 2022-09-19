const express = require('express');
const { getViewers } = require('../controllers/viewerController');
const router = express.Router();


router.route('/').get(getViewers);


module.exports = router