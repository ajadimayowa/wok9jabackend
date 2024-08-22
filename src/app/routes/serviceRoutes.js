const express = require('express');
const {createService,getAllServices,getService,updateService,deleteService} = require('../contollers/serviceControllers');
const router = express.Router()

router.post('/create-service',createService);
router.get('/services',getAllServices);
router.get('/service/:id',getService);
router.patch('/update-service/:id',updateService);
router.delete('/delete-service/:id',deleteService);

module.exports = router