const express = require('express');
const {createNewGig,updateGig,deleteGig,getGig, getGigs} = require('../contollers/gigController');
const authenticateUser = require('../../middleware/authMiddleWae')

const router = express.Router();

router.post('/create-gig',authenticateUser,createNewGig);
router.get('/gig/:gigId',getGig);
router.get('/gigs',getGigs);
router.put('/update-gig/:gigId',authenticateUser,updateGig);
router.delete('/delete-gig/:gigId',authenticateUser,deleteGig);

module.exports = router