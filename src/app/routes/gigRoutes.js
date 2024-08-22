const express = require('express');
const {createNewGig,updateGig,deleteGig,getGig} = require('../contollers/gigController');
const authenticateUser = require('../../middleware/authMiddleWae')

const router = express.Router();

router.post('/create-gig',authenticateUser,createNewGig);
router.get('/get-gig',authenticateUser,getGig);
router.put('/update-gig',authenticateUser,updateGig);
router.delete('/delete-gig',authenticateUser,deleteGig);

module.exports = router