const express = require('express');
const {createNewService} = require('../contollers/serviceControllers')
const router = express.Router()

router.post('/create-service',createNewService);

module.exports = router