const GigModel = require('../../../models/Gig');

const createNewGig = async (req, res) => {
    console.log({userSend:req.body})
    const {
        title,
        creatorId,
        description, 
        creatorOfficeAddress, 
        creatorFullName, 
        phoneNumber, 
        category, 
        price,
    } = req.body;

    try {
        const newGig = new GigModel({
            gigTitle:title,
            gigDescription:description,
            gigImages: ['a', 'b'], // Ideally, these should be dynamic or removed if not needed.
            gigCategory:category,
            price: price,
            creatorFullName: creatorFullName,
            creatorPhoneNumber: phoneNumber,
            creatorOfficeAddress: creatorOfficeAddress,
            creatorId: creatorId,
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


module.exports = {createNewGig,updateGig,deleteGig,getGig}