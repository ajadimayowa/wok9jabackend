const GigModel = require('../../../models/Gig');

const createNewGig = async (req, res) => {
    console.log({userSend:req.body})
    const {
        gigTitle,
        gigDescription,
        gigImages, 
        gigCategoryId, 
        creatorFullName,
        creatorPhoneNumber, 
        creatorOfficeAddress,
        sellerPrice,
        basePrice,
        creatorId
    } = req.body;

    try {
        const newGig = new GigModel({
        gigTitle,
        gigDescription,
        gigImages:['abc','efg'], 
        gigCategoryId, 
        creatorFullName,
        creatorPhoneNumber, 
        creatorOfficeAddress,
        sellerPrice,
        basePrice,
        creatorId
        });

        await newGig.save();
        res.status(200).json({ message: 'Gig Created', success: true });
    } catch (err) {
        res.status(400).json({ message: err.message, success: false });
    }
};


const updateGig = async (req, res) => {
    const { gigId } = req.params;
    const updateData = req.body;

    try {
        const updatedGig = await GigModel.findByIdAndUpdate(gigId, updateData, { new: true });

        if (!updatedGig) {
            return res.status(404).json({ message: 'Gig not found', success: false });
        }

        res.status(200).json({ message: 'Gig Updated', success: true, data: updatedGig });
    } catch (err) {
        res.status(400).json({ message: err.message, success: false });
    }
};

const deleteGig = async (req, res) => {
    const { gigId } = req.params;

    try {
        const deletedGig = await GigModel.findByIdAndDelete(gigId);

        if (!deletedGig) {
            return res.status(404).json({ message: 'Gig not found', success: false });
        }

        res.status(200).json({ message: 'Gig Deleted', success: true });
    } catch (err) {
        res.status(400).json({ message: err.message, success: false });
    }
};


const getGig = async (req, res) => {
    const { gigId } = req.params;

    try {
        const gig = await GigModel.findById(gigId);

        if (!gig) {
            return res.status(404).json({ message: 'Gig not found', success: false });
        }

        res.status(200).json({ success: true, data: gig });
    } catch (err) {
        res.status(400).json({ message: err.message, success: false });
    }
};

const getGigs = async (req, res) => {
    const { gigCategoryId, creatorId, page = 1, limit = 10 } = req.query;

    // Pagination setup
    const skip = (page - 1) * limit;

    try {
        // Build the query object
        const query = {};
        if (gigCategoryId) query.gigCategoryId = gigCategoryId;
        if (creatorId) query.creatorId = creatorId;

        // Fetch gigs with pagination
        const gigs = await GigModel.find(query)
            .skip(skip)
            .limit(parseInt(limit));

        // Count total number of documents for pagination metadata
        const total = await GigModel.countDocuments(query);

        // Check if no gigs were found
        if (gigs.length === 0) {
            return res.status(404).json({ message: 'No gigs found', success: false });
        }

        // Return the gigs and pagination data
        res.status(200).json({
            success: true,
            data: gigs,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalGigs: total
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};


module.exports = {createNewGig,updateGig,deleteGig,getGig,getGigs}